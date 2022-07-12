import {
  ResponseAdminUserDetailType,
  ResponseAdminUserListItemType,
} from '@/services/apis/admin/admin';
import { ResponseInfoType, ResponseListType } from '@/services/apis/types';
import { success } from '../common';

const userListDataRows: ResponseAdminUserListItemType[] = [
  {
    adminId: 6,
    username: 'wll',
    nickname: 'wll',
    email: '1074966185@qq.com',
    avatar: '',
    roles: [
      {
        roleId: 1,
        roleName: '管理员',
      },
      {
        roleId: 2,
        roleName: '运维',
      },
    ],
    enabled: true,
    enabledText: '启用',
    createTime: '2022-06-26 14:49:38',
    modifyTime: '2022-06-26 14:49:38',
    totalLogin: 10,
    lastLoginIp: '127.0.0.1',
    lastLoginTime: '2022-06-26 14:49:38',
  },
];

const userListResponse: ResponseListType = {
  code: 0,
  type: 'success',
  message: '成功',
  data: {
    total: 1,
    pageNo: 1,
    pageSize: 10,
    rows: userListDataRows,
  },
};

const userDetail: ResponseAdminUserDetailType = {
  adminId: 6,
  username: 'wll',
  nickname: 'wll',
  email: '1074966185@qq.com',
  avatar: '',
  roles: [
    {
      roleId: 1,
      roleName: '管理员',
    },
    {
      roleId: 2,
      roleName: '运维',
    },
  ],
  enabled: true,
  enabledText: '启用',
  createTime: '2022-06-26 14:49:38',
  modifyTime: '2022-06-26 14:49:38',
  totalLogin: 10,
  lastLoginIp: '127.0.0.1',
  lastLoginTime: '2022-06-26 14:49:38',
};

const userDetailResponse: ResponseInfoType = {
  code: 0,
  message: '成功',
  type: 'SUCCESS',
  data: userDetail,
};

export default {
  'POST /api/admin/user/list': userListResponse,
  'POST /api/admin/user/detail': userDetailResponse,
  'POST /api/admin/user/add': success,
  'POST /api/admin/user/edit': success,
};
