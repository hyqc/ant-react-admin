export default [
  {
    path: '/login',
    name: 'login',
    icon: 'crown',
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
