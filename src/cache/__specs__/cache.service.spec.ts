import { CacheService } from '../services/cache.service';
import { CacheDto } from '../dtos/cache.dto';
import { CacheCreateDto } from '../dtos/create.dto';
import { CacheUpdateDto } from '../dtos/update.dto';

describe('# CacheService', () => {
  let service: CacheService;

  beforeEach(() => {
    service = new CacheService();
    service.http = {
      post: jest.fn().mockReturnValue(
        new Promise((resolve) => {
          resolve({ data: { results: new CacheDto() } });
        }),
      ),
      get: jest.fn().mockReturnValue(
        new Promise((resolve) => {
          resolve({ data: { results: new CacheDto() } });
        }),
      ),
      patch: jest.fn().mockReturnValue(
        new Promise((resolve) => {
          resolve({ data: { results: new CacheDto() } });
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
    it('create should be defined', () => {
      expect(service.create).toBeDefined();
    });
    it('find by edge should be defined', () => {
      expect(service.find_by_edge);
    });
    it('find one should be defined', () => {
      expect(service.find_one);
    });
    it('update should be defined', () => {
      expect(service.update);
    });
    it('delete should be defined', () => {
      expect(service.delete);
    });
  });

  describe('## Create', () => {
    beforeEach(async () => {
      const data = new CacheCreateDto();
      await service.create(data, '');
    });
    it('should be call external post api', () => {
      expect(service.http.post).toBeCalled();
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

  describe('## FindOne', () => {
    beforeEach(async () => {
      await service.find_one('', '');
    });
    it('should be call external get api', () => {
      expect(service.http.get).toBeCalled();
    });
  });

  describe('## Update', () => {
    beforeEach(async () => {
      const data = new CacheUpdateDto();
      await service.update('', '', data);
    });
    it('should be call external patch api', () => {
      expect(service.http.patch).toBeCalled();
    });
  });

  describe('## Delete', () => {
    beforeEach(async () => {
      await service.delete('', '');
    });
    it('should be call external delete api', () => {
      expect(service.http.delete).toBeCalled();
    });
  });
});
