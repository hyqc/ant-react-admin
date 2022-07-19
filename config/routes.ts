﻿export default [
  {
    path: '/login',
    component: './Login',
    title: 'login',
    layout: false,
    key: 'Login',
  },
  {
    name: 'admin',
    path: '/admin',
    icon: 'setting',
    key: 'Admin',
    routes: [
      {
        path: '/admin/user',
        name: 'user',
        icon: 'UserOutlined',
        component: './Admin/User',
        key: 'AdminUser',
      },
      {
        path: '/admin/role',
        name: 'role',
        icon: 'UserSwitchOutlined',
        component: './Admin/Role',
        key: 'AdminRole',
      },
      {
        path: '/admin/menu',
        name: 'menu',
        icon: 'UnlockOutlined',
        component: './Admin/Menu',
        key: 'AdminMenu',
      },
      {
        path: '/admin/menu/add',
        name: 'menu.add',
        component: './Admin/Menu/add',
        hideInMenu: true,
        key: 'AdminMenuAdd',
      },
      {
        path: '/admin/permission',
        name: 'permission',
        icon: 'UnlockOutlined',
        component: './Admin/Permission',
        key: 'AdminPermission',
      },
      {
        path: '/admin/api',
        name: 'api',
        icon: 'ApiOutlined',
        component: './Admin/Api',
        key: 'AdminApi',
      },
    ],
  },
  {
    name: 'demo',
    path: '/demo',
    icon: 'book',
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
