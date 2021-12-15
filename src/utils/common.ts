import type { APIItemType } from '@/services/apis/api';
export function getMockKey(item: APIItemType) :string{
  return item.method !== undefined ? `${item.method} ${item.url}`
}
