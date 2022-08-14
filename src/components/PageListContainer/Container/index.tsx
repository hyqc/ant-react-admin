import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { useModel } from 'umi';
import ForbiddenPage from '@/pages/403';

export type ContentType = {
  wrapperStyle?: React.CSSProperties;
  cardStyle?: React.CSSProperties;
};

const Content: React.FC<ContentType> = (props: any) => {
  const { wrapperStyle } = props;
  const { initialState } = useModel('@@initialState');
  const menuMap = initialState?.menuData || {};
  const pathname = path(location.pathname);

  const canAccessLocalMenu = menuMap[pathname]?.access === AccessAllow;

  const initCardStyle: any = () => {
    let wrapperStyless = {
      padding: '0 0 1.4rem',
    };
    if (wrapperStyle && Object.keys(wrapperStyle).length) {
      wrapperStyless = { ...wrapperStyless, ...wrapperStyle };
    }
    return wrapperStyless;
  };

  const wrapperStyless = initCardStyle();

  function path(path: string) {
    return path.length > 1 && path.substring(path.length - 1) === '/'
      ? path.substring(0, path.length - 1)
      : path;
  }

  return canAccessLocalMenu ? (
    <PageHeaderWrapper style={wrapperStyless}>{props?.children}</PageHeaderWrapper>
  ) : (
    <ForbiddenPage />
  );
};

export default Content;
