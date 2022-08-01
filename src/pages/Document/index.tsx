import { Col, Divider, Layout, Menu, Row } from 'antd';
import React, { useState } from 'react';
import * as IconMap from '@ant-design/icons';
import { DocMenus } from './menu';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import 'github-markdown-css';
import './index.less';

const { Header, Content, Sider } = Layout;

const Document: React.FC = () => {
  const [mdContent, setMdContent] = useState<string>('');
  async function parseMdFileContent(url: string) {
    const res = await fetch(url);
    const content = await res.text();
    setMdContent(content);
  }

  function openMd(path?: string) {
    path && parseMdFileContent(path);
  }
  return (
    <Layout className="layout">
      <Header className="header">
        <Row className="row">
          <Col span={6}>
            <h1>
              <img className="logo" src="/favicon.ico" />
              WEI
            </h1>
          </Col>
          <Col span={14}>
            <Menu mode="horizontal">
              <Menu.Item key="mail">更多</Menu.Item>
            </Menu>
          </Col>
          <Col span={4}></Col>
        </Row>
      </Header>
      <Layout className="layout-content">
        <Sider
          width={310}
          className="slider-left"
          theme="light"
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <Menu className="menu-item" theme="light" mode="inline" defaultSelectedKeys={['0']}>
            {DocMenus.map((item, index) => {
              return (
                <>
                  {item.path ? (
                    <Menu.Item key={index} onClick={() => openMd(item?.uri)}>
                      {item.icon && React.createElement(IconMap[item.icon])}
                      {item.name}
                    </Menu.Item>
                  ) : (
                    <Menu.Item
                      key={index}
                      disabled
                      style={{ backgroundColor: '#fff', cursor: 'pointer' }}
                    >
                      {item.name}
                    </Menu.Item>
                  )}
                  {item.line ? (
                    <Divider
                      key={index + 1000}
                      style={{ marginLeft: '2.6rem', marginTop: '2px', marginBottom: '2px' }}
                    />
                  ) : (
                    ''
                  )}
                </>
              );
            })}
          </Menu>
        </Sider>
        <Content className="content">
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            <ReactMarkdown
              className="markdown-body"
              remarkPlugins={[remarkGfm]}
              children={mdContent}
            />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Document;
