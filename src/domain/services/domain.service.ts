import { AzionService } from 'src/@common/services/azion.service';
import { DomainCreateDto } from '../dtos/create.dto';
import { DomainDto } from '../dtos/domain.dto';
import { DomainUpdateDto } from '../dtos/update.dto';

/**
 * A class service to manage domain on Azion
 */
export class DomainService extends AzionService {
  constructor() {
    super();
    this.url = `${this.url}/domains`;
  }

  /** Service to register a new domain
   * @param data DomainCreateDto
   * @returns Promise<DomainDto>
   */
  async create(data: DomainCreateDto): Promise<DomainDto> {
    const res = await this.http.post(this.url, data, this.config);
    return res.data.results;
  }

  /** A service to find one domain
   * @param id string
   * @returns Promise<DomainDto>
   */
  async find_one(id: string): Promise<DomainDto> {
    const res = await this.http.get(`${this.url}/${id}`, this.config);
    return res.data.results;
  }

  /** A service to update a domain
   * @param data DomainUpdateDto
   * @returns Promise<DomainDto>
   */
  async update(data: DomainUpdateDto): Promise<DomainDto> {
    const res = await this.http.patch(this.url, data, this.config);
    return res.data.results;
  }

  /** A servce to delete a domain by id
   * @param id string
   */
  async delete(id: string): Promise<void> {
    this.http.delete(`${this.url}/${id}`, this.config);
  }
}
