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
  const canAccessLocalMenu = menuMap[location.pathname]?.access === AccessAllow;

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

  return canAccessLocalMenu ? (
    <PageHeaderWrapper style={wrapperStyless}>{props?.children}</PageHeaderWrapper>
  ) : (
    <ForbiddenPage />
  );
};

export default Content;
