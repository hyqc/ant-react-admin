import { SettingDrawer, Settings as LayoutSettings } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import { RunTimeLayoutConfig, RequestConfig, Link } from 'umi';
import { history } from 'umi';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import { currentAdminInfo, MenusRemoteItem } from './services/apis/admin/account';
import type { ReponseCurrentAdminUserDetailType } from '@/services/apis/admin/account';
import { message } from 'antd';
import type { ResponseBodyType } from '@/services/apis/types';
import { SUCCESS } from './services/apis/code';
import defaultSettings from '../config/defaultSettings';
import { MenuDataItem } from '@umijs/route-utils';
import routersConfig from '../config/routes';
import React from 'react';
import * as IconMap from '@ant-design/icons';

const isDev = process.env.NODE_ENV === 'development';

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: ReponseCurrentAdminUserDetailType;
  menuData?: MenuDataItem[];
  fetchUserInfo?: () => Promise<ReponseCurrentAdminUserDetailType | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      const res = await currentAdminInfo();
      return res.data;
    } catch (error) {
      history.push(LoginPath);
    }
    return undefined;
  };
  // 如果不是登录页面，执行
  if (history.location.pathname !== LoginPath) {
    const currentUser: ReponseCurrentAdminUserDetailType = await fetchUserInfo();
    const menuData = handleRemoteMenuIntoLocal(routersConfig, currentUser.menus);
    return {
      fetchUserInfo,
      currentUser,
      menuData,
      settings: { ...defaultSettings, ...currentUser?.settings },
    };
  }
  return {
    fetchUserInfo,
    settings: defaultSettings,
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    waterMarkProps: {
      content: '',
    },
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location.pathname !== LoginPath) {
        history.push(LoginPath);
      }
    },
    links: [],
    menuItemRender: (menuItemProps, defaultDom) => {
      if (menuItemProps.isUrl || !menuItemProps.path) {
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
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    // childrenRender: (children) => {
    //   if (initialState.loading) return <PageLoading />;
    //   return children;
    // },
    menu: {
      request: (params, defaultMenuData) => {
        return initialState?.menuData;
      },
    },
    childrenRender: (children, props) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}
          {!props.location?.pathname?.includes('/login') && (
            <SettingDrawer
              disableUrlParams
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
  isDev && console.log('请求拦截器：', BaseAPI, url, options, `${BaseAPI}${url}`);
  return {
    url: `${BaseAPI}${url}`,
    options: { ...options, interceptors: true },
  };
};

// 响应拦截器：
const interceptorsResponse = async (response: any, options: any) => {
  isDev && console.log('响应拦截器：', response, options);
  const data: ResponseBodyType = await response.clone().json();
  if (data.code !== SUCCESS) {
    message.destroy();
  }
  return response;
};

export const request: RequestConfig = {
  timeout: 6000,
  errorConfig: {
    adaptor: (resData: { code: number; message: any; type: any }) => {
      return {
        ...resData,
        success: resData.code === SUCCESS,
        errorMessage: resData.message,
        showType: resData.type,
      };
    },
  },
  middlewares: [],
  requestInterceptors: [interceptorsRequest],
  responseInterceptors: [interceptorsResponse],
};

function handleRemoteMenuIntoLocal(defaultMenuData: MenuDataItem[], remoteMenus: MenusRemoteItem) {
  defaultMenuData.forEach((item) => {
    if (item.key && remoteMenus[item.key] && remoteMenus[item.key].hideInMenu === false) {
      item.hideInMenu = false;
    }
    if (item.icon !== undefined && item.icon.length > 0 && IconMap[item.icon]) {
      item.icon = React.createElement(IconMap[item.icon]);
    }
    if (item.routes !== undefined && item.routes.length > 0) {
      handleRemoteMenuIntoLocal(item.routes, remoteMenus);
    }
  });
  return defaultMenuData;
}
