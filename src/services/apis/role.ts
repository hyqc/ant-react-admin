// adminRoles 管理员角色接口
import { request } from 'umi';
import { APIAdminRoles } from './api';
import type { ResponseType } from './types';

export type RequestAdminRoleAllParamsType = {
  name?: string; // 角色名称
};

export type ResponseAdminRoleAllItemType = {
  id: number;
  name: string;
};

export async function adminRoleAll(params?: RequestAdminRoleAllParamsType) {
  return request<ResponseType>(APIAdminRoles.all.url, {
    method: APIAdminRoles.all.method,
    data: params,
  });
}

export type RequestAdminRoleListParamsType = {
  name?: string;
  status?: number;
  pageNo?: number;
  pageSize?: number;
  sortField?: string;
  sortType?: string;
};

export type ResponseAdminRoleListItemType = {
  id: number;
  name: string;
  status: number;
  status_text: string;
  create_time: string;
  modify_time: string;
};

export async function adminRoleList(params?: RequestAdminRoleListParamsType) {
  return request<ResponseType>(APIAdminRoles.list.url, {
    method: APIAdminRoles.list.method,
    data: params,
  });
}

export type RequestAdminRoleIDetailParamsType = {
  id: number;
};

export type ResponseAdminRoleDetailType = {
  id: number;
  name: string;
  status?: number;
  status_text?: string;
  create_time?: string;
  modify_time?: string;
  permission_ids: number[];
};

export async function adminRoleGet(params: RequestAdminRoleIDetailParamsType) {
  return request<ResponseType>(APIAdminRoles.get.url, {
    method: APIAdminRoles.get.method,
    data: params,
  });
}

export type RequestAdminRoleAddParamsType = {
  name: string;
  status?: number;
  permission_ids?: string;
};

export async function adminRoleAdd(params: RequestAdminRoleAddParamsType) {
  return request<ResponseType>(APIAdminRoles.add.url, {
    method: APIAdminRoles.add.method,
    data: params,
  });
}

export type RequestAdminRoleEditParamsType = {
  id: number;
  name?: string;
  status?: number;
  permission_ids?: string;
};

export async function adminRoleEdit(params: RequestAdminRoleEditParamsType) {
  return request<ResponseType>(APIAdminRoles.edit.url, {
    method: APIAdminRoles.edit.method,
    data: params,
  });
}

export type RequestAdminRoleDeleteParamsType = {
  id: number;
};

export async function adminRoleDelete(params: RequestAdminRoleDeleteParamsType) {
  return request<ResponseType>(APIAdminRoles.delete.url, {
    method: APIAdminRoles.delete.method,
    data: params,
  });
}
