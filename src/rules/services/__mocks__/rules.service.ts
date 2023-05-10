import { RulesDto } from 'src/rules/dtos/rules.dto';

export const RulesService = jest.fn().mockReturnValue({
  create: jest.fn().mockResolvedValue(new RulesDto()),
});
