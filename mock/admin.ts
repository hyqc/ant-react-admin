// import { Request, Response } from 'express';
import type { ResponseInfoType, ResponseListType } from '@/services/apis/types';
import type { ResponseAdminUserListItemType } from '@/services/apis/admin';
import { success } from './common';

const defaultAvatarURL =
  'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Ffile02.16sucai.com%2Fd%2Ffile%2F2014%2F0829%2F372edfeb74c3119b666237bd4af92be5.jpg&refer=http%3A%2F%2Ffile02.16sucai.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1642257738&t=d566e68c58bbcd05b4c89b647089a392';
const AdminUserList: ResponseAdminUserListItemType[] = [
  {
    id: 1,
    name: 'admin',
    nick_name: '超管',
    email: '123@qq.com',
    avatar: defaultAvatarURL,
    roles: [
      {
        id: 1,
        name: '超管',
        canEdit: false,
      },
      {
        id: 2,
        name: '运营',
        canEdit: true,
      },
      {
        id: 3,
        name: '测试',
        canEdit: true,
      },
    ],
    status: 1,
    status_text: '启用',
    last_ip: '127.0.0.1',
    create_time: '2021-12-16 22:22:33',
    modify_time: '2021-12-16 22:22:33',
    total_login: 10,
  },
  {
    id: 2,
    name: 'wei',
    nick_name: '管理员',
    email: '123456@qq.com',
    avatar: defaultAvatarURL,
    roles: [
      {
        id: 2,
        name: '运营',
        canEdit: true,
      },
      {
        id: 3,
        name: '测试',
        canEdit: true,
      },
    ],
    status: 2,
    status_text: '禁用',
    last_ip: '127.0.0.1',
    create_time: '2021-12-17 22:22:33',
    modify_time: '2021-12-17 22:22:33',
    total_login: 1,
  },
];

const adminUserList: ResponseListType = {
  code: 0,
  message: '登录成功',
  data: {
    total: 56,
    pageSize: 5,
    pageNo: 1,
    rows: AdminUserList,
  },
};

const adminUserGetData: ResponseInfoType = {
  code: 0,
  message: '更新成功',
  data: {
    id: 1,
    name: 'admin',
    nick_name: '超管',
    email: '123@qq.com',
    avatar: defaultAvatarURL,
    status: 1,
    status_text: '启用',
    last_ip: '127.0.0.1',
    create_time: '2021-12-16 22:22:33',
    modify_time: '2021-12-16 22:22:33',
    total_login: 10,
    roles: [
      {
        id: 1,
        name: '超管',
        canEdit: false,
      },
      {
        id: 2,
        name: '运营',
        canEdit: true,
      },
      {
        id: 3,
        name: '测试',
        canEdit: true,
      },
    ],
  },
};

// 代码中会兼容本地 service mock 以及部署站点的静态数据
export default {
  // 支持值为 Object 和 Array
  'POST /api/admin/user/list': adminUserList,
  'POST /api/admin/user/add': success,
  'POST /api/admin/user/edit': success,
  'POST /api/admin/user/get': adminUserGetData,
  'POST /api/admin/user/delete': success,
  'POST /api/admin/user/assignRoles': success,
};
