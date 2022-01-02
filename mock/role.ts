// import { Request, Response } from 'express';
import type { ResponseAllType, ResponseListType } from '@/services/apis/types';
import { success } from './common';

const adminRoleList: ResponseListType = {
  code: 0,
  message: '成功',
  data: {
    total: 12,
    pageNo: 1,
    pageSize: 10,
    rows: [
      {
        id: 1,
        name: 'admin',
        status: 1,
        status_text: '启用',
        create_time: '2021-12-25 12:23:12',
        modify_time: '2021-12-25 12:23:12',
      },
      {
        id: 2,
        name: '运营',
        status: 1,
        status_text: '启用',
        create_time: '2021-12-25 12:23:12',
        modify_time: '2021-12-25 12:23:12',
      },
      {
        id: 3,
        name: '测试',
        status: 2,
        status_text: '禁用',
        create_time: '2021-12-25 12:23:12',
        modify_time: '2021-12-25 12:23:12',
      },
    ],
  },
};

const adminRoleAll: ResponseAllType = {
  code: 0,
  message: '成功',
  data: [
    {
      id: 1,
      name: 'admin',
    },
    {
      id: 2,
      name: '运营',
    },
    {
      id: 3,
      name: '测试',
    },
  ],
};

const adminRoleDetail: ResponseAdminRoleDetailType = {};

// 代码中会兼容本地 service mock 以及部署站点的静态数据
export default {
  // 支持值为 Object 和 Array
  'POST /api/admin/role/list': adminRoleList,
  'POST /api/admin/role/all': adminRoleAll,
  'POST /api/admin/role/add': success,
  'POST /api/admin/role/edit': success,
  'POST /api/admin/role/delete': success,
  'POST /api/admin/role/detail': success,
};
