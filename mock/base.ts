import type { ReponseCurrentUserInfoType } from '@/services/apis/base';
import { MenuDataItem } from '@umijs/route-utils';
import { Request, Response } from 'express';

const menusData: MenuDataItem = [
  {
    path: '/login',
    component: './Login',
    layout: false,
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    component: './Admin',
    authority: 'admin',
  },
  {
    path: '/',
    redirect: '/admin',
  },
  {
    component: './404',
  },
];

const currentAdminInfo: ReponseCurrentUserInfoType = {
  id: 1,
  name: 'Serati Ma',
  nick_name: 'Serati Ma',
  avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
  email: 'antdesign@alipay.com',
  signature: '海纳百川，有容乃大',
  permissions: {
    AdminUserList: '/admin/user/list',
    AdminUserEdit: '/admin/user/edit',
    AdminUserAdd: '/admin/user/add',
    AdminUserDelete: '/admin/user/delete',
    AdminUserEnable: '/admin/user/enable',
  },
  menus: menusData,
  settings: {
    layout: 'side',
  },
};

// 代码中会兼容本地 service mock 以及部署站点的静态数据
export default {
  // 支持值为 Object 和 Array
  'POST /api/admin/base/info': (req: Request, res: Response) => {
    res.send({
      code: 0,
      message: '成功',
      data: currentAdminInfo,
    });
  },
  'POST /api/admin/base/login': {
    code: 0,
    message: '登录成功',
    data: {
      token: 'dddddddddddddddddddd',
      expire: 86400,
    },
  },
  'POST /api/admin/base/logout': (req: Request, res: Response) => {
    res.send({ code: 0, message: '退出成功' });
  },
};
