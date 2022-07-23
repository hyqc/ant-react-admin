import {
  ResponseAdminMenuListItemType,
  ResponseAdminMenuPermissionsType,
} from '@/services/apis/admin/menu';
import { ResponseDetailType, ResponseListType } from '@/services/apis/types';
import { success } from '../common';

const menuTreeData: ResponseAdminMenuListItemType[] = [
  {
    menuId: 0,
    name: '顶级菜单',
    path: '/',
    parentId: 0,
    redirect: '',
    hideInMenu: false,
    hideChildrenInMenu: false,
    enabled: true,
    enabledText: '启用',
    createTime: '',
    modifyTime: '',
    children: [
      {
        menuId: 1,
        name: '系统管理',
        path: '/setting',
        key: 'Setting',
        parentId: 0,
        redirect: '/',
        hideInMenu: false,
        hideChildrenInMenu: false,
        enabled: true,
        enabledText: '启用',
        createTime: '',
        modifyTime: '',
        children: [
          {
            menuId: 2,
            name: '账号管理',
            path: '/admin/user',
            key: 'AdminUser',
            parentId: 1,
            redirect: '/',
            hideInMenu: false,
            hideChildrenInMenu: false,
            enabled: true,
            enabledText: '启用',
            createTime: '',
            modifyTime: '',
          },
          {
            menuId: 3,
            name: '角色管理',
            path: '/admin/role',
            key: 'AdminRole',
            parentId: 1,
            redirect: '/',
            hideInMenu: false,
            hideChildrenInMenu: false,
            enabled: true,
            enabledText: '启用',
            createTime: '',
            modifyTime: '',
          },
          {
            menuId: 4,
            name: '菜单管理',
            path: '/admin/menu',
            key: 'AdminMenu',
            parentId: 1,
            redirect: '/',
            hideInMenu: false,
            hideChildrenInMenu: false,
            enabled: true,
            enabledText: '启用',
            createTime: '',
            modifyTime: '',
          },
          {
            path: '/admin/menu/add',
            name: '新建菜单',
            component: './Admin/Menu/add',
            hideInMenu: true,
            key: 'AdminMenuAdd',
            menuId: 5,
            parentId: 1,
            redirect: '/',
            hideChildrenInMenu: false,
            enabled: true,
            enabledText: '启用',
            createTime: '',
            modifyTime: '',
          },
          {
            path: '/admin/menu/edit',
            component: './Admin/Menu/edit',
            hideInMenu: true,
            key: 'AdminMenuEdit',
            name: '编辑菜单',
            menuId: 6,
            parentId: 1,
            redirect: '/',
            hideChildrenInMenu: false,
            enabled: true,
            enabledText: '启用',
            createTime: '',
            modifyTime: '',
          },
          {
            menuId: 7,
            name: '权限管理',
            path: '/admin/permission',
            key: 'AdminPermission',
            parentId: 1,
            redirect: '/',
            hideInMenu: false,
            hideChildrenInMenu: false,
            enabled: true,
            enabledText: '启用',
            createTime: '',
            modifyTime: '',
          },
          {
            menuId: 8,
            name: '接口管理',
            path: '/admin/api',
            key: 'AdminApi',
            parentId: 1,
            redirect: '/',
            hideInMenu: false,
            hideChildrenInMenu: false,
            enabled: false,
            enabledText: '启用',
            createTime: '',
            modifyTime: '',
          },
        ],
      },
    ],
  },
];

const menuTree: ResponseListType = {
  code: 0,
  message: 'success',
  type: 'SUCCESS',
  data: {
    total: 1,
    pageNum: 1,
    pageSize: 10,
    rows: menuTreeData,
  },
};

const menuDetail: ResponseDetailType = {
  code: 0,
  message: 'success',
  type: 'SUCCESS',
  data: {
    menuId: 4,
    name: '菜单管理',
    path: '/admin/menu',
    key: 'AdminMenu',
    parentId: 1,
    redirect: '/',
    hideInMenu: false,
    hideChildrenInMenu: false,
    enabled: true,
    enabledText: '启用',
    createTime: '',
    modifyTime: '',
  },
};
const menuPermissionsDetail: ResponseAdminMenuPermissionsType = {
  menu: {
    id: 4,
    name: '菜单管理',
    path: '/admin/menu',
    key: 'AdminMenu',
  },
  permissions: [
    {
      menuId: 4,
      key: 'AdminMenuView',
      type: 'view',
      typeText: '查看',
      name: '菜单查看',
      describe: '菜单查看',
      enabled: true,
    },
    {
      menuId: 4,
      key: 'AdminMenuEdit',
      type: 'edit',
      typeText: '编辑',
      name: '菜单编辑',
      describe: '菜单编辑',
      enabled: true,
    },
    {
      menuId: 4,
      key: 'AdminMenuDelete',
      type: 'delete',
      typeText: '删除',
      name: '菜单删除',
      describe: '菜单删除',
      enabled: true,
    },
  ],
};
const menuPermissions: ResponseDetailType = {
  code: 0,
  message: 'success',
  type: 'SUCCESS',
  data: menuPermissionsDetail,
};
export default {
  'POST /api/admin/menu/tree': menuTree,
  'POST /api/admin/menu/add': success,
  'POST /api/admin/menu/edit': success,
  'POST /api/admin/menu/enable': success,
  'POST /api/admin/menu/delete': success,
  'POST /api/admin/menu/detail': menuDetail,
  'POST /api/admin/menu/permissions': menuPermissions,
};
