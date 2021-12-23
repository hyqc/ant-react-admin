// adminRoles 管理员角色接口
import { request } from 'umi';
import { APIAdminRoles } from './api';
import type { ResponseType } from './types';

export type RequestAdminRolesAllParamsType = {
  name?: string; // 角色名称
};

export type ResponseAdminRolesAllItemType = {
  id: number;
  name: string;
};

export async function adminRolesAll(params?: RequestAdminRolesAllParamsType) {
  return request<ResponseType>(APIAdminRoles.all.url, {
    method: APIAdminRoles.all.method,
    data: params,
  });
}
