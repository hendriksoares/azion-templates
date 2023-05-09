import { OriginProtocolPolicy } from 'src/@common/enums/origin-protocol-policy.enum';
import { OriginType } from 'src/@common/enums/origin-type.enum';

export class OriginUpdateDto {
  name?: string;
  origin_type?: OriginType.SINGLE_ORIGIN;
  addresses?: any[];
  origin_protocol_policy?: OriginProtocolPolicy.PRESERVE;
  host_header?: string;
  origin_path?: string;
  hmac_authentication?: boolean;
  hmac_region_name?: string;
  hmac_access_key?: string;
  hmac_secret_key?: string;
}
