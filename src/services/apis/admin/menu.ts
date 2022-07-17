// adminMenus 菜单管理接口
import { request } from 'umi';
import { APIAdminMenus } from './api';
import type { ResponseBodyType } from '../types';

/************************************************************/
/**
 * 树形菜单列表全
 */
export type RequestAdminMenuTreeParamsType = {
  menuId?: number;
  name?: string;
};

export async function adminMenuTree(params?: RequestAdminMenuTreeParamsType) {
  return request<ResponseBodyType>(APIAdminMenus.tree.url, {
    method: APIAdminMenus.tree.method,
    data: params,
  });
}

/************************************************************/
/**
 * 列表
 */

export type RequestAdminMenuListParamsType = {
  name?: string; // 菜单名称
  enabled?: boolean; // 菜单状态，true：启用，false：禁用
  pageNo?: number;
  pageSize?: number;
  sortField?: string;
  sortType?: string;
};

export type ResponseAdminMenuListItemType = {
  menuId: number; // 菜单ID，唯一键
  parentId: number; // 父菜单ID
  name: string; // 菜单名称，唯一键
  path: string; // 菜单路由
  redirect: string; // 重定向路由
  hideInMenu: boolean; // 是否在菜单中隐藏
  hideChildrenInMenu: boolean;
  enabled: boolean; // 菜单状态, true：启用，false：禁用，
  enabledText: string; //
  createTime: string; // 创建时间 "2021-12-01 12:23:21"
  modifyTime: string; // 最后更新时间
  describe?: string; // 描述
  authority?: string; // 数据库中不设置
  children?: ResponseAdminMenuListItemType[];
  icon?: string;
  locale?: string;
  [key: string]: any;
};

export async function adminMenuList(params?: RequestAdminMenuListParamsType) {
  return request<ResponseBodyType>(APIAdminMenus.list.url, {
    method: APIAdminMenus.list.method,
    data: params,
  });
}

/************************************************************/
/**
 * 新增
 */
export type RequestAdminMenuAddParamsType = {
  parentId: number; // 父菜单ID
  name: string; // 菜单名称，唯一键
  path: string; // 菜单路由
  redirect: string; // 重定向路由
  hideInMenu: boolean; // 是否在菜单中隐藏
  authority: string; // 数据库中不设置
  hideChildrenInMenu?: boolean;
  icon?: string;
  locale?: string;
  enabled: boolean; // 菜单状态, true：启用，false：禁用，
  enabledText: string; //
  [key: string]: any;
};

export async function adminMenuAdd(params: RequestAdminMenuAddParamsType) {
  return request<ResponseBodyType>(APIAdminMenus.add.url, {
    method: APIAdminMenus.add.method,
    data: params,
  });
}

/************************************************************/
/**
 * 详情
 */

export type RequestAdminMenuDetailParamsType = {
  menuId: number;
};

export type ResponseAdminMenuDetailType = {
  id: number; // 菜单ID，唯一键
  pid: number; // 父菜单ID
  name: string; // 菜单名称，唯一键
  path: string; // 菜单路由
  redirect: string; // 重定向路由
  authority: string; // 数据库中不设置
  hideInMenu: boolean; // 是否在菜单中隐藏
  hideChildrenInMenu?: boolean;
  enabled: boolean; // 菜单状态, true：启用，false：禁用，
  enabledText: string; //
  create_time: string; // 创建时间 "2021-12-01 12:23:21"
  modify_time: string; // 最后更新时间
  icon?: string;
  locale?: string;
  [key: string]: any;
};

export async function adminMenuDetail(params: RequestAdminMenuDetailParamsType) {
  return request<ResponseBodyType>(APIAdminMenus.detail.url, {
    method: APIAdminMenus.detail.method,
    data: params,
  });
}
/************************************************************/
/**
 * 编辑
 */
export type RequestAdminMenuEditParamsType = {
  menuId: number;
  parentId: number; // 父菜单ID
  name: string; // 菜单名称，唯一键
  path: string; // 菜单路由
  redirect: string; // 重定向路由
  hideInMenu: boolean; // 是否在菜单中隐藏
  authority: string; // 数据库中不设置
  hideChildrenInMenu?: boolean;
  icon?: string;
  locale?: string;
  enabled: boolean;
  [key: string]: any;
};

export async function adminMenuEdit(params: RequestAdminMenuEditParamsType) {
  return request<ResponseBodyType>(APIAdminMenus.edit.url, {
    method: APIAdminMenus.edit.method,
    data: params,
  });
}

/************************************************************/
/**
 * 删除
 */
export type RequestAdminMenuDeleteParamsType = {
  menuId: number;
  enabled: boolean;
};

export async function adminMenuDelete(params: RequestAdminMenuDeleteParamsType) {
  return request<ResponseBodyType>(APIAdminMenus.delete.url, {
    method: APIAdminMenus.delete.method,
    data: params,
  });
}

/************************************************************/
/**
 * 启用禁用
 */
export type RequestAdminMenuEnableParamsType = {
  menuId: number;
  enabled?: boolean;
  hideInMenu?: boolean;
  hideChildrenInMenu?: boolean;
};

export async function adminMenuEnable(params: RequestAdminMenuEnableParamsType) {
  return request<ResponseBodyType>(APIAdminMenus.enable.url, {
    method: APIAdminMenus.enable.method,
    data: params,
  });
}
