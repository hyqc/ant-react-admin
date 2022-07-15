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
  Space,
  Pagination,
} from 'antd';
import { SearchOutlined, ReloadOutlined, PlusOutlined } from '@ant-design/icons';
import type { Gutter } from 'antd/lib/grid/row';
import { ColumnsType } from 'antd/lib/table';
import {
  adminUserList,
  adminUserEdit,
  ResponseAdminUserListItemRolesItemType,
  getAdminUserDetail,
  adminUserDelete,
} from '@/services/apis/admin/admin';
import type {
  ResponseAdminUserListItemType,
  RequestAdminUserListParamsType,
  RequestAdminUserEditParamsType,
} from '@/services/apis/admin/admin';
import type {
  ResponseListDataType,
  ResponseListType,
  ResponsePageInfoDataType,
} from '@/services/apis/types';
import { DEFAULT_PAGE_INFO } from '@/services/apis/config';
import AdminUserAddModal, { NoticeModalPropsType } from './add';
import AdminUserEditModal from './edit';
import AdminUserDetailModal from './detail';
import AdminUserAssignRolesModal from './bind';
import { DEFAULT_PAGE_NO, DEFAULT_PAGE_SIZE } from './common';
import { adminRoleAll, ResponseAdminRoleAllItemType } from '@/services/apis/admin/role';
import AdminUserEditPasswordModal from './password';
import Authorization from '@/components/Autuorization';

const FormSearchRowGutter: [Gutter, Gutter] = [12, 0];
const FormSearchRowColSpan = 5.2;

const Admin: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const [pageInfo, setPageInfo] = useState<ResponsePageInfoDataType>();
  const [adminUserListData, setAdminUserDataList] = useState<ResponseAdminUserListItemType[]>([]);
  const [detailModalStatus, setDetailModalStatus] = useState<boolean>(false);
  const [editModalStatus, setEditModalStatus] = useState<boolean>(false);
  const [addModalStatus, setAddModalStatus] = useState<boolean>(false);
  const [bindModalStatus, setAssignRolesModalStatus] = useState<boolean>(false);
  const [editPasswordModalStatus, setEditPasswordModalStatus] = useState<boolean>(false);
  const [adminUserInfoData, setAdminUserInfoData] = useState<any>();
  const [roleOptions, setRoleOptions] = useState<ResponseAdminRoleAllItemType[]>([]);

  const columns: ColumnsType<any> = [
    {
      title: 'ID',
      dataIndex: 'adminId',
      width: '4rem',
      align: 'center',
      sorter: true,
    },
    {
      title: '名称',
      align: 'center',
      dataIndex: 'username',
      width: '8rem',
    },
    {
      title: '昵称',
      align: 'center',
      dataIndex: 'nickname',
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
      width: '8rem',
      dataIndex: 'roles',
      render: (roles, record: ResponseAdminUserListItemType) => {
        return roles?.map((item: ResponseAdminUserListItemRolesItemType) => {
          return (
            <Tag color="geekblue" style={{ cursor: 'default' }} key={item.roleId}>
              {item.roleName}
            </Tag>
          );
        });
      },
    },
    {
      title: '登录次数',
      align: 'center',
      width: '6rem',
      dataIndex: 'totalLogin',
      sorter: true,
    },
    {
      title: '创建时间',
      align: 'center',
      width: '12rem',
      dataIndex: 'createTime',
      sorter: true,
    },
    {
      title: '更新时间',
      align: 'center',
      width: '12rem',
      dataIndex: 'modifyTime',
      sorter: true,
    },
    {
      title: '最后登录IP',
      align: 'center',
      width: '12rem',
      dataIndex: 'lastLoginIp',
    },
    {
      title: '最后登录时间',
      align: 'center',
      width: '12rem',
      dataIndex: 'lastLoginTime',
    },
    {
      title: '状态',
      width: '4rem',
      align: 'center',
      dataIndex: 'enabled',
      render(enabled: boolean, record: ResponseAdminUserListItemType) {
        return (
          <Popconfirm
            title={`确实要${record.enabledText}该管理员吗？`}
            okText="确定"
            cancelText="取消"
            onConfirm={() => updateEnabled(record)}
          >
            <Switch checkedChildren={'启用'} unCheckedChildren={'禁用'} checked={enabled} />
          </Popconfirm>
        );
      },
    },
    {
      title: '操作',
      align: 'left',
      render(text, record: ResponseAdminUserListItemType) {
        return (
          <>
            <Space>
              <Authorization>
                <Button
                  type="primary"
                  style={{ marginRight: 4 }}
                  onClick={() => openDetailModal(record)}
                >
                  详情
                </Button>
              </Authorization>
              <Button
                type="primary"
                style={{ marginRight: 4 }}
                onClick={() => openAssignRolesModal(record)}
              >
                分配角色
              </Button>
              <Button
                type="primary"
                style={{ marginRight: 4 }}
                onClick={() => openEditModal(record)}
              >
                编辑
              </Button>
              {/* 非超管修改密码 */}
              <Button
                type="primary"
                style={{ marginRight: 4 }}
                onClick={() => openEditPasswordModal(record)}
              >
                修改密码
              </Button>
              {/* 禁用的才能删除 */}
              {!record.enabled ? (
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
              ) : (
                ''
              )}
            </Space>
          </>
        );
      },
    },
  ];

  // 获取管理员列表
  function getRows(data?: RequestAdminUserListParamsType) {
    setLoading(true);
    adminUserList(data)
      .then((res: ResponseListType) => {
        const data: ResponseListDataType = res.data || DEFAULT_PAGE_INFO;
        const rows = data?.rows || [];
        const pageInfo: ResponsePageInfoDataType = {
          total: data.total,
          pageSize: data.pageSize,
          pageNo: data.pageNo,
        };
        setAdminUserDataList(rows);
        setPageInfo(pageInfo);
      })
      .catch((err) => {
        console.log('error', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  // 管理员状态更新
  function updateEnabled(record: ResponseAdminUserListItemType) {
    const updateData: RequestAdminUserEditParamsType = {
      adminId: record.adminId,
      enabled: !record.enabled,
    };
    adminUserEdit(updateData).then((res) => {
      message.success(res.message, MessageDuritain, () => {
        getRows({ ...pageInfo, ...form.getFieldsValue() });
      });
    });
  }

  // 管理员列表搜索
  function onSearchFinish(values: RequestAdminUserListParamsType) {
    getRows({ ...values, ...pageInfo, pageNo: 1 });
  }

  // 管理员搜索重置
  function onSearchReset() {
    form.resetFields();
    getRows();
  }

  function fetchAdminRoles(name?: string) {
    adminRoleAll({ name }).then((res) => {
      res.data.unshift({ roleId: 0, roleName: '全部' });
      setRoleOptions(res.data || []);
    });
  }

  function tableChange(pagination: any, filters: any, sorter: any) {
    getRows({
      ...pageInfo,
      ...form.getFieldsValue(),
      sortField: sorter.field,
      sortType: sorter.order,
    });
  }

  // 管理员详情
  function openDetailModal(record: ResponseAdminUserListItemType) {
    getAdminUserDetail({ adminId: record.adminId }).then((res) => {
      setAdminUserInfoData(res.data);
      setDetailModalStatus(true);
    });
  }

  // 分配角色
  function openAssignRolesModal(record: ResponseAdminUserListItemType) {
    getAdminUserDetail({ adminId: record.adminId }).then((res) => {
      setAdminUserInfoData(res.data);
      setAssignRolesModalStatus(true);
    });
  }

  // 管理员编辑
  function openEditModal(record: ResponseAdminUserListItemType) {
    getAdminUserDetail({ adminId: record.adminId }).then((res) => {
      setAdminUserInfoData(res.data);
      setEditModalStatus(true);
    });
  }

  // 管理员添加
  function openAddModal() {
    setAddModalStatus(true);
  }

  function openEditPasswordModal(record: ResponseAdminUserListItemType) {
    getAdminUserDetail({ adminId: record.adminId }).then((res) => {
      setAdminUserInfoData(res.data);
      setEditPasswordModalStatus(true);
    });
  }

  function noticeAddModal(data: NoticeModalPropsType) {
    setAddModalStatus(false);
    if (data.reload) {
      getRows({ ...pageInfo, ...form.getFieldsValue() });
    }
  }

  function noticeEditModal(data: NoticeModalPropsType) {
    setAdminUserInfoData(undefined);
    setEditModalStatus(false);
    if (data.reload) {
      getRows({ ...pageInfo, ...form.getFieldsValue() });
    }
  }

  function noticeDetailModal(data: NoticeModalPropsType) {
    setAdminUserInfoData(undefined);
    setDetailModalStatus(false);
    if (data.reload) {
      getRows({ ...pageInfo, ...form.getFieldsValue() });
    }
  }

  function noticeAssignRolesModal(data: NoticeModalPropsType) {
    setAdminUserInfoData(undefined);
    setAssignRolesModalStatus(false);
    if (data.reload) {
      getRows({ ...pageInfo, ...form.getFieldsValue() });
    }
  }

  function noticeEditPasswordModal(data: NoticeModalPropsType) {
    setAdminUserInfoData(undefined);
    setEditPasswordModalStatus(false);
    if (data.reload) {
      getRows({ ...pageInfo, ...form.getFieldsValue() });
    }
  }

  // 删除管理员
  function onDeleteAdminUser(record: ResponseAdminUserListItemType) {
    adminUserDelete({ adminId: record.adminId, enabled: record.enabled }).then((res) => {
      message.success(res.message, MessageDuritain);
      getRows({ ...pageInfo, ...form.getFieldsValue() });
    });
  }

  useEffect(() => {
    fetchAdminRoles();
    getRows();
  }, []);

  return (
    <Container>
      <Search>
        <Form form={form} onFinish={onSearchFinish}>
          <Row gutter={FormSearchRowGutter}>
            <Col span={FormSearchRowColSpan}>
              <Form.Item label="名称" name="username" initialValue={''}>
                <Input allowClear />
              </Form.Item>
            </Col>
            <Col span={FormSearchRowColSpan}>
              <Form.Item label="昵称" name="nickname" initialValue={''}>
                <Input allowClear />
              </Form.Item>
            </Col>
            <Col span={FormSearchRowColSpan}>
              <Form.Item label="邮箱" name="email" initialValue={''}>
                <Input allowClear />
              </Form.Item>
            </Col>
            <Col span={FormSearchRowColSpan}>
              <Form.Item label="角色名" name="roleId" initialValue={0}>
                <Select
                  style={{ offset: 0, width: '120' }}
                  allowClear
                  showSearch
                  filterOption={(input, option) => {
                    return (option!.children as unknown as string)
                      .toLowerCase()
                      .includes(input.toLowerCase());
                  }}
                >
                  {roleOptions?.map((item) => {
                    return (
                      <Select.Option key={item.roleId} value={item.roleId}>
                        {item.roleName}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col span={FormSearchRowColSpan}>
              <Form.Item label="状态" name="enabled" initialValue={0}>
                <Select style={{ offset: 0, width: '120' }}>
                  <Select.Option value={0}>全部</Select.Option>
                  <Select.Option value={1}>启用</Select.Option>
                  <Select.Option value={2}>禁用</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24} style={{ textAlign: 'right' }}>
              <Space>
                <Button type="primary" htmlType="submit">
                  <SearchOutlined />
                  查询
                </Button>
                <Button type="primary" htmlType="button" onClick={onSearchReset}>
                  <ReloadOutlined />
                  清除
                </Button>
              </Space>
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
          rowKey="adminId"
          scroll={{ x: 'auto' }}
          loading={loading}
          columns={columns}
          pagination={false}
          dataSource={adminUserListData}
          onChange={tableChange}
        ></Table>
        <Pagination
          showQuickJumper
          defaultCurrent={DEFAULT_PAGE_NO}
          style={{ marginTop: '1rem', textAlign: 'right' }}
          total={pageInfo?.total}
          current={pageInfo?.pageNo || DEFAULT_PAGE_NO}
          pageSize={pageInfo?.pageSize || DEFAULT_PAGE_SIZE}
          showTotal={(total) => `共 ${total} 条数据`}
          onChange={(pageNo) => getRows({ pageNo, ...form.getFieldsValue() })}
          onShowSizeChange={(pageSize) => getRows({ pageSize, ...form.getFieldsValue() })}
        />
      </Content>

      {/* modal */}

      <AdminUserAddModal modalStatus={addModalStatus} noticeModal={noticeAddModal} />

      <AdminUserDetailModal
        modalStatus={detailModalStatus}
        detailData={adminUserInfoData}
        noticeModal={noticeDetailModal}
      />

      <AdminUserEditModal
        modalStatus={editModalStatus}
        detailData={adminUserInfoData}
        noticeModal={noticeEditModal}
      />

      <AdminUserAssignRolesModal
        modalStatus={bindModalStatus}
        detailData={adminUserInfoData}
        noticeModal={noticeAssignRolesModal}
      />

      <AdminUserEditPasswordModal
        modalStatus={editPasswordModalStatus}
        detailData={adminUserInfoData}
        noticeModal={noticeEditPasswordModal}
      />
    </Container>
  );
};

export default Admin;
