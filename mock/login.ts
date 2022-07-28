import type {
  MenusRemoteItem,
  ReponseCurrentAdminUserDetailType,
} from '@/services/apis/admin/account';

const AvatarImage =
  'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png';

const menusData: MenusRemoteItem = {
  AdminUser: {
    key: 'AdminUser',
    path: '/admin/user',
    name: 'user',
    icon: 'UserOutlined',
    component: './Admin/User',
    hideInMenu: false,
  },
  AdminRole: {
    key: 'AdminRole',
    path: '/admin/role',
    name: 'role',
    icon: 'UserSwitchOutlined',
    component: './Admin/Role',
    hideInMenu: false,
  },
  AdminMenu: {
    key: 'AdminMenu',
    path: '/admin/menu',
    name: 'menu',
    icon: 'UnlockOutlined',
    component: './Admin/Menu',
    hideInMenu: false,
  },
  AdminMenuAdd: {
    key: 'AdminMenuAdd',
    path: '/admin/menu/add',
    name: 'menu.add',
    component: './Admin/Menu/add',
    hideInMenu: true,
  },
  AdminMenuEdit: {
    key: 'AdminMenuEdit',
    path: '/admin/menu/edit',
    name: 'menu.edit',
    component: './Admin/Menu/edit',
    hideInMenu: true,
  },
  AdminPermission: {
    key: 'AdminPermission',
    path: '/admin/permission',
    name: 'permission',
    icon: 'UnlockOutlined',
    component: './Admin/Permission',
    hideInMenu: false,
  },
  AdminApi: {
    key: 'AdminApi',
    path: '/admin/api',
    name: 'api',
    icon: 'ApiOutlined',
    component: './Admin/Api',
    hideInMenu: false,
  },
};

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
    AdminUserView: '查看管理员',
    AdminUserEdit: '编辑管理员',
    AdminUserDelete: '删除管理员',
    AdminRoleView: '查看角色',
    AdminRoleEdit: '编辑角色',
    AdminRoleDelete: '删除角色',
    AdminMenuView: '查看菜单',
    AdminMenuEdit: '编辑菜单',
    AdminMenuDelete: '删除菜单',
    AdminPermissionView: '查看权限',
    AdminPermissionEdit: '编辑权限',
    AdminPermissionDelete: '删除权限',
    AdminApiView: '查看接口',
    AdminApiEdit: '编辑接口',
    AdminApiDelete: '删除接口',
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
