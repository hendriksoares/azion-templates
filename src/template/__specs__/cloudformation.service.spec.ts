import { CloudformationService } from '../services/cloudformation.service';

describe('# CloudformationService', () => {
  let service: CloudformationService;

  beforeEach(() => {
    service = new CloudformationService();
    service.client = {
      send: jest.fn().mockReturnValue(
        new Promise((resolve) => {
          resolve({});
        }),
      ),
    } as any;
  });

  describe('## should be defined', () => {
    it('service was defined', () => {
      expect(service).toBeDefined();
    });
    it('create stack wordpress should be defined', () => {
      expect(service.create_stack_wordpress);
    });
    it('describe stacks should be defined', () => {
      expect(service.describe_stacks);
    });
  });

  describe('## Create Stack Wordpress', () => {
    beforeEach(async () => {
      await service.create_stack_wordpress('', '', '', '', '');
    });
    it('should be call aws sdk client', () => {
      expect(service.client.send).toBeCalled();
    });
  });

  describe('## Describe Stack', () => {
    beforeEach(async () => {
      await service.describe_stacks('');
    });
    it('should be call aws sdk client', () => {
      expect(service.client.send).toBeCalled();
    });
  });
});
