// adminPermissions 管理员管理接口
import { request } from 'umi';
import { APIAdminPermissions } from './api';
import type { ResponseType } from './types';

export async function adminPermissionAll() {
  return request<ResponseType>(APIAdminPermissions.all.url, {
    method: APIAdminPermissions.all.method,
    data: {},
  });
}

export type RequestAdminPermissionListParamsType = {
  name?: string;
};

export async function adminPermissionList(params?: RequestAdminPermissionListParamsType) {
  return request<ResponseType>(APIAdminPermissions.list.url, {
    method: APIAdminPermissions.list.method,
    data: params,
  });
}

export type RequestAdminPermissionAddParamsType = {
  name: string; // 权限唯一名称
  title: string; // 权限的标题
};

export async function adminPermissionAdd(params: RequestAdminPermissionAddParamsType) {
  return request<ResponseType>(APIAdminPermissions.add.url, {
    method: APIAdminPermissions.add.method,
    data: params,
  });
}
