import { SettingDrawer, Settings as LayoutSettings } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import { RunTimeLayoutConfig, RequestConfig, Link } from 'umi';
import { history } from 'umi';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import { currentAdminInfo, CurrentUserPermissionsType } from './services/apis/admin/account';
import type { ReponseCurrentAdminUserDetailType } from '@/services/apis/admin/account';
import { SUCCESS } from './services/apis/code';
import defaultSettings from '../config/defaultSettings';
import { MenuDataItem } from '@umijs/route-utils';
import {
  GetLoginToken,
  HandleMenusToMap,
  HandleRemoteMenuIntoLocal,
  IsLogin,
  IsLongPage,
  Logout,
  MenusMapType,
} from '@/utils/common';
import { message } from 'antd';

const isDev = process.env.NODE_ENV === 'development';

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: ReponseCurrentAdminUserDetailType;
  permissions?: CurrentUserPermissionsType;
  menuData?: MenusMapType;
  fetchUserInfo?: () => Promise<ReponseCurrentAdminUserDetailType | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      const tokenInfo = GetLoginToken();
      if (tokenInfo?.token) {
        const res = await currentAdminInfo(tokenInfo?.remember);
        return res.data;
      }
      return undefined;
    } catch (error) {
      history.push(LoginPath);
    }
    return undefined;
  };
  // 如果不是登录页面，执行
  if (!IsLongPage()) {
    const currentUser: ReponseCurrentAdminUserDetailType = await fetchUserInfo();
    const permissions = { ...currentUser.permissions };
    currentUser.permissions = null;
    return {
      fetchUserInfo,
      currentUser,
      permissions,
      settings: { ...defaultSettings },
    };
  }
  return {
    fetchUserInfo,
    settings: defaultSettings,
  };
}

export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  return {
    // collapsed: true,
    rightContentRender: () => <RightContent />,
    disableContentMargin: true,
    waterMarkProps: {
      content: '',
    },
    footerRender: () => <Footer />,
    onPageChange: () => {
      // 如果没有登录，重定向到 login
      if (location.pathname !== LoginPath && !IsLogin(initialState)) {
        return Logout();
      }
    },
    links: [],
    menuItemRender: (menuItemProps, defaultDom) => {
      if (menuItemProps.isUrl) {
        return defaultDom;
      }
      // 支持二级菜单显示icon
      return (
        <Link to={menuItemProps.path}>
          {menuItemProps.pro_layout_parentKeys &&
            menuItemProps.pro_layout_parentKeys.length > 0 &&
            menuItemProps.icon}
          {defaultDom}
        </Link>
      );
    },
    menuHeaderRender: undefined,
    menu: {
      locale: true,
      defaultOpenAll: true,
      request: (params, defaultMenuData) => {
        const menuData = initialState?.currentUser?.menus;
        const tmpMenuList: MenuDataItem[] = HandleRemoteMenuIntoLocal(
          [],
          defaultMenuData,
          menuData,
          'children',
        );
        const menuList: MenuDataItem[] = HandleRemoteMenuIntoLocal(
          [],
          tmpMenuList,
          menuData,
          'routes',
        );
        setInitialState({
          ...initialState,
          menuData: HandleMenusToMap({}, menuList, 'children'),
        });
        return new Promise((resolve, reject) => {
          resolve(menuList);
        });
      },
    },
    childrenRender: (children, props) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}
          {!props.location?.pathname?.includes('/login') && (
            <SettingDrawer
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState) => ({
                  ...preInitialState,
                  settings,
                }));
              }}
            />
          )}
        </>
      );
    },
    ...initialState?.settings,
  };
};

// 请求拦截器：
const interceptorsRequest = (url: string, options: any) => {
  message.destroy();
  const realyUrl = `${BaseAPI}${url}`;
  isDev && console.log('请求拦截器：', BaseAPI, url, options, realyUrl);
  if (!IsLongPage()) {
    const tokenInfo = GetLoginToken();
    const token = tokenInfo !== undefined ? tokenInfo.token : '';
    options.headers.Authorization = 'Bearer ' + token;
  }

  return {
    url: realyUrl,
    options: { ...options, interceptors: true, url: realyUrl },
  };
};

// 响应拦截器：
const interceptorsResponse: any = async (response: any, options: any) => {
  isDev && console.log('响应拦截器：', response, options);
  return new Promise(async (resolve, reject) => {
    const resData = await response.clone().json();
    if (response.status !== 200) {
      const msg: string =
        resData && resData.path && resData.error
          ? `${resData.status}：${resData.path} ${resData.error}`
          : '请求失败';
      message.error(msg, MessageDuritain);
      return reject(msg);
    }
    if (resData.code !== SUCCESS) {
      message.destroy();
      message.error(resData.message, MessageDuritain);
      return reject(resData.message);
    }
    return resolve(resData);
  });
};

const errorHandler = (err: any) => {
  const reg = /.*timeout.*/gi;
  if (reg.test(err)) {
    message.error('请求超时', MessageDuritain);
  }
  throw err;
};

export const request: RequestConfig = {
  timeout: 6000,
  errorConfig: {
    // adaptor,
  },
  middlewares: [],
  requestInterceptors: [interceptorsRequest],
  responseInterceptors: [interceptorsResponse],
  errorHandler,
};
