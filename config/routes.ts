export default [
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
  },
  {
    path: '/',
    redirect: '/admin',
  },
  {
    component: './404',
  },
];
