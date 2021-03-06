import React from 'react';
import { Card } from 'antd';

// 列表页容器
const Content: React.FC = (props: any) => {
  return (
    <Card style={{ backgroundColor: '#FFF', ...props?.style, marginTop: '1rem' }} bordered={false}>
      {props?.children}
    </Card>
  );
};

export default Content;
