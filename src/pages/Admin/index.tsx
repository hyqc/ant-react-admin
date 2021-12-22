import React, { useState, useEffect } from 'react';
import { Content, Search, Container } from '@/components/PageListContainer';
import {
  Form,
  Input,
  Button,
  Select,
  Row,
  Col,
  Table,
  Avatar,
  Switch,
  message,
  Tag,
  Popconfirm,
  Pagination,
  Space,
} from 'antd';
import { SearchOutlined, ReloadOutlined, PlusOutlined } from '@ant-design/icons';
import type { Gutter } from 'antd/lib/grid/row';
import { ColumnsType } from 'antd/lib/table';
import {
  adminUserList,
  adminUserEdit,
  ResponseAdminUserListItemRolesItemType,
  adminUserGet,
} from '@/services/apis/admin';
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
import { DEFAULT_PAGE_NO, DEFAULT_PAGE_SIZE, STATUS_INVALID, STATUS_VALID } from './common';
import AdminAddModal, { NoticeModalPropsType } from './add';
import AdminEditModal from './edit';

const FormSearchRowGutter: [Gutter, Gutter] = [12, 0];
const FormSearchRowColSpan = 6;

const Admin: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const [pageInfo, setPageInfo] = useState<ResponsePageInfoDataType>();
  const [adminUserListData, setAdminUserDataList] = useState<ResponseAdminUserListItemType[]>([]);
  const [detailModalStatus, setDetailModalStatus] = useState<boolean>(false);
  const [editModalStatus, setEditModalStatus] = useState<boolean>(false);
  const [addModalStatus, setAddModalStatus] = useState<boolean>(false);
  const [adminUserInfoData, setAdminUserInfoData] = useState<any>();

  const columns: ColumnsType<any> = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: '4rem',
      align: 'center',
      sorter: true,
    },
    {
      title: '名称',
      align: 'center',
      dataIndex: 'name',
      width: '8rem',
    },
    {
      title: '头像',
      align: 'center',
      dataIndex: 'avatar',
      width: '3rem',
      render: (avatar, record) => {
        return <Avatar src={avatar} />;
      },
    },
    {
      title: '邮箱',
      align: 'center',
      width: '14rem',
      dataIndex: 'email',
    },
    {
      title: '角色',
      width: '10rem',
      dataIndex: 'roles',
      render: (roles, record: ResponseAdminUserListItemType) => {
        return roles?.map((item: ResponseAdminUserListItemRolesItemType) => {
          return (
            <Tag color="geekblue" style={{ cursor: 'default' }} key={item.id}>
              {item.name}
            </Tag>
          );
        });
      },
    },
    {
      title: '登录次数',
      align: 'center',
      width: '6rem',
      dataIndex: 'total_login',
      sorter: true,
    },
    {
      title: '创建时间',
      align: 'center',
      width: '12rem',
      dataIndex: 'create_time',
      sorter: true,
    },
    {
      title: '更新时间',
      align: 'center',
      width: '12rem',
      dataIndex: 'modify_time',
      sorter: true,
    },
    {
      title: '状态',
      width: '4rem',
      align: 'center',
      dataIndex: 'status',
      render(status: number, record: ResponseAdminUserListItemType) {
        return (
          <Popconfirm
            title={`确实要${record.status_text}该管理员吗？`}
            okText="确定"
            cancelText="取消"
            onConfirm={() => clickStatusBtn(record)}
          >
            <Switch
              checkedChildren={'启用'}
              unCheckedChildren={'禁用'}
              checked={status === STATUS_VALID}
            />
          </Popconfirm>
        );
      },
    },
    {
      title: '操作',
      align: 'left',
      width: '16rem',
      render(text, record) {
        return (
          <>
            <Button
              type="primary"
              style={{ marginRight: 4 }}
              onClick={() => openDetailModal(record)}
            >
              详情
            </Button>
            <Button type="primary" style={{ marginRight: 4 }} onClick={() => openEditModal(record)}>
              编辑
            </Button>
            <Popconfirm
              title="确实要删除该管理员吗？"
              okText="确定"
              cancelText="取消"
              onConfirm={() => onDeleteAdminUser(record)}
            >
              <Button type="primary" danger style={{ marginRight: 4 }}>
                删除
              </Button>
            </Popconfirm>
          </>
        );
      },
    },
  ];

  // 获取管理员列表
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

  // 管理员状态更新
  function clickStatusBtn(record: ResponseAdminUserListItemType) {
    const updateData: RequestAdminUserEditParamsType = {
      id: record.id,
      status: record.status === STATUS_VALID ? STATUS_INVALID : STATUS_VALID,
    };
    adminUserEdit(updateData).then((res) => {
      if (res.code === SUCCESS) {
        message.success(res.message, MessageDuritain, () => {
          getAdminUserList({ ...pageInfo, ...form.getFieldsValue() });
        });
      }
    });
  }

  // 管理员列表搜索
  function onSearchFinish(values: RequestAdminUserListSearchParamsType) {
    getAdminUserList({ ...values, ...pageInfo, pageNo: 1 });
  }

  // 管理员搜索重置
  function onSearchReset() {
    form.resetFields();
    getAdminUserList();
  }

  // 管理员详情
  function openDetailModal(record: ResponseAdminUserListItemType) {
    setDetailModalStatus(true);
  }

  // 管理员编辑
  function openEditModal(record: ResponseAdminUserListItemType) {
    adminUserGet({ id: record.id }).then((res) => {
      if (res.code === SUCCESS) {
        setAdminUserInfoData(res.data);
        setEditModalStatus(true);
      }
    });
  }

  // 管理员添加
  function openAddModal() {
    setAddModalStatus(true);
  }

  function noticeAddModal(data: NoticeModalPropsType) {
    setAddModalStatus(false);
    if (data.reload) {
      getAdminUserList({ ...pageInfo, ...form.getFieldsValue() });
    }
  }

  function noticeEditModal(data: NoticeModalPropsType) {
    setAdminUserInfoData(undefined);
    setEditModalStatus(false);
    if (data.reload) {
      getAdminUserList({ ...pageInfo, ...form.getFieldsValue() });
    }
  }

  // 删除管理员
  function onDeleteAdminUser(record: ResponseAdminUserListItemType) {
    console.log(record);
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
        {/* button */}
        <Space style={{ marginBottom: '1rem' }}>
          <Button type="primary" onClick={openAddModal}>
            <PlusOutlined />
            新建管理员
          </Button>
        </Space>

        {/* table */}
        <Table
          rowKey="id"
          scroll={{ x: 1500 }}
          loading={loading}
          columns={columns}
          pagination={false}
          dataSource={adminUserListData}
        ></Table>
        <Pagination
          showQuickJumper
          defaultCurrent={DEFAULT_PAGE_NO}
          style={{ marginTop: '1rem', textAlign: 'right' }}
          total={pageInfo?.total}
          current={pageInfo?.pageNo || DEFAULT_PAGE_NO}
          pageSize={pageInfo?.pageSize || DEFAULT_PAGE_SIZE}
          showTotal={(total) => `共 ${total} 条数据`}
          onChange={(pageNo) => getAdminUserList({ pageNo, ...form.getFieldsValue() })}
          onShowSizeChange={(pageSize) => getAdminUserList({ pageSize, ...form.getFieldsValue() })}
        />
      </Content>

      {/* modal */}
      <AdminAddModal modalStatus={addModalStatus} noticeModal={noticeAddModal} />

      <AdminEditModal
        modalStatus={editModalStatus}
        detailData={adminUserInfoData}
        noticeModal={noticeEditModal}
      />
    </Container>
  );
};

export default Admin;
