import { request } from 'umi';
import { APIAdmin } from './api';
import type { ResponseType } from './types';

export type ResponseAdminUserListItemRolesItemType = {
  id: number;
  name: string;
  canEdit: boolean;
};

export type ResponseAdminUserListItemType = {
  id: number; // 管理员ID，唯一键
  name: string; // 管理员名称，唯一键
  nick_name: string; // 管理员昵称
  email: string; // 邮箱地址唯一键
  avatar: string; // 管理员头像
  roles: ResponseAdminUserListItemRolesItemType[]; // 管理员角色ID集合"1,2,3"
  status: number; // 正常，管理员状态, 1正常，2禁用，
  status_text: string; //
  last_ip: string; // 最后一次登录的IP地址
  total_login: number; // 登录总次数
  create_time: string; // 创建时间 "2021-12-01 12:23:21"
  modify_time: string; // 最后更新时间
};

export type RequestAdminUserListSearchParamsType = {
  name?: string; // 管理员名称
  nick_name?: string; // 管理员昵称
  status?: number; // 管理员状态，0全部，1正常，2禁用
  role_name?: string; // 角色名称
  email?: string; // 邮箱
  startDateTime?: string; // 2021-12-01 00:00:00 创建时间搜索
  endDateTime?: string;
  pageNo?: number;
  pageSize?: number;
};

export type ResponseAdminUserInfoType = {
  id: number; // 管理员ID，唯一键
  name: string; // 管理员名称，唯一键
  nick_name: string; // 管理员昵称
  email: string; // 邮箱地址唯一键
  avatar: string; // 管理员头像
  roles: ResponseAdminUserListItemRolesItemType[]; // 管理员角色ID集合"1,2,3"
  status: number; // 正常，管理员状态, 1正常，2禁用，
  status_text: string; //
  last_ip: string; // 最后一次登录的IP地址
  total_login: number; // 登录总次数
  create_time: string; // 创建时间 "2021-12-01 12:23:21"
  modify_time: string; // 最后更新时间
};

export type RequestAdminUserAddParamsType = {
  name: string; // 管理员名称（账号）
  nick_name?: string; // 管理员昵称
  avatar?: string;
  email?: string;
  status: boolean;
};

export type RequestAdminUserEditParamsType = {
  id: number;
  name?: string; // 管理员名称（账号）
  nick_name?: string; // 管理员昵称
  role_ids?: string; // 角色ID，示例："1,2,3"
  avatar?: string;
  email?: string;
  status?: number;
};

export type RequestAdminUserDeleteParamsType = {
  id: number;
};

export type RequestAdminUserInfoParamsType = {
  id: number;
};

export type RequestAdminUserUpdatePasswordParamsType = {
  id: number;
  new_password: string;
  confirm_password: string;
};

export async function adminUserList(params?: RequestAdminUserListSearchParamsType) {
  return request<ResponseType>(APIAdmin.list.url, {
    method: APIAdmin.list.method,
    data: params,
  });
}

export async function adminUserAdd(params: RequestAdminUserAddParamsType) {
  return request<ResponseType>(APIAdmin.add.url, {
    method: APIAdmin.add.method,
    data: params,
  });
}

export async function adminUserEdit(params: RequestAdminUserEditParamsType) {
  return request<ResponseType>(APIAdmin.edit.url, {
    method: APIAdmin.edit.method,
    data: params,
  });
}

export async function adminUserGet(params: RequestAdminUserInfoParamsType) {
  return request<ResponseType>(APIAdmin.get.url, {
    method: APIAdmin.get.method,
    data: params,
  });
}
