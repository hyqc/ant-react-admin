import type { ReponseCurrentAdminUserDetailType } from '@/services/apis/admin/account';
import { MenuDataItem } from '@umijs/route-utils';

const AvatarImage =
  'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png';

const menusData: MenuDataItem = [
  {
    path: '/login',
    component: './Login',
    title: 'login',
    layout: false,
  },
  {
    name: 'admin',
    icon: 'setting',
    routes: [
      {
        path: '/admin/user',
        name: 'user',
        icon: 'UserOutlined',
        component: './Admin/User',
      },
      {
        path: '/admin/role',
        name: 'role',
        icon: 'UserSwitchOutlined',
        component: './Admin/Role',
      },
      {
        path: '/admin/permission',
        name: 'permission',
        icon: 'UnlockOutlined',
        component: './Admin/Permission',
      },
      {
        path: '/admin/api',
        name: 'api',
        icon: 'ApiOutlined',
        component: './Admin/Api',
      },
    ],
  },
  {
    path: '/',
    redirect: '/admin/user',
  },
  {
    component: './404',
  },
];

const currentAdminUserDetail: ReponseCurrentAdminUserDetailType = {
  adminId: 1,
  username: 'Serati Ma',
  nickname: 'Serati Ma',
  avatar: AvatarImage,
  email: 'antdesign@alipay.com',
  createTime: '2022-07-09 15:03:23',
  modifyTime: '2022-07-09 15:03:23',
  signature: '海纳百川，有容乃大',
  menus: menusData,
  permissions: {
    AdminUserList: '/admin/user/list',
    AdminUserEdit: '/admin/user/edit',
    AdminUserAdd: '/admin/user/add',
    AdminUserDelete: '/admin/user/delete',
    AdminUserEnable: '/admin/user/enable',
  },
  settings: {
    layout: 'side',
  },
  lastLoginTime: '2022-07-09 15:03:24',
  lastLoginIp: '127.0.0.1',
  loginTotal: 788,
  enabled: true,
  token:
    'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImNyZWF0ZWQiOjE2NTczNTQ3Mjg2ODksImV4cCI6MTY1Nzk1OTUyOCwidmVyc2lvbiI6Ils5NywgLTQ3LCAtNjIsIC03LCA2MiwgLTg0LCAtNjEsIDIxLCAtOCwgMTI3LCAtMiwgLTg1LCAtNjYsIDI0LCAtMTA5LCA0OF0ifQ.aO41xj0X1XLlEGunT1NGZw9uxV-Yo_H-iPpdjVGE1RIH5p0Vyu3bwCob3wzDet2nFOLaNIiK5RxvR8DBe_lcjQ',
  expire: 604800,
};

const LoginData = {
  code: 0,
  type: 'SUCCESS',
  message: '登录成功',
  data: currentAdminUserDetail,
};

export { currentAdminUserDetail };

// 代码中会兼容本地 service mock 以及部署站点的静态数据
export default {
  'POST /api/admin/account/login': LoginData,
};
