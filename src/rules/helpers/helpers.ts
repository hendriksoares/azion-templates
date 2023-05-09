import { RulesCriteriaOperator, RulesBehaviors } from 'src/@azion/enums';
import { RulesCreateDto } from '../dtos/create.dto';

export const set_cache_to_images = (cache_id: string): RulesCreateDto => {
  return {
    name: 'images',
    criteria: [
      [
        {
          conditional: 'if',
          variable: '${uri}',
          operator: 'matches',
          input_value: '\\.(jpg|jpeg|bmp|ico|gif|png)$',
        },
      ],
    ],
    behaviors: [
      {
        name: 'set_cache_policy',
        target: cache_id,
      },
    ],
  };
};

export const set_cache_to_static = (cache_id: string): RulesCreateDto => {
  return {
    name: 'static',
    criteria: [
      [
        {
          conditional: 'if',
          variable: '${uri}',
          operator: 'matches',
          input_value:
            '\\.(aif|aiff|au|avi|bin|cab|carb|cct|cdf|class|doc|dcr|dtd|exe|flv|gcf|gff|grv|hdml|hqx|ini|mov|mp3|nc|pct|pdf|ppc|pws|swa|swf|txt|vbs|w32|wav|wbmp|wml|wmlc|wmls|wmlsc|xsd|zip|jxr|hdp|wdp|pict|mid|midi|ttf|eof|otf|svgz|jar)$',
        },
      ],
    ],
    behaviors: [
      {
        name: 'set_cache_policy',
        target: cache_id,
      },
    ],
  };
};

export const set_by_pass_to_path = (
  origin_id: string,
  path: string,
): RulesCreateDto => {
  return {
    name: 'bypass',
    criteria: [
      [
        {
          conditional: 'if',
          variable: '${uri}',
          operator: RulesCriteriaOperator.STARTS_WITH,
          input_value: path,
        },
      ],
    ],
    behaviors: [
      {
        name: RulesBehaviors.SET_ORIGIN,
        target: origin_id,
      },
      {
        name: RulesBehaviors.BYPASS_CACHE,
      },
      {
        name: RulesBehaviors.FORWARD_COOKIES,
      },
    ],
  };
};
