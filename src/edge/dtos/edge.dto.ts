import { DeliveryProtocol } from 'src/@common/enums/delivery-protocol.enum';
import { TLSVersion } from 'src/@common/enums/tls-version.enum';

export class EdgeApplicationDto {
  id: string;
  name: string;
  delivery_protocol: DeliveryProtocol;
  http_port: number;
  https_port: number;
  minimum_tls_version: TLSVersion;
  active: boolean;
  debug_rules: boolean;
  application_acceleration: boolean;
  caching: boolean;
  device_detection: boolean;
  edge_firewall: boolean;
  edge_functions: boolean;
  image_optimization: boolean;
  load_balancer: boolean;
  raw_logs: boolean;
  web_application_firewall: boolean;
}
