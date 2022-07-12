import { ResponseAdminRoleAllItemType } from '@/services/apis/admin/role';

const allRoles: ResponseAdminRoleAllItemType[] = [
  {
    roleId: 1,
    roleName: '管理员',
  },
  {
    roleId: 2,
    roleName: '运维',
  },
  {
    roleId: 3,
    roleName: '运维1',
  },
  {
    roleId: 4,
    roleName: '运维2',
  },
  {
    roleId: 5,
    roleName: '运维3',
  },
];

export default {
  'POST /api/admin/role/all': {
    code: 0,
    message: '成功',
    type: 1,
    data: allRoles,
  },
};
