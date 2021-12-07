import React from 'react';
import { Card } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

export type ContentType = {
  wrapperStyle?: React.CSSProperties;
  cardStyle?: React.CSSProperties;
};

const Content: React.FC<ContentType> = (props: any) => {
  const { wrapperStyle, cardStyle } = props;

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

  return (
    <PageHeaderWrapper style={wrapperStyless}>
      <Card style={cardStyle}>{props?.children}</Card>
    </PageHeaderWrapper>
  );
};

export default Content;
