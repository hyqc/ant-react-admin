// import { Request, Response } from 'express';
import type { ResponseAllType, ResponseListType } from '@/services/apis/types';
import { success } from './common';

const adminPermissionList: ResponseListType = {
  code: 0,
  message: '成功',
  data: {
    total: 12,
    pageNo: 1,
    pageSize: 10,
    rows: [
      {
        id: 1,
        name: '',
      },
    ],
  },
};
const adminPermissionAll: ResponseAllType = {
  code: 0,
  message: '成功',
  data: [
    {
      mode_id: 1,
      mode_name: '系统管理',
      children: [
        {
          page_id: 2,
          page_name: '管理员管理',
          children: [
            {
              permission_id: 1,
              permission_name: '查看',
            },
            {
              permission_id: 2,
              permission_name: '编辑',
            },
            {
              permission_id: 3,
              permission_name: '删除',
            },
          ],
        },
        {
          page_id: 3,
          page_name: '角色管理',
          children: [
            {
              permission_id: 4,
              permission_name: '查看',
            },
            {
              permission_id: 5,
              permission_name: '编辑',
            },
            {
              permission_id: 6,
              permission_name: '删除',
            },
          ],
        },
        {
          page_id: 4,
          page_name: '菜单管理', //
          children: [
            {
              permission_id: 7,
              permission_name: '查看',
            },
            {
              permission_id: 8,
              permission_name: '编辑',
            },
            {
              permission_id: 9,
              permission_name: '删除',
            },
          ],
        },
        {
          page_id: 5,
          page_name: '权限管理',
          children: [
            {
              permission_id: 10,
              permission_name: '查看',
            },
            {
              permission_id: 11,
              permission_name: '编辑',
            },
            {
              permission_id: 12,
              permission_name: '删除',
            },
          ],
        },
        {
          page_id: 6,
          page_name: '接口管理',
          children: [
            {
              permission_id: 13,
              permission_name: '查看',
            },
            {
              permission_id: 14,
              permission_name: '编辑',
            },
            {
              permission_id: 15,
              permission_name: '删除',
            },
          ],
        },
      ],
    },
  ],
};

// 代码中会兼容本地 service mock 以及部署站点的静态数据
export default {
  // 支持值为 Object 和 Array
  'POST /api/admin/permission/list': adminPermissionList,
  'POST /api/admin/permission/all': adminPermissionAll,
  'POST /api/admin/permission/add': success,
  'POST /api/admin/permission/edit': success,
  'POST /api/admin/permission/delete': success,
  'POST /api/admin/permission/detail': success,
};
