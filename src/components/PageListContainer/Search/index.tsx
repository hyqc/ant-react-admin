import React from 'react';
import { Card } from 'antd';

// 列表页容器
const Search: React.FC = (props: any) => {
  return (
    <Card style={{ margin: '0 0 2rem', backgroundColor: '#FFF', ...props?.style }} bordered={false}>
      {props?.children}
    </Card>
  );
};

export default Search;
