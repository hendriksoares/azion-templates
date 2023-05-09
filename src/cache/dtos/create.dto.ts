import { CacheSettings } from 'src/@common/enums/cache-settings.enum';
import { CacheStatus } from 'src/@common/enums/cache-status.enum';

export class CacheCreateDto {
  name: string;
  browser_cache_settings: CacheSettings;
  browser_cache_settings_maximum_ttl: number;
  cdn_cache_settings: CacheSettings;
  cdn_cache_settings_maximum_ttl: number;
  cache_by_query_string: CacheStatus;
  query_string_fields?: string[];
  enable_query_string_sort: boolean;
  cache_by_cookies: CacheStatus;
  cookie_names?: string[];
  enable_caching_for_post: boolean;
  enable_caching_for_options: boolean;
  l2_caching_enabled: boolean;
  is_slice_configuration_enabled: boolean;
  is_slice_edge_caching_enabled: boolean;
  is_slice_l2_caching_enabled: boolean;
  slice_configuration_range: number;
}
