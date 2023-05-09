import { CacheSettings, CacheStatus } from 'src/@azion/enums';
import { CacheCreateDto } from '../dtos/create.dto';

export const set_cdn_cache_override = (seconds: number): CacheCreateDto => {
  return {
    name: `H0 ${seconds} SEC`,
    browser_cache_settings: CacheSettings.OVERRIDE,
    browser_cache_settings_maximum_ttl: 0,
    cdn_cache_settings: CacheSettings.OVERRIDE,
    cdn_cache_settings_maximum_ttl: seconds,
    cache_by_query_string: CacheStatus.IGNORE,
    query_string_fields: [],
    enable_query_string_sort: false,
    cache_by_cookies: CacheStatus.IGNORE,
    cookie_names: [],
    enable_caching_for_post: false,
    enable_caching_for_options: false,
    l2_caching_enabled: false,
    is_slice_configuration_enabled: false,
    is_slice_edge_caching_enabled: false,
    is_slice_l2_caching_enabled: false,
    slice_configuration_range: 1024,
  };
};
