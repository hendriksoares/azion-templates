import { OriginDto } from 'src/origin/dtos/origin.dto';

export const OriginService = jest.fn().mockReturnValue({
  update: jest.fn().mockResolvedValue(new OriginDto()),
  find_by_edge: jest.fn().mockResolvedValue([{ origin_id: '1' }]),
});
