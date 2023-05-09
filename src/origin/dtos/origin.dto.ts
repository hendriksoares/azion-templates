import { OriginProtocolPolicy } from 'src/@common/enums/origin-protocol-policy.enum';
import { OriginType } from 'src/@common/enums/origin-type.enum';

export class OriginDto {
  origin_id: string;
  origin_key: string;
  name: string;
  origin_type: OriginType.SINGLE_ORIGIN;
  addresses: any[];
  origin_protocol_policy: OriginProtocolPolicy.PRESERVE;
  is_origin_redirection_enabled: boolean;
  host_header: string;
  method: string;
  origin_path: string;
  connection_timeout: number;
  timeout_between_bytes: number;
  hmac_authentication: boolean;
  hmac_region_name: string;
  hmac_access_key: string;
  hmac_secret_key: string;
}
