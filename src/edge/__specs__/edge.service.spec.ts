import { EdgeService } from '../services/edge.service';
import { EdgeApplicationCreateDto } from '../dtos/create.dto';
import { EdgeApplicationUpdateDto } from '../dtos/update.dto';

describe('# EdgeService', () => {
  let service: EdgeService;

  beforeEach(() => {
    service = new EdgeService();
    service.http = {
      post: jest.fn().mockReturnValue(
        new Promise((resolve) => {
          resolve({ data: { results: {} } });
        }),
      ),
      get: jest.fn().mockReturnValue(
        new Promise((resolve) => {
          resolve({ data: { results: {} } });
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
      await service.create({} as EdgeApplicationCreateDto);
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
    beforeEach(async () => {
      await service.update({} as EdgeApplicationUpdateDto);
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
