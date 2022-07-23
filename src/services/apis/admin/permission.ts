// adminPermissions 管理员管理接口
import { request } from 'umi';
import { APIAdminPermissions } from './api';
import type { ResponseBodyType, ResponseListType } from '../types';

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
  key?: string;
  menuId?: number;
  enabled?: boolean;
  type?: string;
  pageSize?: number;
  pageNum?: number;
};

export type ResponseAdminMenuPermissionsItemType = {
  menuId: number;
  id?: number;
  key: string;
  type: string;
  typeText: string;
  name: string;
  enabled: boolean;
  describe?: string;
};

export type ResponseAdminPermissionListItemType = {
  menuId: number;
  menuName?: string;
  menuPath?: string;
  id: number;
  key: string;
  name: string;
  type: string;
  typeText: string;
  describe?: string;
  enabled: boolean;
  enabledText?: string;
  createTime: string;
  modifyTime: string;
};

export async function adminPermissionList(params?: RequestAdminPermissionListParamsType) {
  return request<ResponseListType>(APIAdminPermissions.list.url, {
    method: APIAdminPermissions.list.method,
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

export async function adminAddMenuPermission(params: RequestAdminPermissionAddForMenuParamsType) {
  return request<ResponseBodyType>(APIAdminPermissions.menu.url, {
    method: APIAdminPermissions.menu.method,
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
 * 详情
 */
export type RequestAdminPermissionDetailParamsType = {
  permissionId: number;
};

export type ResponseAdminPermissionDetailType = {
  menuId: number;
  menuName?: string;
  menuPath: string;
  id: number;
  key: string;
  name: string;
  type: string;
  typeText: string;
  describe?: string;
  enabled: boolean;
  enabledText?: string;
  createTime: string;
  modifyTime: string;
};
export async function adminPermissionDetail(params: RequestAdminPermissionDetailParamsType) {
  return request<ResponseBodyType>(APIAdminPermissions.detail.url, {
    method: APIAdminPermissions.detail.method,
    data: params,
  });
}

/************************************************************/
/**
 * 编辑
 */
export type RequestAdminPermissionEditParamsType = {
  permissionId: number;
  name?: string;
  key?: string;
  describe?: string;
  enabled: boolean;
  type: string;
};

export async function adminPermissionEdit(params: RequestAdminPermissionEditParamsType) {
  return request<ResponseBodyType>(APIAdminPermissions.edit.url, {
    method: APIAdminPermissions.edit.method,
    data: params,
  });
}

/************************************************************/
/**
 * 启用禁用
 */
export type RequestAdminPermissionEnableParamsType = {
  permissionId: number;
  enabled: boolean;
};

export async function adminPermissionEnable(params: RequestAdminPermissionEnableParamsType) {
  return request<ResponseBodyType>(APIAdminPermissions.enable.url, {
    method: APIAdminPermissions.enable.method,
    data: params,
  });
}

/************************************************************/
/**
 * 删除
 */
export type RequestAdminPermissionDeleteParamsType = {
  permissionId: number;
  enabled: boolean;
};

export async function adminPermissionDelete(params: RequestAdminPermissionDeleteParamsType) {
  return request<ResponseBodyType>(APIAdminPermissions.delete.url, {
    method: APIAdminPermissions.delete.method,
    data: params,
  });
}
