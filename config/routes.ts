﻿export default [
  {
    key: 'Login',
    path: '/login',
    component: './Login',
    title: 'login',
    layout: false,
  },
  {
    key: 'Admin',
    name: 'admin',
    path: '/admin',
    icon: 'SettingOutlined',
    routes: [
      {
        key: 'AdminUser',
        path: '/admin/user',
        name: 'user',
        icon: 'UserOutlined',
        component: './Admin/User',
        hideInMenu: true,
      },
      {
        key: 'AdminRole',
        path: '/admin/role',
        name: 'role',
        icon: 'UserSwitchOutlined',
        component: './Admin/Role',
        hideInMenu: true,
      },
      {
        key: 'AdminMenu',
        path: '/admin/menu',
        name: 'menu',
        icon: 'UnlockOutlined',
        component: './Admin/Menu',
        hideInMenu: true,
      },
      {
        key: 'AdminMenuAdd',
        path: '/admin/menu/add',
        name: 'menu.add',
        component: './Admin/Menu/add',
        hideInMenu: true,
      },
      {
        key: 'AdminMenuEdit',
        path: '/admin/menu/edit',
        name: 'menu.edit',
        component: './Admin/Menu/edit',
        hideInMenu: true,
      },
      {
        key: 'AdminPermission',
        path: '/admin/permission',
        name: 'permission',
        icon: 'UnlockOutlined',
        component: './Admin/Permission',
        hideInMenu: true,
      },
      {
        key: 'AdminApi',
        path: '/admin/api',
        name: 'api',
        icon: 'ApiOutlined',
        component: './Admin/Api',
        hideInMenu: true,
      },
    ],
  },
  {
    name: 'demo',
    path: '/demo',
    icon: 'BookOutlined',
    component: './Demo',
    key: 'Demo',
  },
  {
    path: '/',
    redirect: '/home',
    key: 'Home',
  },
  {
    path: '*',
    component: './404',
    key: '404',
  },
];
