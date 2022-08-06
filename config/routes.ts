﻿export default [
  {
    key: 'Login',
    path: '/login',
    component: './Login',
    title: 'login',
    layout: false,
    allow: 'allow',
  },
  {
    path: '/',
    redirect: '/home',
    key: 'Home',
    access: 'allow',
  },
  {
    path: '/home',
    name: 'home',
    icon: 'HomeOutlined',
    component: './Home',
    key: 'Home',
    access: 'allow',
  },
  {
    path: '/account',
    name: 'account',
    icon: 'HomeOutlined',
    component: './Account',
    key: 'Account',
    access: 'allow',
  },
  {
    path: '/admin',
    key: 'Admin',
    name: 'admin',
    icon: 'SettingOutlined',
    access: 'allow',
    routes: [
      {
        key: 'AdminUser',
        path: '/admin/user',
        name: 'user',
        icon: 'UserOutlined',
        component: './Admin/User',
        hideInMenu: true,
        access: 'forbidden',
      },
      {
        key: 'AdminRole',
        path: '/admin/role',
        name: 'role',
        icon: 'UserSwitchOutlined',
        component: './Admin/Role',
        hideInMenu: true,
        access: 'forbidden',
      },
      {
        key: 'AdminMenu',
        path: '/admin/menu',
        name: 'menu',
        icon: 'UnlockOutlined',
        component: './Admin/Menu',
        hideInMenu: true,
        access: 'forbidden',
      },
      {
        key: 'AdminMenuAdd',
        path: '/admin/menu/add',
        name: 'menu.add',
        component: './Admin/Menu/add',
        hideInMenu: true,
        access: 'forbidden',
      },
      {
        key: 'AdminMenuEdit',
        path: '/admin/menu/edit',
        name: 'menu.edit',
        component: './Admin/Menu/edit',
        hideInMenu: true,
        access: 'forbidden',
      },
      {
        key: 'AdminPermission',
        path: '/admin/permission',
        name: 'permission',
        icon: 'UnlockOutlined',
        component: './Admin/Permission',
        hideInMenu: true,
        access: 'forbidden',
      },
      {
        key: 'AdminApi',
        path: '/admin/api',
        name: 'api',
        icon: 'ApiOutlined',
        component: './Admin/Api',
        hideInMenu: true,
        access: 'forbidden',
      },
      {
        component: './404',
        access: 'allow',
        key: '404',
      },
    ],
  },
  {
    name: 'doc',
    path: '/doc',
    icon: 'BookOutlined',
    component: './Document',
    key: 'Doc',
    access: 'allow',
    layout: false,
  },
  {
    name: 'demo',
    path: '/demo',
    icon: 'BookOutlined',
    component: './Demo',
    key: 'Demo',
    access: 'allow',
  },
  {
    component: './404',
    key: '404',
    access: 'allow',
  },
];
