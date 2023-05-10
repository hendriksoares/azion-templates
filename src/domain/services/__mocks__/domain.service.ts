import { DomainDto } from 'src/domain/dtos/domain.dto';

export const DomainService = jest.fn().mockReturnValue({
  create: jest.fn().mockResolvedValue(new DomainDto()),
  update: jest.fn().mockResolvedValue(new DomainDto()),
  finde_one: jest.fn().mockResolvedValue(new DomainDto()),
  delete: jest.fn().mockResolvedValue({}),
});
