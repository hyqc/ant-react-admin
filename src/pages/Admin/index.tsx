import React, { useState } from 'react';
import { Content, Search, Container } from '@/components/PageListContainer';
import { Form, Input, Button, Select, Row, Col, Table } from 'antd';
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import type { Gutter } from 'antd/lib/grid/row';
import type { AdminUserListItemType } from './types';
import { ColumnsType } from 'antd/lib/table';

const FormSearchRowGutter: [Gutter, Gutter] = [12, 0];
const FormSearchRowColSpan = 6;

const Admin: React.FC = () => {
  const [form] = Form.useForm();

  const columns: ColumnsType = [
    {
      title: 'ID',
      dataIndex: 'id',
      sorter: true,
    },
    {
      title: '头像',
      dataIndex: 'avatar',
    },
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
    },
    {
      title: '角色',
      dataIndex: 'role_names',
    },
    {
      title: '登录次数',
      dataIndex: 'total_login',
      sorter: true,
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      sorter: true,
    },
    {
      title: '更新时间',
      dataIndex: 'modify_time',
      sorter: true,
    },
    {
      title: '状态',
      dataIndex: 'status_text',
    },
    {
      title: '操作',
      render() {
        return <Button>详情</Button>;
      },
    },
  ];

  return (
    <Container>
      <Search>
        <Form form={form}>
          <Row gutter={FormSearchRowGutter}>
            <Col span={FormSearchRowColSpan}>
              <Form.Item label="名称">
                <Input allowClear />
              </Form.Item>
            </Col>
            <Col span={FormSearchRowColSpan}>
              <Form.Item label="昵称">
                <Input allowClear />
              </Form.Item>
            </Col>
            <Col span={FormSearchRowColSpan}>
              <Form.Item label="角色名">
                <Input allowClear />
              </Form.Item>
            </Col>
            <Col span={FormSearchRowColSpan}>
              <Form.Item label="邮箱">
                <Input allowClear />
              </Form.Item>
            </Col>
            <Col span={FormSearchRowColSpan}>
              <Form.Item label="状态">
                <Select defaultValue={'0'} style={{ offset: 0, width: '120' }}>
                  <Select.Option value="0">全部</Select.Option>
                  <Select.Option value="1">启用</Select.Option>
                  <Select.Option value="2">禁用</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24} style={{ textAlign: 'right' }}>
              <Button type="primary" htmlType="submit" style={{ marginRight: '2rem' }}>
                <SearchOutlined />
                查询
              </Button>
              <Button type="primary" htmlType="submit">
                <ReloadOutlined />
                清除
              </Button>
            </Col>
          </Row>
        </Form>
      </Search>
      <Content>
        <Table columns={columns}></Table>
      </Content>
    </Container>
  );
};

export default Admin;
