import { AWSWordpressService } from '../services/aws-wordpress.service';

jest.setTimeout(30000);
jest.mock('src/edge/services/edge.service');
jest.mock('src/domain/services/domain.service');
jest.mock('src/cache/services/cache.service');
jest.mock('src/origin/services/origin.service');
jest.mock('src/rules/services/rules.service');

describe('# AWSWordpressService', () => {
  let service: AWSWordpressService;

  beforeEach(() => {
    service = new AWSWordpressService();

    /** mock env variables */
    process.env.AZION_APP_NAME = 'azion';
    process.env.MYSQL_DB_PASSWORD = 'azion';
    process.env.MYSQL_DB_USER = 'azion';
    process.env.MYSQL_DB_ROOT_PASSWORD = 'azion';

    /** mock aws client ec2 */
    service.client_ec2 = {
      create_key_pair: jest.fn().mockReturnValue(
        new Promise((resolve) => {
          resolve({});
        }),
      ),
    } as any;

    /** mock aws client cloudformation */
    service.client_cf = {
      create_stack_wordpress: jest.fn().mockReturnValue(
        new Promise((resolve) => {
          resolve({});
        }),
      ),
      describe_stacks: jest.fn().mockReturnValue(
        new Promise((resolve) => {
          resolve({
            Stacks: [
              {
                Outputs: [
                  {
                    OutputValue: 'http://ec2-127-0-0-1.compute-1.amazonaws.com',
                  },
                ],
              },
            ],
          });
        }),
      ),
    } as any;

    /** mock edge service */
    // service.edge_service = new EdgeService();

    // service.edge_service = service.deploy_azion_stack = jest
    //   .fn()
    //   .mockReturnValue(
    //     new Promise((resolve) => {
    //       resolve({});
    //     }),
    //   );
  });

  describe('## should be defined', () => {
    it('service was defined', () => {
      expect(service).toBeDefined();
    });
    it('run should be defined', () => {
      expect(service.run);
    });
  });

  describe('## Run', () => {
    beforeEach(async () => {
      await service.run();
    });
    it('should be call deploy aws stack', () => {
      expect(service.client_ec2.create_key_pair).toBeCalled();
      expect(service.client_cf.create_stack_wordpress).toBeCalled();
      expect(service.client_cf.describe_stacks).toBeCalled();
    });
    it('should be call deploy azion stack', () => {
      expect(service.edge_service.create).toBeCalled();
      expect(service.edge_service.update).toBeCalled();
      expect(service.domain_service.create).toBeCalled();
      expect(service.cache_service.find_by_edge).toBeCalled();
      expect(service.cache_service.update).toBeCalled();
      expect(service.cache_service.create).toBeCalled();
      expect(service.origin_service.find_by_edge).toBeCalled();
      expect(service.rules_service.create).toBeCalled();
    });
  });
});
