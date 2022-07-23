import { ResponseAdminPermissionListItemType } from '@/services/apis/admin/permission';
import { ResponseBodyType, ResponseDetailType } from '@/services/apis/types';
import { success } from '../common';
import { Request, Response } from 'express';

const rows: ResponseAdminPermissionListItemType[] = [
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
  },
  {
    menuId: 8,
    menuName: '接口管理',
    id: 4,
    name: '接口查看',
    key: 'AdminMenuView',
    type: 'view',
    typeText: '查看',
    enabled: true,
    enabledText: '启用',
    createTime: '2022-07-22 13:23:12',
    modifyTime: '2022-07-22 13:23:12',
  },
  {
    menuId: 8,
    menuName: '接口管理',
    id: 5,
    name: '编辑接口',
    key: 'AdminMenuEdit',
    typeText: '编辑',
    type: 'edit',
    enabled: true,
    enabledText: '启用',
    createTime: '2022-07-22 13:23:12',
    modifyTime: '2022-07-22 13:23:12',
  },
  {
    menuId: 8,
    menuName: '接口管理',
    id: 6,
    name: '删除接口',
    key: 'AdminMenuDelete',
    type: 'delete',
    typeText: '删除',
    enabled: false,
    enabledText: '启用',
    createTime: '2022-07-22 13:23:12',
    modifyTime: '2022-07-22 13:23:12',
  },
];
const list: ResponseBodyType = {
  code: 0,
  type: 'SUCCESS',
  message: '成功',
  data: {
    total: 55,
    pageNum: 3,
    pageSize: 10,
    rows: rows,
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
  },
};

export default {
  'POST /api/admin/permission/menu': success,
  'POST /api/admin/permission/list': (req: Request, res: Response) => {
    list.data.pageNum = req.body.pageNum;
    list.data.pageSize = req.body.pageSize;
    res.json(list);
  },
  'POST /api/admin/permission/add': success,
  'POST /api/admin/permission/detail': detail,
  'POST /api/admin/permission/edit': success,
  'POST /api/admin/permission/delete': success,
  'POST /api/admin/permission/enable': success,
};
