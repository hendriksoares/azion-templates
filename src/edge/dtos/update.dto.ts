import { DeliveryProtocol } from 'src/@common/enums/delivery-protocol.enum';
import { TLSVersion } from 'src/@common/enums/tls-version.enum';

export class EdgeApplicationUpdateDto {
  id: string;
  delivery_protocol?: DeliveryProtocol;
  http_port?: number;
  https_port?: number;
  minimum_tls_version?: TLSVersion;
  application_acceleration?: boolean;
  active?: boolean;
  caching?: boolean;
  device_detection?: boolean;
  edge_firewall?: boolean;
  edge_functions?: boolean;
  image_optimization?: boolean;
  l2_caching?: boolean;
  load_balancer?: boolean;
  raw_logs?: boolean;
  web_application_firewall?: boolean;
}
