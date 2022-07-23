import { AdminPerssionKey } from '@/services/common/pattern';

export type PermissionTypesItemType = {
  key: string;
  name: string;
};
export const DEFAULT_PERMISSION_TYPES: PermissionTypesItemType[] = [
  { key: 'view', name: '查看' },
  { key: 'edit', name: '编辑' },
  { key: 'delete', name: '删除' },
];

const ruleItem: any = {
  key: [{ required: true, pattern: AdminPerssionKey, message: '请按照驼峰法命名' }],
  name: [
    { required: true, type: 'string', message: '请添加权限名称' },
    {
      type: 'string',
      max: '50',
      message: '名称长度不能超过50个字符',
    },
  ],
  describe: [{ required: false, type: 'string', message: '请添加权限名称' }],
};

export const PERMIDDION_RULES = {
  view: ruleItem,
  edit: ruleItem,
  delete: ruleItem,
};
