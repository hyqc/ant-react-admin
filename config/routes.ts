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
