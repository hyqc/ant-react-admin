export default [
  {
    path: '/login',
    component: './Login',
    title: 'login',
    layout: false,
  },
  {
    name: 'admin',
    icon: 'crown',
    routes: [
      {
        path: '/admin/user',
        name: 'user',
        icon: 'table',
        component: './AdminUser',
      },
      {
        path: '/admin/role',
        name: 'role',
        icon: 'crown',
        component: './AdminRole',
      },
      {
        path: '/admin/menu',
        name: 'menu',
        icon: 'crown',
        component: './AdminMenu',
      },
      {
        path: '/admin/api',
        name: 'api',
        icon: 'crown',
        component: './AdminApi',
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
