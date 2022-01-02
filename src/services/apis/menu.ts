// adminMenus 菜单管理接口
import { request } from 'umi';
import { APIAdminMenus } from './api';
import type { ResponseType } from './types';

export type ResponseAdminMenuListItemType = {
  id: number; // 菜单ID，唯一键
  pid: number; // 父菜单ID
  name: string; // 菜单名称，唯一键
  path: string; // 菜单路由
  redirect: string; // 重定向路由
  hideInMenu: boolean; // 是否在菜单中隐藏
  authority: string; // 数据库中不设置
  children?: ResponseAdminMenuListItemType[];
  hideChildrenInMenu?: boolean;
  icon?: string;
  locale?: string;
  status: number; // 正常，菜单状态, 1正常，2禁用，
  status_text: string; //
  create_time: string; // 创建时间 "2021-12-01 12:23:21"
  modify_time: string; // 最后更新时间
  [key: string]: any;
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
  status: number; // 正常，菜单状态, 1正常，2禁用，
  status_text: string; //
  create_time: string; // 创建时间 "2021-12-01 12:23:21"
  modify_time: string; // 最后更新时间
  icon?: string;
  locale?: string;
  [key: string]: any;
};

export type RequestAdminMenuListParamsType = {
  name?: string; // 菜单名称
  status?: number; // 菜单状态，0全部，1正常，2禁用
  pageNo?: number;
  pageSize?: number;
  sortField?: string;
  sortType?: string;
};

export async function adminMenuList(params?: RequestAdminMenuListParamsType) {
  return request<ResponseType>(APIAdminMenus.list.url, {
    method: APIAdminMenus.list.method,
    data: params,
  });
}

export type RequestAdminMenuAddParamsType = {
  pid: number; // 父菜单ID
  name: string; // 菜单名称，唯一键
  path: string; // 菜单路由
  redirect: string; // 重定向路由
  hideInMenu: boolean; // 是否在菜单中隐藏
  authority: string; // 数据库中不设置
  hideChildrenInMenu?: boolean;
  icon?: string;
  locale?: string;
  status: number; // 正常，菜单状态, 1正常，2禁用，
  [key: string]: any;
};

export async function adminMenuAdd(params: RequestAdminMenuAddParamsType) {
  return request<ResponseType>(APIAdminMenus.add.url, {
    method: APIAdminMenus.add.method,
    data: params,
  });
}

export type RequestAdminMenuEditParamsType = {
  id: number;
  pid: number; // 父菜单ID
  name: string; // 菜单名称，唯一键
  path: string; // 菜单路由
  redirect: string; // 重定向路由
  hideInMenu: boolean; // 是否在菜单中隐藏
  authority: string; // 数据库中不设置
  hideChildrenInMenu?: boolean;
  icon?: string;
  locale?: string;
  status: number; // 正常，菜单状态, 1正常，2禁用，
  [key: string]: any;
};

export async function adminMenuEdit(params: RequestAdminMenuEditParamsType) {
  return request<ResponseType>(APIAdminMenus.edit.url, {
    method: APIAdminMenus.edit.method,
    data: params,
  });
}

export type RequestAdminMenuDetailParamsType = {
  id: number;
};

export async function adminMenuGet(params: RequestAdminMenuDetailParamsType) {
  return request<ResponseType>(APIAdminMenus.get.url, {
    method: APIAdminMenus.get.method,
    data: params,
  });
}

export type RequestAdminMenuDeleteParamsType = {
  id: number;
};

export async function adminMenuDelete(params: RequestAdminMenuDeleteParamsType) {
  return request<ResponseType>(APIAdminMenus.delete.url, {
    method: APIAdminMenus.delete.method,
    data: params,
  });
}
