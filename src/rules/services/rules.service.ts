import { AzionService } from 'src/@common/services/azion.service';
import { RulesCreateDto } from '../dtos/create.dto';
import { RulesDto } from '../dtos/rules.dto';
import { RulesPhase } from 'src/@common/enums';

/**
 * A class service to manage domain on Azion
 */
export class RulesService extends AzionService {
  constructor() {
    super();
    this.url = `${this.url}/edge_applications/:edge_application_id/rules_engine/:phase/rules`;
  }

  /** Service to register a new rule engine
   * @param data DomainCreateDto
   * @returns Promise<DomainDto>
   */
  async create(
    data: RulesCreateDto,
    phase: RulesPhase,
    edge_application_id: string,
  ): Promise<RulesDto> {
    let url = this.url.replace(':edge_application_id', edge_application_id);
    url = url.replace(':phase', phase);

    const res = await this.http.post(url, data, this.config);
    return res.data.results;
  }
}
