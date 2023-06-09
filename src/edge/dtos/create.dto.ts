import { CacheSettings } from 'src/@common/enums/cache-settings.enum';
import { DeliveryProtocol } from 'src/@common/enums/delivery-protocol.enum';
import { OriginProtocolPolicy } from 'src/@common/enums/origin-protocol-policy.enum';
import { OriginType } from 'src/@common/enums/origin-type.enum';

export class EdgeApplicationCreateDto {
  name: string;
  delivery_protocol: DeliveryProtocol;
  origin_type: OriginType;
  address: string;
  origin_protocol_policy: OriginProtocolPolicy;
  host_header: string;
  browser_cache_settings: CacheSettings;
  browser_cache_settings_maximum_ttl: number;
  cdn_cache_settings: CacheSettings;
  cdn_cache_settings_maximum_ttl: number;
}
