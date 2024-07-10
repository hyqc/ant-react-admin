import Footer from '@/components/Footer';
import RightContent from '@/components/RightContent';
import type { ReponseCurrentAdminUserDetailType } from '@/services/apis/admin/account';
import {
  GetLoginToken,
  HandleMenusToMap,
  HandleRemoteMenuIntoLocal,
  IsLogin,
  IsLongPage,
  Logout,
  MenusMapType,
} from '@/utils/common';
import { SettingDrawer, Settings as LayoutSettings } from '@ant-design/pro-components';
import { history, Link, RequestConfig, RunTimeLayoutConfig } from '@umijs/max';
import { MenuDataItem } from '@umijs/route-utils';
import { message } from 'antd';
import defaultSettings from '../config/defaultSettings';
import { currentAdminInfo, CurrentUserPermissionsType } from './services/apis/admin/account';
import { SUCCESS } from './services/apis/code';

const isDev = process.env.NODE_ENV === 'development';

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
      content: initialState?.currentUser?.username,
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
      // if (menuItemProps.isUrl) {
      //   return defaultDom;
      // }
      // 支持二级菜单显示icon
      const styleSpan = { display: 'inline-block', marginRight: '2px' };
      return (
        <Link to={menuItemProps.path}>
          <span style={styleSpan}>
            {menuItemProps.pro_layout_parentKeys &&
              menuItemProps.pro_layout_parentKeys.length > 0 &&
              menuItemProps.icon}
          </span>
          <span style={styleSpan}> {defaultDom}</span>
        </Link>
      );
    },
    //menuHeaderRender: undefined,
    menu: {
      locale: true,
      defaultOpenAll: true,
      request: (_params: any, defaultMenuData: MenuDataItem[]) => {
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
  console.log('返回数据：', response.data);
  const data: any = response.data;
  return new Promise(async (resolve, reject) => {
    if (response.status !== 200) {
      const msg: string = data.message;

      message.error(msg, MessageDuritain);
      return reject(msg);
    }
    if (data.code !== SUCCESS) {
      message.destroy();
      message.error(data.message, MessageDuritain);
      return reject(data.message);
    }
    return resolve(response);
  });
};

export const request: RequestConfig = {
  timeout: 6000,
  errorConfig: {
    // adaptor,
  },
  requestInterceptors: [interceptorsRequest],
  responseInterceptors: [interceptorsResponse],
  //...errorConfig,
};
