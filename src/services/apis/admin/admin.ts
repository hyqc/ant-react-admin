// adminUsers 管理员管理接口
import { request } from 'umi';
import { APIAdminUsers } from '../api';
import type { ResponseType } from '../types';

/**
 * 管理员列表元素
 */
export type ResponseAdminUserListItemType = {
  adminId: number; // 管理员ID，唯一键
  username: string; // 管理员名称，唯一键
  nickname: string; // 管理员昵称
  email: string; // 邮箱地址唯一键
  avatar: string; // 管理员头像
  roles: ResponseAdminUserListItemRolesItemType[]; // 管理员有效角色信息列表
  enabled: boolean; // 正常，管理员状态, true启用，false禁用，
  enabledText: string; //
  createTime: string; // 创建时间 "2021-12-01 12:23:21"
  modifyTime: string; // 最后更新时间
  totalLogin: number; // 登录总次数
  lastLoginIp: string; // 最后一次登录的IP地址
  lastLoginTime: string; // 最后登录时间
};

/**
 * 管理员列表的角色列表元素
 */
export type ResponseAdminUserListItemRolesItemType = {
  roleId: number; // 角色ID
  roleName: string; // 角色名称
};

/**
 * 管理员详情
 */
export type ResponseAdminUserDetailType = {
  adminId: number; // 管理员ID，唯一键
  username: string; // 管理员名称，唯一键
  nickname: string; // 管理员昵称
  email: string; // 邮箱地址唯一键
  avatar: string; // 管理员头像
  roles: ResponseAdminUserListItemRolesItemType[]; // 管理员有效角色信息列表
  enabled: boolean; // 正常，管理员状态, true启用，false禁用，
  enabledText: string; //
  createTime: string; // 创建时间 "2021-12-01 12:23:21"
  modifyTime: string; // 最后更新时间
  totalLogin: number; // 登录总次数
  lastLoginIp: string; // 最后一次登录的IP地址
  lastLoginTime: string; // 最后登录时间
};

export type RequestAdminUserUpdatePasswordParamsType = {
  id: number;
  new_password: string;
  confirm_password: string;
};

export type RequestAdminUserListParamsType = {
  name?: string; // 管理员名称
  nick_name?: string; // 管理员昵称
  status?: number; // 管理员状态，0全部，1正常，2禁用
  role_name?: string; // 角色名称
  email?: string; // 邮箱
  startDateTime?: string; // 2021-12-01 00:00:00 创建时间搜索
  endDateTime?: string;
  pageNo?: number;
  pageSize?: number;
  sortField?: string;
  sortType?: string;
};

export async function adminUserList(params?: RequestAdminUserListParamsType) {
  return request<ResponseType>(APIAdminUsers.list.url, {
    method: APIAdminUsers.list.method,
    data: params,
  });
}

export type RequestAdminUserAddParamsType = {
  name: string; // 管理员名称（账号）
  nick_name?: string; // 管理员昵称
  avatar?: string;
  email?: string;
  status: boolean;
};

export async function adminUserAdd(params: RequestAdminUserAddParamsType) {
  return request<ResponseType>(APIAdminUsers.add.url, {
    method: APIAdminUsers.add.method,
    data: params,
  });
}

export type RequestAdminUserEditParamsType = {
  adminId: number;
  username?: string; // 管理员名称（账号）
  nickname?: string; // 管理员昵称
  roleIds?: string; // 角色ID，示例："1,2,3"
  avatar?: string;
  email?: string;
  enabled?: boolean;
};

export async function adminUserEdit(params: RequestAdminUserEditParamsType) {
  return request<ResponseType>(APIAdminUsers.edit.url, {
    method: APIAdminUsers.edit.method,
    data: params,
  });
}

export type RequestAdminUserDetailParamsType = {
  id: number;
};

export async function getAdminUserDetail(params: RequestAdminUserDetailParamsType) {
  return request<ResponseType>(APIAdminUsers.detail.url, {
    method: APIAdminUsers.detail.method,
    data: params,
  });
}

export type RequestAdminUserDeleteParamsType = {
  adminId: number;
  enabled: boolean;
};

export async function adminUserDelete(params: RequestAdminUserDeleteParamsType) {
  return request<ResponseType>(APIAdminUsers.delete.url, {
    method: APIAdminUsers.delete.method,
    data: params,
  });
}

export type RequestAdminUserAssignRolesParamsType = {
  id: number;
  role_ids: string;
};

export async function adminUserAssignRoles(params: RequestAdminUserAssignRolesParamsType) {
  return request<ResponseType>(APIAdminUsers.assignRoles.url, {
    method: APIAdminUsers.assignRoles.method,
    data: params,
  });
}
