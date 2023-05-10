import { OriginDto } from '../dtos/origin.dto';
import { OriginUpdateDto } from '../dtos/update.dto';
import { OriginService } from '../services/origin.service';

describe('# OriginService', () => {
  let service: OriginService;

  beforeEach(() => {
    service = new OriginService();
    service.http = {
      post: jest.fn().mockReturnValue(
        new Promise((resolve) => {
          resolve({ data: { results: new OriginDto() } });
        }),
      ),
      get: jest.fn().mockReturnValue(
        new Promise((resolve) => {
          resolve({ data: { results: new OriginDto() } });
        }),
      ),
      patch: jest.fn().mockReturnValue(
        new Promise((resolve) => {
          resolve({ data: { results: {} } });
        }),
      ),
      delete: jest.fn().mockReturnValue(
        new Promise((resolve) => {
          resolve({ data: { results: {} } });
        }),
      ),
    } as any;
  });

  describe('## should be defined', () => {
    it('service was defined', () => {
      expect(service).toBeDefined();
    });
    it('find by edge should be defined', () => {
      expect(service.find_by_edge);
    });
    it('update should be defined', () => {
      expect(service.update);
    });
  });

  describe('## FindByEdge', () => {
    beforeEach(async () => {
      await service.find_by_edge('');
    });
    it('should be call external get api', () => {
      expect(service.http.get).toBeCalled();
    });
  });

  describe('## Update', () => {
    const data: OriginUpdateDto = new OriginUpdateDto();
    beforeEach(async () => {
      await service.update('', '', data);
    });
    it('should be call external patch api', () => {
      expect(service.http.patch).toBeCalled();
    });
  });
});
