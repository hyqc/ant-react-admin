import { POST } from './config';

export type APIItemType = {
  url: string;
  method?: string;
};

export type APIType = {
  [key: string]: APIItemType;
};

export const APIBase = {
  login: {
    url: '/admin/base/login',
    method: POST,
  },
  logout: {
    url: '/admin/base/logout',
    method: POST,
  },
  admin: {
    url: '/admin/base/info',
    method: POST,
  },
  upload: {
    url: '/admin/base/upload',
    method: POST,
  },
};

export const APIAdminUsers = {
  list: {
    url: '/admin/user/list',
    method: POST,
  },
  get: {
    url: '/admin/user/get',
    method: POST,
  },
  add: {
    url: '/admin/user/add',
    method: POST,
  },
  delete: {
    url: '/admin/user/delete',
    method: POST,
  },
  edit: {
    url: '/admin/user/edit',
    method: POST,
  },
  enable: {
    url: '/admin/user/enable',
    method: POST,
  },
  assignRoles: {
    url: '/admin/user/assignRoles',
    method: POST,
  },
};

export const APIAdminRoles = {
  list: {
    url: '/admin/role/list',
    method: POST,
  },
  get: {
    url: '/admin/role/get',
    method: POST,
  },
  add: {
    url: '/admin/role/add',
    method: POST,
  },
  delete: {
    url: '/admin/role/delete',
    method: POST,
  },
  edit: {
    url: '/admin/role/edit',
    method: POST,
  },
  enable: {
    url: '/admin/role/enable',
    method: POST,
  },
  all: {
    url: '/admin/role/all',
    method: POST,
  },
};

export const APIAdminMenus = {
  list: {
    url: '/admin/menu/list',
    method: POST,
  },
  get: {
    url: '/admin/menu/get',
    method: POST,
  },
  add: {
    url: '/admin/menu/add',
    method: POST,
  },
  delete: {
    url: '/admin/menu/delete',
    method: POST,
  },
  edit: {
    url: '/admin/menu/edit',
    method: POST,
  },
  enable: {
    url: '/admin/menu/enable',
    method: POST,
  },
  all: {
    url: '/admin/menu/all',
    method: POST,
  },
};

export const APIAdminPermissions = {
  list: {
    url: '/admin/permission/list',
    method: POST,
  },
  get: {
    url: '/admin/permission/get',
    method: POST,
  },
  add: {
    url: '/admin/permission/add',
    method: POST,
  },
  delete: {
    url: '/admin/permission/delete',
    method: POST,
  },
  edit: {
    url: '/admin/permission/edit',
    method: POST,
  },
  enable: {
    url: '/admin/permission/enable',
    method: POST,
  },
  all: {
    url: '/admin/permission/all',
    method: POST,
  },
};
