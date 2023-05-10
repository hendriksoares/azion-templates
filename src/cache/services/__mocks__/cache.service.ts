import { CacheDto } from 'src/cache/dtos/cache.dto';

export const CacheService = jest.fn().mockReturnValue({
  create: jest.fn().mockResolvedValue([{ id: '1' }]),
  update: jest.fn().mockResolvedValue(new CacheDto()),
  find_by_edge: jest.fn().mockResolvedValue([{ id: '1' }]),
  finde_one: jest.fn().mockResolvedValue(new CacheDto()),
  delete: jest.fn().mockResolvedValue({}),
});
