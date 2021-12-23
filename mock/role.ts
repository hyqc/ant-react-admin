// import { Request, Response } from 'express';
import type { ResponseAllType } from '@/services/apis/types';
import { success } from './common';

const adminRolesAllList: ResponseAllType = {
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

// 代码中会兼容本地 service mock 以及部署站点的静态数据
export default {
  // 支持值为 Object 和 Array
  'POST /api/admin/role/all': adminRolesAllList,
  'POST /api/admin/role/add': success,
  'POST /api/admin/role/edit': success,
  'POST /api/admin/role/delete': success,
};
