import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import { RunTimeLayoutConfig, RequestConfig, Link } from 'umi';
import { history } from 'umi';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import { currentAdminInfo } from './services/apis/account';
import type { ReponseCurrentAdminUserDetailType } from '@/services/apis/account';
import { message } from 'antd';
import type { ResponseType } from '@/services/apis/types';
import { SUCCESS } from './services/apis/code';

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
  fetchUserInfo?: () => Promise<ReponseCurrentAdminUserDetailType | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      const msg = await currentAdminInfo();
      return msg.data;
    } catch (error) {
      history.push(LoginPath);
    }
    return undefined;
  };
  // 如果是登录页面，不执行
  if (history.location.pathname !== LoginPath) {
    const currentUser: ReponseCurrentAdminUserDetailType = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: currentUser?.settings || {},
    };
  }
  return {
    fetchUserInfo,
    settings: {},
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    waterMarkProps: {
      // content: initialState?.currentUser?.name,
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
    // menu: {
    //   request: async (params, defaultMenuData) => {
    //     return initialState?.menuData || {};
    //   },
    // },
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
  const data: ResponseType = await response.clone().json();
  if (data.code !== SUCCESS) {
    message.destroy();
    message.error(data.message, MessageDuritain);
  }
  return response;
};

export const request: RequestConfig = {
  timeout: 6000,
  errorConfig: {
    adaptor: (resData) => {
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
