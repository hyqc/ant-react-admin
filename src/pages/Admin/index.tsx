import React, { useState, useEffect } from 'react';
import { Content, Search, Container } from '@/components/PageListContainer';
import { Form, Input, Button, Select, Row, Col, Table, Avatar, Switch, message } from 'antd';
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import type { Gutter } from 'antd/lib/grid/row';
import { ColumnsType } from 'antd/lib/table';
import { adminUserList, adminUserEdit } from '@/services/apis/admin';
import type {
  ResponseAdminUserListItemType,
  RequestAdminUserListSearchParamsType,
  RequestAdminUserEditParamsType,
} from '@/services/apis/admin';
import type {
  ResponseListDataType,
  ResponseListType,
  ResponsePageInfoDataType,
} from '@/services/apis/types';
import { SUCCESS } from '@/services/apis/code';
import { DEFAULT_PAGE_INFO } from '@/services/apis/config';

const FormSearchRowGutter: [Gutter, Gutter] = [12, 0];
const FormSearchRowColSpan = 6;

const Admin: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const [pageInfo, setPageInfo] = useState<ResponsePageInfoDataType>();
  const [adminUserListData, setAdminUserDataList] = useState<ResponseAdminUserListItemType[]>([]);

  const columns: ColumnsType<any> = [
    {
      title: 'ID',
      dataIndex: 'id',
      sorter: true,
    },
    {
      title: '头像',
      dataIndex: 'avatar',
      render: (avatar, record) => {
        return <Avatar src={avatar} />;
      },
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
      dataIndex: 'status',
      render(status, record) {
        return (
          <Switch
            checkedChildren={'启用'}
            unCheckedChildren={'禁用'}
            checked={status === 1}
            onClick={(value: boolean) => clickStatusBtn(value, record)}
          />
        );
      },
    },
    {
      title: '操作',
      render() {
        return <Button>详情</Button>;
      },
    },
  ];

  function getAdminUserList(data?: RequestAdminUserListSearchParamsType) {
    setLoading(true);
    adminUserList(data)
      .then((res: ResponseListType) => {
        if (res.code === SUCCESS) {
          const data: ResponseListDataType = res.data || DEFAULT_PAGE_INFO;
          const rows = data?.rows || [];
          const pageInfo: ResponsePageInfoDataType = {
            total: data.total,
            pageSize: data.pageSize,
            pageNo: data.pageNo,
          };
          setAdminUserDataList(rows);
          setPageInfo(pageInfo);
        }
        console.log('result', res);
      })
      .catch((err) => {
        console.log('error', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function clickStatusBtn(value: any, record: ResponseAdminUserListItemType) {
    const updateData: RequestAdminUserEditParamsType = {
      id: record.id,
      status: value,
    };
    adminUserEdit(updateData).then((res) => {
      if (res.code === SUCCESS) {
        message.success(res.message, MessageDuritain, () => {
          getAdminUserList();
        });
      }
    });
  }

  function onSearchFinish(values: RequestAdminUserListSearchParamsType) {
    getAdminUserList(values);
  }

  function onSearchReset() {
    form.resetFields();
    getAdminUserList();
  }

  useEffect(() => {
    getAdminUserList();
  }, []);

  return (
    <Container>
      <Search>
        <Form form={form} onFinish={onSearchFinish}>
          <Row gutter={FormSearchRowGutter}>
            <Col span={FormSearchRowColSpan}>
              <Form.Item label="名称" name="name" initialValue={''}>
                <Input allowClear />
              </Form.Item>
            </Col>
            <Col span={FormSearchRowColSpan}>
              <Form.Item label="昵称" name="nick_name" initialValue={''}>
                <Input allowClear />
              </Form.Item>
            </Col>
            <Col span={FormSearchRowColSpan}>
              <Form.Item label="角色名" name="role_name" initialValue={''}>
                <Input allowClear />
              </Form.Item>
            </Col>
            <Col span={FormSearchRowColSpan}>
              <Form.Item label="邮箱" name="email" initialValue={''}>
                <Input allowClear />
              </Form.Item>
            </Col>
            <Col span={FormSearchRowColSpan}>
              <Form.Item label="状态" name="status" initialValue={'0'}>
                <Select style={{ offset: 0, width: '120' }}>
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
              <Button type="primary" htmlType="button" onClick={onSearchReset}>
                <ReloadOutlined />
                清除
              </Button>
            </Col>
          </Row>
        </Form>
      </Search>
      <Content>
        <Table
          rowKey="id"
          loading={loading}
          columns={columns}
          dataSource={adminUserListData}
        ></Table>
      </Content>
    </Container>
  );
};

export default Admin;
