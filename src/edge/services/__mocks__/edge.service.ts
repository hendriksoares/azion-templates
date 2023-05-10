import { EdgeApplicationDto } from 'src/edge/dtos/edge.dto';

export const EdgeService = jest.fn().mockReturnValue({
  create: jest.fn().mockResolvedValue({ id: '1' }),
  update: jest.fn().mockResolvedValue(new EdgeApplicationDto()),
  finde_one: jest.fn().mockResolvedValue(new EdgeApplicationDto()),
  delete: jest.fn().mockResolvedValue({}),
});
