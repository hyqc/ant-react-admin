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
import { Context } from 'react';

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
      settings: { ...defaultSettings, ...currentUser?.settings },
    };
  }
  return {
    fetchUserInfo,
    settings: defaultSettings,
  };
}

export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  return {
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
    // unAccessible: (
    //   <Result
    //     status="403"
    //     title="403"
    //     subTitle="Sorry, you are not authorized to access this page."
    //     extra={<Button type="primary">sdfasdfsdf</Button>}
    //   />
    // ),
    // 增加一个 loading 的状态
    // childrenRender: (children) => {
    //   if (initialState.loading) return <PageLoading />;
    //   return children;
    // },
    menu: {
      locale: true,
      defaultOpenAll: true,
      //params: { time: new Date().getTime() },
      request: (params, defaultMenuData) => {
        const menuData = initialState?.currentUser?.menus;
        const menuList: MenuDataItem[] = HandleRemoteMenuIntoLocal(
          [],
          HandleRemoteMenuIntoLocal([], defaultMenuData, menuData, 'children'),
          menuData,
          'children',
        );
        setInitialState({ ...initialState, menuData: HandleMenusToMap({}, menuList, 'children') });
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
const interceptorsResponse = async (response: any, options: any) => {
  isDev && console.log('响应拦截器：', response, options);
  return response;
};

export const request: RequestConfig = {
  timeout: 6000,
  errorConfig: {
    adaptor: (resData: any, ctx) => {
      return {
        ...resData,
        success: resData.code === SUCCESS,
        errorMessage: resData.message || resData,
        showType: resData.type,
      };
    },
  },
  middlewares: [],
  requestInterceptors: [interceptorsRequest],
  responseInterceptors: [interceptorsResponse],
};
