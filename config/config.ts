// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import routes from './routes';

export default defineConfig({
  model: {},
  antd: {},
  request: {},
  initialState: {},
  mock: {
    include: ['src/pages/**/_mock.ts'],
  },
  dva: {},
  layout: {
    locale: true,
    siderWidth: 208,
    ...defaultSettings,
  },
  // https://umijs.org/zh-CN/plugins/plugin-locale
  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  define: {
    LocalStorageTokenKey: 'token', // 记录token的键名
    LoginPath: '/login', // 登录页路径
    BaseAPI: '/api', // 请求接口的前缀
    MessageDuritain: 1.5, // message 等消息提示框关闭的默认时间秒
    UploadImageAccept: '.png, .jpg, .jpeg,.ico', // 上传图片允许的类型
    DefaultModalWidth: 600, // modal default width 800px
    DefaultDrawerWidth: 600, // drawer default width 600px
    AccessAllow: 'allow', // 403权限允许访问
    AccessForbidden: 'forbidden', // 403权限禁止访问
    AdminId: 1, // 超管ID
  },
  routes,
});
