import { DomainCreateDto } from '../dtos/create.dto';
import { DomainDto } from '../dtos/domain.dto';
import { DomainUpdateDto } from '../dtos/update.dto';
import { DomainService } from '../services/domain.service';

describe('# DomainService', () => {
  let service: DomainService;

  beforeEach(() => {
    service = new DomainService();
    service.http = {
      post: jest.fn().mockReturnValue(
        new Promise((resolve) => {
          resolve({ data: { results: new DomainDto() } });
        }),
      ),
      get: jest.fn().mockReturnValue(
        new Promise((resolve) => {
          resolve({ data: { results: new DomainDto() } });
        }),
      ),
      patch: jest.fn().mockReturnValue(
        new Promise((resolve) => {
          resolve({ data: { results: new DomainDto() } });
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
      const data = new DomainCreateDto();
      await service.create(data);
    });
    it('should be call external post api', () => {
      expect(service.http.post).toBeCalled();
    });
  });

  describe('## FindOne', () => {
    beforeEach(async () => {
      await service.find_one('');
    });
    it('should be call external get api', () => {
      expect(service.http.get).toBeCalled();
    });
  });

  describe('## Update', () => {
    const data = new DomainUpdateDto();
    beforeEach(async () => {
      await service.update(data);
    });
    it('should be call external patch api', () => {
      expect(service.http.patch).toBeCalled();
    });
  });

  describe('## Delete', () => {
    beforeEach(async () => {
      await service.delete('');
    });
    it('should be call external delete api', () => {
      expect(service.http.delete).toBeCalled();
    });
  });
});
