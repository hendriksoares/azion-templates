import { DescribeStacksCommandOutput } from '@aws-sdk/client-cloudformation';

import { CloudformationService } from './cloudformation.service';
import { EC2Service } from './ec2.service';

import { EnvPayload } from '../dtos/env.payload';

import {
  set_by_pass_to_path,
  set_cache_to_images,
  set_cache_to_static,
} from '../../rules/helpers/helpers';
import { set_cdn_cache_override } from '../../cache/helpers/helpers';

import { EdgeService } from '../../edge/services/edge.service';
import { DomainService } from '../../domain/services/domain.service';
import { OriginService } from '../../origin/services/origin.service';
import { CacheService } from '../../cache/services/cache.service';
import { RulesService } from '../../rules/services/rules.service';

import { EdgeApplicationUpdateDto } from '../../edge/dtos/update.dto';
import { DomainCreateDto } from '../../domain/dtos/create.dto';
import { EdgeApplicationCreateDto } from '../../edge/dtos/create.dto';
import {
  CacheSettings,
  CacheStatus,
  DeliveryProtocol,
  OriginProtocolPolicy,
  OriginType,
  RulesPhase,
} from 'src/@common/enums';

export class AWSWordpressService {
  /** AWS Clients */
  client_ec2: EC2Service;
  client_cf: CloudformationService;

  /** Azion Services */
  edge_service: EdgeService;
  domain_service: DomainService;
  origin_service: OriginService;
  cache_service: CacheService;
  rules_service: RulesService;

  constructor() {
    this.client_ec2 = new EC2Service();
    this.client_cf = new CloudformationService();
    this.edge_service = new EdgeService();
    this.domain_service = new DomainService();
    this.cache_service = new CacheService();
    this.origin_service = new OriginService();
    this.rules_service = new RulesService();
  }

  async run(): Promise<void> {
    try {
      /** read env parameters */
      const { stack_name, key_name, db_password, db_user, db_root_password } =
        this.read_env();

      /** deploy stack and take origin ip */
      const address = await this.deploy_aws_stack(
        stack_name,
        key_name,
        db_password,
        db_user,
        db_root_password,
      );

      /** deploy azion stack */
      await this.deploy_azion_stack(stack_name, address);
    } catch (err) {
      console.error(err);
      throw err;
      /** TODO 10/04/2023  add rollback when some failure*/
    }
  }

  private read_env(): EnvPayload {
    if (!process.env.AZION_APP_NAME) throw 'ENV_AZION_APP_NAME_NOUTFOUND';
    if (!process.env.MYSQL_DB_PASSWORD) throw 'ENV_MYSQL_DB_PASSWORD_NOUTFOUND';
    if (!process.env.MYSQL_DB_USER) throw 'ENV_MYSQL_DB_USER_NOUTFOUND';
    if (!process.env.MYSQL_DB_ROOT_PASSWORD)
      throw 'ENV_MYSQL_DB_ROOT_PASSWORD_NOUTFOUND';

    const env: EnvPayload = {
      stack_name: process.env.AZION_APP_NAME,
      key_name: process.env.AZION_APP_NAME,
      db_password: process.env.MYSQL_DB_PASSWORD,
      db_user: process.env.MYSQL_DB_USER,
      db_root_password: process.env.MYSQL_DB_ROOT_PASSWORD,
    };

    return env;
  }

  async deploy_azion_stack(
    app_name: string,
    address: string,
    host?: string,
  ): Promise<void> {
    /** 1. Create a edge application */
    const create_edge_data: EdgeApplicationCreateDto = {
      name: app_name,
      delivery_protocol: DeliveryProtocol.HTTPS,
      origin_type: OriginType.SINGLE_ORIGIN,
      address: address,
      origin_protocol_policy: OriginProtocolPolicy.PRESERVE,
      host_header: host ?? '${host}',
      browser_cache_settings: CacheSettings.OVERRIDE,
      browser_cache_settings_maximum_ttl: 20,
      cdn_cache_settings: CacheSettings.HONOR,
      cdn_cache_settings_maximum_ttl: 300,
    };
    console.debug('Create edge application');
    let edge_app = await this.edge_service.create(create_edge_data);

    /** 2. Set edge application acceleration */
    const update_edge_data: EdgeApplicationUpdateDto = {
      id: edge_app.id,
      application_acceleration: true,
    };
    edge_app = await this.edge_service.update(update_edge_data);

    /** 3. Create a edge domain */
    console.debug('Create a edge domain');
    const domain_create_data: DomainCreateDto = {
      name: process.env.AZION_APP_NAME,
      cnames: [],
      cname_access_only: false,
      digital_certificate_id: null,
      edge_application_id: edge_app.id,
      is_active: true,
    };
    const domain = await this.domain_service.create(domain_create_data);

    /** 4. setting some cache rules  */
    console.debug('Setting cache');
    const default_cache = await this.cache_service.find_by_edge(edge_app.id);

    await this.cache_service.update(edge_app.id, default_cache[0].id, {
      cache_by_query_string: CacheStatus.WHITELIST,
      query_string_fields: ['p\r', 'page_id'],
    });

    const caches = [];
    caches.push(
      await this.cache_service.create(
        set_cdn_cache_override(1296000),
        edge_app.id,
      ),
    );
    caches.push(
      await this.cache_service.create(
        set_cdn_cache_override(31536000),
        edge_app.id,
      ),
    );

    /** 5. configure the cache rules  */
    console.debug('Configure rules engines ');
    const origins = await this.origin_service.find_by_edge(edge_app.id);

    await this.rules_service.create(
      set_cache_to_static(caches[0].id),
      RulesPhase.REQUEST,
      edge_app.id,
    );
    await this.rules_service.create(
      set_cache_to_images(caches[1].id),
      RulesPhase.REQUEST,
      edge_app.id,
    );
    await this.rules_service.create(
      set_by_pass_to_path(origins[0].origin_id, '/wordpress/wp'),
      RulesPhase.REQUEST,
      edge_app.id,
    );

    console.debug('Azion wordpress configuration finish !! ...');
    console.debug(
      `Soon, you can access your edge application in: ${domain.domain_name}/wordpress`,
    );
  }

  async deploy_aws_stack(
    stack_name: string,
    key_name: string,
    db_password: string,
    db_user: string,
    db_root_password: string,
  ): Promise<string> {
    /** create a key pair to ec2 */
    console.debug('Create key pair started');
    await this.client_ec2.create_key_pair(key_name);

    /** create cloudformation stack  */
    console.debug('Create cloudformation stack started');
    await this.client_cf.create_stack_wordpress(
      stack_name,
      key_name,
      db_password,
      db_user,
      db_root_password,
    );

    /** wait stack is ready */
    let result: DescribeStacksCommandOutput;
    let output: string;
    while (true) {
      result = await this.client_cf.describe_stacks(stack_name);
      console.debug('Create stack in progress');
      if (result && result.Stacks && result.Stacks[0].Outputs) {
        output = result?.Stacks[0]?.Outputs[0]?.OutputValue;
        break;
      }
      await new Promise((resolve) => setTimeout(resolve, 10000));
    }

    /** return origin ip  */
    const ip = new URL(output).host.split('.')[0].slice(4).split('-').join('.');

    return ip;
  }
}
