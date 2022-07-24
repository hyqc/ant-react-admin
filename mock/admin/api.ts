import { ResponseAdminAPIListItemType } from '@/services/apis/admin/resource';
import { ResponseBodyType, ResponseDetailType } from '@/services/apis/types';
import { success } from '../common';
import { Request, Response } from 'express';

const rows: ResponseAdminAPIListItemType[] = [
  {
    apiId: 1,
    name: '菜单列表',
    path: '/admin/menu/list',
    key: 'adminMenu::list',
    enabled: true,
    enabledText: '启用',
    createTime: '2022-07-22 13:23:12',
    modifyTime: '2022-07-22 13:23:12',
  },
  {
    apiId: 2,
    name: '添加菜单',
    path: '/admin/menu/add',
    key: 'adminMenu::add',
    enabled: true,
    enabledText: '启用',
    createTime: '2022-07-22 13:23:12',
    modifyTime: '2022-07-22 13:23:12',
  },
  {
    apiId: 3,
    name: '编辑菜单',
    path: '/admin/menu/edit',
    key: 'adminMenu::edit',
    enabled: false,
    enabledText: '启用',
    createTime: '2022-07-22 13:23:12',
    modifyTime: '2022-07-22 13:23:12',
  },
  {
    apiId: 4,
    name: '删除菜单',
    path: '/admin/menu/delete',
    key: 'adminMenu::delete',
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
    apiId: 1,
    name: '菜单列表',
    path: '/admin/menu/list',
    key: 'adminMenu::list',
    enabled: true,
    describe: '',
    enabledText: '启用',
    createTime: '2022-07-22 13:23:12',
    modifyTime: '2022-07-22 13:23:12',
  },
};

export default {
  'POST /api/admin/api/list': (req: Request, res: Response) => {
    list.data.pageNum = req.body.pageNum;
    list.data.pageSize = req.body.pageSize;
    res.json(list);
  },
  'POST /api/admin/api/add': success,
  'POST /api/admin/api/detail': detail,
  'POST /api/admin/api/edit': success,
  'POST /api/admin/api/enable': success,
  'POST /api/admin/api/delete': success,
  'POST /api/admin/api/all': (req: Request, res: Response) => {
    res.json({
      code: 0,
      message: '成功',
      type: 'SUCCESS',
      data: rows,
    });
  },
};
