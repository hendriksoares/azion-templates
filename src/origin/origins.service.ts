import { AzionService } from 'src/@azion/services/azion.service';
import { OriginDto } from './dtos/origin.dto';
import { OriginUpdateDto } from './dtos/update.dto';

export class OriginsService extends AzionService {
  constructor() {
    super();
    this.url = `${this.url}/edge_applications/:edge_application_id/origins`;
  }

  async find_by_edge(id: string): Promise<OriginDto[]> {
    const url = this.url.replace(':edge_application_id', id);

    const res = await this.http.get(url, this.config);
    return res.data.results;
  }

  async update(
    edge_application_id: string,
    origin_key: string,
    data: OriginUpdateDto,
  ) {
    const url = `${this.url.replace(
      ':edge_application_id',
      edge_application_id,
    )}/${origin_key}`;

    const res = await this.http.patch(url, data, this.config);
    return res.data.results;
  }
}
