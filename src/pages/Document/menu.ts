import { MenuDataItem } from '@umijs/route-utils';

export const DocMenus: MenuDataItem[] = [
  {
    name: '接口文档',
    icon: 'BookOutlined',
    line: true,
  },
  {
    name: '后台文档',
    icon: 'BookOutlined',
  },
  {
    name: '账号管理',
    path: '/doc/admin/user',
    icon: 'BookOutlined',
    component: './Document',
    uri: '/docs/adminMenu.md',
  },
  {
    name: '角色管理',
    path: '/doc/admin/role',
    icon: 'BookOutlined',
    component: './Document',
    uri: '/docs/adminMenu.md',
  },
  {
    name: '菜单管理',
    path: '/doc/admin/menu',
    icon: 'BookOutlined',
    component: './Document',
    uri: '/docs/adminMenu.md',
  },
  {
    name: '权限管理',
    path: '/doc/admin/menu',
    icon: 'BookOutlined',
    component: './Document',
    uri: '/docs/adminMenu.md',
  },
  {
    name: '前台文档',
    icon: 'BookOutlined',
    line: true,
  },
  {
    name: '测试',
    icon: 'BookOutlined',
  },
];
