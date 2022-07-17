export default [
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
        path: '/admin/menu',
        name: 'menu',
        icon: 'UnlockOutlined',
        component: './Admin/Menu',
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
    name: 'doc',
    icon: 'book',
    layout: false,
    routes: [
      {
        path: '/doc/adminMenu.md',
        layout: false,
        name: 'menu',
        icon: 'UserOutlined',
      },
    ],
  },
  {
    component: './404',
  },
];
