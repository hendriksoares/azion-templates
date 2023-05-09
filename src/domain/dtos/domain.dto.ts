export class DomainDto {
  id: string;
  name: string;
  cnames: string[];
  cname_access_only: boolean;
  digital_certificate_id?: string;
  edge_application_id: string;
  is_active: boolean;
  domain_name: string;
}
