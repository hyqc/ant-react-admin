import {
  ResponseAdminUserDetailType,
  ResponseAdminUserListItemType,
} from '@/services/apis/admin/user';
import { ResponseDetailType, ResponseListType } from '@/services/apis/types';
import { success } from '../common';
import { Request, Response } from 'express';

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
    enabled: false,
    enabledText: '启用',
    createTime: '2022-06-26 14:49:38',
    modifyTime: '2022-06-26 14:49:38',
    totalLogin: 10,
    lastLoginIp: '127.0.0.1',
    lastLoginTime: '2022-06-26 14:49:38',
  },
  {
    adminId: 2,
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

const list: ResponseListType = {
  code: 0,
  type: 'success',
  message: '成功',
  data: {
    total: 105,
    pageNum: 1,
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
  enabled: false,
  enabledText: '启用',
  createTime: '2022-06-26 14:49:38',
  modifyTime: '2022-06-26 14:49:38',
  totalLogin: 10,
  lastLoginIp: '127.0.0.1',
  lastLoginTime: '2022-06-26 14:49:38',
};

const userDetailResponse: ResponseDetailType = {
  code: 0,
  message: '成功',
  type: 'SUCCESS',
  data: userDetail,
};

export default {
  'POST /api/admin/user/list': (req: Request, res: Response) => {
    list.data.pageNum = req.body.pageNum;
    list.data.pageSize = req.body.pageSize;
    res.json(list);
  },
  'POST /api/admin/user/detail': userDetailResponse,
  'POST /api/admin/user/add': success,
  'POST /api/admin/user/edit': success,
  'POST /api/admin/user/delete': success,
  'POST /api/admin/user/enable': success,
  'POST /api/admin/user/bind': success,
};
