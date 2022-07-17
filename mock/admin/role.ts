import {
  ResponseAdminRoleAllItemType,
  ResponseAdminRoleListItemType,
} from '@/services/apis/admin/role';
import {
  ResponseDetailDataType,
  ResponseDetailType,
  ResponseListType,
} from '@/services/apis/types';
import { success } from '../common';

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

const rolesAll = {
  code: 0,
  message: '成功',
  type: 1,
  data: allRoles,
};

const rolesListRows: ResponseAdminRoleListItemType[] = [
  {
    roleId: 1,
    roleName: '管理员',
    enabled: true,
    enabledText: '启用',
    createTime: '2022-07-16 12:34:56',
    modifyTime: '2022-07-16 12:34:56',
  },
  {
    roleId: 2,
    roleName: '管理员',
    enabled: false,
    enabledText: '启用',
    createTime: '2022-07-16 12:34:56',
    modifyTime: '2022-07-16 12:34:56',
  },
];

const rolesList: ResponseListType = {
  code: 0,
  message: '成功',
  type: 'SUCCESS',
  data: {
    total: 22,
    pageNo: 1,
    pageSize: 10,
    rows: rolesListRows,
  },
};

const roleDetailData: ResponseAdminRoleListItemType = {
  roleId: 2,
  roleName: '管理员',
  enabled: true,
  enabledText: '启用',
  createTime: '2022-07-16 12:34:56',
  modifyTime: '2022-07-16 12:34:56',
};

const roleDetail: ResponseDetailType = {
  code: 0,
  message: '成功',
  type: 'SUCCESS',
  data: roleDetailData,
};

export default {
  'POST /api/admin/role/all': rolesAll,
  'POST /api/admin/role/list': rolesList,
  'POST /api/admin/role/add': success,
  'POST /api/admin/role/detail': roleDetail,
  'POST /api/admin/role/edit': success,
  'POST /api/admin/role/enable': success,
  'POST /api/admin/role/delete': success,
};
