// adminPermissions 管理员管理接口
import { request } from 'umi';
import { APIAdminPermissions } from './api';
import type { ResponseBodyType } from '../types';
import { ResponseAdminMenuPermissionsItemType } from './menu';

/************************************************************/
/**
 * 全部权限列表
 * @returns
 */
export async function adminPermissionAll() {
  return request<ResponseBodyType>(APIAdminPermissions.all.url, {
    method: APIAdminPermissions.all.method,
    data: {},
  });
}

/************************************************************/
/**
 * 权限分页列表
 */
export type RequestAdminPermissionListParamsType = {
  name?: string;
};

export async function adminPermissionList(params?: RequestAdminPermissionListParamsType) {
  return request<ResponseBodyType>(APIAdminPermissions.list.url, {
    method: APIAdminPermissions.list.method,
    data: params,
  });
}

/************************************************************/
/**
 * 添加权限
 */
export type RequestAdminPermissionAddParamsType = {
  name: string; // 权限唯一名称
  title: string; // 权限的标题
};

export async function adminPermissionAdd(params: RequestAdminPermissionAddParamsType) {
  return request<ResponseBodyType>(APIAdminPermissions.add.url, {
    method: APIAdminPermissions.add.method,
    data: params,
  });
}

/************************************************************/
/**
 * 给菜单创建权限
 */
export type RequestAdminPermissionAddForMenuParamsType = {
  menuId: number;
  permission: ResponseAdminMenuPermissionsItemType[];
};

export async function addMenuPermission(params: RequestAdminPermissionAddForMenuParamsType) {
  return request<ResponseBodyType>(APIAdminPermissions.menu.url, {
    method: APIAdminPermissions.menu.method,
    data: params,
  });
}
