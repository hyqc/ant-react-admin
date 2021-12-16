import { request } from 'umi';
import { APIBase } from './api';
import type { ResponseType } from './types';

export type RequestLoginParamsType = {
  name: string;
  password: string;
  vcode: string;
};

export type ResponseLoginDataType = {
  token: string;
  expire: number;
  admin: any;
  menus: any;
};

export type RequestLogoutParamsType = {
  id: number;
};

export type ReponseCurrentUserType = {
  name?: string;
  avatar?: string;
  userid?: string;
  email?: string;
  signature?: string;
  title?: string;
  group?: string;
  tags?: { key?: string; label?: string }[];
  notifyCount?: number;
  unreadCount?: number;
  country?: string;
  access?: string;
  geographic?: {
    province?: { label?: string; key?: string };
    city?: { label?: string; key?: string };
  };
  address?: string;
  phone?: string;
};

export async function login(params: RequestLoginParamsType) {
  return request<ResponseType>(APIBase.login.url, {
    method: APIBase.login.method,
    data: params,
  });
}

export async function logout(params?: RequestLogoutParamsType) {
  return request(APIBase.logout.url, {
    method: APIBase.logout.method,
    data: params,
  });
}

export async function currentAdminInfo() {
  return request(APIBase.logout.url, {
    method: APIBase.logout.method,
  });
}
