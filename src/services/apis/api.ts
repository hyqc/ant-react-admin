import { POST } from './config';

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
