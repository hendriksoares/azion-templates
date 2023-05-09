import { AzionService } from 'src/@azion/services/azion.service';
import { EdgeApplicationCreateDto } from '../dtos/create.dto';
import { EdgeApplicationDto } from '../dtos/edge.dto';
import { EdgeApplicationUpdateDto } from '../dtos/update.dto';

/**
 * A class service to manage edge application on Azion
 */
export class EdgeService extends AzionService {
  constructor() {
    super();
    this.url = `${this.url}/edge_applications`;
  }

  /** Service to create a new edge application
   * @param data EdgeApplicationCreateDto
   * @returns Promise<EdgeApplicationDto>
   */
  async create(data: EdgeApplicationCreateDto): Promise<EdgeApplicationDto> {
    const res = await this.http.post(this.url, data, this.config);
    return res.data.results;
  }

  /** Service to update an edge application
   * @param data EdgeApplicationUpdateDto
   * @returns Promise<EdgeApplicationDto>
   */
  async update(data: EdgeApplicationUpdateDto): Promise<EdgeApplicationDto> {
    const res = await this.http.patch(
      `${this.url}/${data.id}`,
      data,
      this.config,
    );
    return res.data.results;
  }

  /** Service to find one edge application by id
   * @param id string
   * @returns Promise<EdgeApplicationDto>
   */
  async find_one(id: string): Promise<EdgeApplicationDto> {
    const res = await this.http.get(`${this.url}/${id}`, this.config);
    return res.data.results;
  }

  /** Service to delete an edge application by id
   * @param id string
   * @returns Promise<EdgeApplicationDto>
   */
  async delete(id: string): Promise<void> {
    this.http.delete(`${this.url}/${id}`, this.config);
  }
}
