import { PureSettings } from '@ant-design/pro-layout/lib/defaultSettings';
import { MenuDataItem } from '@ant-design/pro-layout/lib/typings';
import { request } from 'umi';
import { ResponseBodyType } from '../types';
import { APIAccount } from './api';

export type MenusRemoteItem = {
  [key: string]: MenuDataItem;
};

// 当前登录返回的用户详情
export type ReponseCurrentAdminUserDetailType = {
  adminId: number;
  username: string;
  nickname: string;
  avatar: string;
  email: string;
  token: string;
  expire: number;
  permissions: CurrentUserPermissionsType | null | undefined;
  menus: MenusRemoteItem | null | undefined;
  signature?: string;
  settings?: PureSettings;
  createTime?: string;
  modifyTime?: string;
  lastLoginTime?: string;
  lastLoginIp?: string;
  loginTotal?: number;
  enabled?: boolean;
};

// 登录请求参数
export type RequestLoginParamsType = {
  username: string;
  password: string;
};

// 登录响应数据
export type ResponseLoginDataType = ReponseCurrentAdminUserDetailType;

export type RequestLogoutParamsType = {
  id: number;
};

export type CurrentUserPermissionsType = {
  [key: string]: string; // 权限名称:权限对应的接口路径
};

export type UploadImageFieldListItemType = {
  uid: string;
  name: string;
  url: string;
  status: string;
};

export async function login(params: RequestLoginParamsType) {
  return request<ResponseBodyType>(APIAccount.login.url, {
    method: APIAccount.login.method,
    data: params,
  });
}

export async function logout(params?: RequestLogoutParamsType) {
  return request<ResponseBodyType>(APIAccount.logout.url, {
    method: APIAccount.logout.method,
    data: params,
  });
}

export async function currentAdminInfo() {
  return request<ResponseBodyType>(APIAccount.detail.url, {
    method: APIAccount.detail.method,
  });
}

export async function upload(data?: any) {
  return request<ResponseBodyType>(APIAccount.upload.url, {
    method: APIAccount.upload.method,
    data: data,
  });
}
