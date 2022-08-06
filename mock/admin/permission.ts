import { ResponseAdminPermissionListItemType } from '@/services/apis/admin/permission';
import { ResponseBodyType, ResponseDetailType } from '@/services/apis/types';
import { success } from '../common';
import { Request, Response } from 'express';

const list: ResponseAdminPermissionListItemType[] = [
  {
    menuId: 4,
    menuName: '菜单列表',
    id: 1,
    name: '查看菜单',
    key: 'AdminMenuView',
    type: 'view',
    typeText: '查看',
    enabled: true,
    enabledText: '启用',
    createTime: '2022-07-22 13:23:12',
    modifyTime: '2022-07-22 13:23:12',
    apis: [
      {
        apiId: 1,
        name: '菜单列表',
        key: 'AdminMenu::list',
        path: '/admin/menu/list',
      },
      {
        apiId: 2,
        name: '菜单详情',
        key: 'AdminMenu::detail',
        path: '/admin/menu/detail',
      },
      {
        apiId: 3,
        name: '菜单树形列表',
        key: 'AdminMenu::tree',
        path: '/admin/menu/tree',
      },
    ],
  },
  {
    menuId: 4,
    menuName: '菜单管理',
    id: 2,
    name: '菜单查看',
    key: 'AdminMenuEdit',
    type: 'edit',
    typeText: '编辑',
    enabled: true,
    enabledText: '启用',
    createTime: '2022-07-22 13:23:12',
    modifyTime: '2022-07-22 13:23:12',
    apis: [
      {
        apiId: 4,
        name: '编辑菜单',
        key: 'AdminMenu::edit',
        path: '/admin/menu/edit',
      },
      {
        apiId: 5,
        name: '启用禁用菜单',
        key: 'AdminMenu::enable',
        path: '/admin/menu/enable',
      },
    ],
  },
  {
    menuId: 4,
    menuName: '菜单管理',
    id: 3,
    name: '删除菜单',
    key: 'AdminMenuDelete',
    type: 'delete',
    typeText: '删除',
    enabled: true,
    enabledText: '启用',
    createTime: '2022-07-22 13:23:12',
    modifyTime: '2022-07-22 13:23:12',
    apis: [
      {
        apiId: 6,
        name: '删除菜单',
        key: 'AdminMenu::delete',
        path: '/admin/menu/delete',
      },
    ],
  },
  {
    menuId: 8,
    menuName: '接口管理',
    id: 4,
    name: '接口查看',
    key: 'AdminApiView',
    type: 'view',
    typeText: '查看',
    enabled: true,
    enabledText: '启用',
    createTime: '2022-07-22 13:23:12',
    modifyTime: '2022-07-22 13:23:12',
    apis: [
      {
        apiId: 7,
        name: '接口列表',
        key: 'AdminApi::list',
        path: '/admin/api/list',
      },
      {
        apiId: 8,
        name: '删除菜单',
        key: 'AdminApi::detail',
        path: '/admin/api/detail',
      },
    ],
  },
  {
    menuId: 8,
    menuName: '接口管理',
    id: 5,
    name: '编辑接口',
    key: 'AdminApiEdit',
    typeText: '编辑',
    type: 'edit',
    enabled: true,
    enabledText: '启用',
    createTime: '2022-07-22 13:23:12',
    modifyTime: '2022-07-22 13:23:12',
    apis: [
      {
        apiId: 14,
        name: '编辑接口',
        key: 'AdminApi::edit',
        path: '/admin/api/edit',
      },
      {
        apiId: 15,
        name: '启用禁用接口',
        key: 'AdminApi::enable',
        path: '/admin/api/enable',
      },
    ],
  },
  {
    menuId: 8,
    menuName: '接口管理',
    id: 6,
    name: '删除接口',
    key: 'AdminApiDelete',
    type: 'delete',
    typeText: '删除',
    enabled: false,
    enabledText: '启用',
    createTime: '2022-07-22 13:23:12',
    modifyTime: '2022-07-22 13:23:12',
    apis: [
      {
        apiId: 16,
        name: '删除接口',
        key: 'AdminApi::delete',
        path: '/admin/api/delete',
      },
    ],
  },
];
const listData: ResponseBodyType = {
  code: 0,
  type: 'SUCCESS',
  message: '成功',
  data: {
    total: 55,
    pageNum: 3,
    pageSize: 10,
    list,
  },
};

const detail: ResponseDetailType = {
  code: 0,
  type: 'SUCCESS',
  message: '成功',
  data: {
    menuId: 4,
    menuName: '菜单管理',
    id: 3,
    name: '删除菜单',
    key: 'AdminMenuDelete',
    type: 'delete',
    typeText: '删除',
    enabled: true,
    enabledText: '启用',
    createTime: '2022-07-22 13:23:12',
    modifyTime: '2022-07-22 13:23:12',
    apis: [
      {
        apiId: 1,
        name: '菜单列表',
        key: 'AdminMenu::list',
        path: '/admin/menu/list',
      },
      {
        apiId: 2,
        name: '菜单详情',
        key: 'AdminMenu::detail',
        path: '/admin/menu/detail',
      },
      {
        apiId: 3,
        name: '菜单树形列表',
        key: 'AdminMenu::tree',
        path: '/admin/menu/tree',
      },
    ],
  },
};

export default {
  'POST /api/admin/permission/menu': success,
  'POST /api/admin/permission/list': (req: Request, res: Response) => {
    listData.data.pageNum = req.body.pageNum;
    listData.data.pageSize = req.body.pageSize;
    res.json(list);
  },
  'POST /api/admin/permission/add': success,
  'POST /api/admin/permission/detail': detail,
  'POST /api/admin/permission/edit': success,
  'POST /api/admin/permission/delete': success,
  'POST /api/admin/permission/enable': success,
  'POST /api/admin/permission/unbind': success,
  'POST /api/admin/permission/bind': success,
};
