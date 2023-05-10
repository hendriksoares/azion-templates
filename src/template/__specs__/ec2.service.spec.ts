import { EC2Service } from '../services/ec2.service';

describe('# EC2Service', () => {
  let service: EC2Service;

  beforeEach(() => {
    service = new EC2Service();
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
    it('create key pair should be defined', () => {
      expect(service.create_key_pair);
    });
  });

  describe('## Create', () => {
    beforeEach(async () => {
      await service.create_key_pair('');
    });
    it('should be call aws sdk client', () => {
      expect(service.client.send).toBeCalled();
    });
  });
});
