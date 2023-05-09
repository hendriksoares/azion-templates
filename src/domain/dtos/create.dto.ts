export class DomainCreateDto {
  edge_application_id: string;
  name: string;
  cnames: string[];
  cname_access_only: boolean;
  digital_certificate_id?: string;
  is_active: boolean;
}
