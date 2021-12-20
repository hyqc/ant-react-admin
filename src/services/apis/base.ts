import { PureSettings } from '@ant-design/pro-layout/lib/defaultSettings';
import { MenuDataItem } from '@ant-design/pro-layout/lib/typings';
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

export type CurrentUserPermissionsType = {
  [key: string]: string; // 权限名称:权限对应的接口路径
};

export type ReponseCurrentUserInfoType = {
  id: number;
  name: string;
  nick_name: string;
  avatar: string;
  email: string;
  signature?: string;
  permissions: CurrentUserPermissionsType;
  menus: MenuDataItem;
  settings?: PureSettings;
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
  return request(APIBase.admin.url, {
    method: APIBase.admin.method,
  });
}
