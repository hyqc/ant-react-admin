export default [
  {
    path: '/login',
    component: './Login',
    title: 'login',
    layout: false,
  },
  {
    name: 'admin',
    path: '/admin',
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
    name: 'demo',
    path: '/demo',
    icon: 'book',
    component: './Demo',
  },
  {
    path: '/',
    redirect: '/admin/user',
  },
  {
    path: '*',
    component: './404',
  },
];
