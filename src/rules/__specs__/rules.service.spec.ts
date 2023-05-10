import { RulesPhase } from 'src/@common/enums';
import { RulesCreateDto } from '../dtos/create.dto';
import { RulesService } from '../services/rules.service';
import { RulesDto } from '../dtos/rules.dto';

describe('# RulesService', () => {
  let service: RulesService;

  beforeEach(() => {
    service = new RulesService();
    service.http = {
      post: jest.fn().mockReturnValue(
        new Promise((resolve) => {
          resolve({ data: { results: new RulesDto() } });
        }),
      ),
      get: jest.fn().mockReturnValue(
        new Promise((resolve) => {
          resolve({ data: { results: new RulesDto() } });
        }),
      ),
      patch: jest.fn().mockReturnValue(
        new Promise((resolve) => {
          resolve({ data: { results: new RulesDto() } });
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
      expect(service.create);
    });
  });

  describe('## Create', () => {
    beforeEach(async () => {
      const data = new RulesCreateDto();
      await service.create(data, RulesPhase.REQUEST, '');
    });
    it('should be call external get api', () => {
      expect(service.http.post).toBeCalled();
    });
  });
});
