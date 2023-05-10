import { EdgeService } from 'src/edge/services/edge.service';

describe('# AzionService', () => {
  let service: EdgeService;

  describe('## should be defined with cookie', () => {
    beforeEach(async () => {
      service = new EdgeService();
    });

    it('service was defined', () => {
      expect(service).toBeDefined();
    });
  });

  describe('## should be defined with personal token', () => {
    beforeEach(async () => {
      process.env.AZION_PERSONAL_TOKEN = 'azion';
      service = new EdgeService();
    });

    it('service was defined', () => {
      expect(service).toBeDefined();
    });
  });
});
