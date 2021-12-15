import { POST } from './config';

export type APIItemType = {
  url: string;
  method?: string;
};

export type APIType = {
  [key: string]: APIItemType;
};

export const Base = {
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
};

export const Admin = {};
