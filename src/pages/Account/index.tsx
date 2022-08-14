import React from 'react';
import { Container, Content } from '@/components/PageListContainer';
import { Tabs } from 'antd';

import CurrentAccountInfo from './components/CurrentAccount';
import CurrentAccountPassword from './components/CurrentPassword';

const CurrentAccount: React.FC = () => {
  return (
    <Container>
      <Content>
        <Tabs tabPosition="left">
          <Tabs.TabPane tab="个人信息" key="center" forceRender>
            <CurrentAccountInfo />
          </Tabs.TabPane>
          <Tabs.TabPane tab="修改密码" key="password" forceRender>
            <CurrentAccountPassword />
          </Tabs.TabPane>
        </Tabs>
      </Content>
    </Container>
  );
};

export default CurrentAccount;
