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
} from 'antd';
import { SearchOutlined, ReloadOutlined, PlusOutlined } from '@ant-design/icons';
import type { Gutter } from 'antd/lib/grid/row';
import { ColumnsType } from 'antd/lib/table';
import {
  adminUserList,
  ResponseAdminUserListItemRolesItemType,
  adminUserDetail,
  adminUserDelete,
  adminUserEnable,
  RequestAdminUserEnableParamsType,
} from '@/services/apis/admin/user';
import type {
  ResponseAdminUserListItemType,
  RequestAdminUserListParamsType,
} from '@/services/apis/admin/user';
import type {
  PageInfoType,
  ResponseBodyType,
  ResponseListDataType,
  ResponseListType,
} from '@/services/apis/types';
import { DEFAULT_PAGE_INFO } from '@/services/apis/config';
import AdminUserAddModal, { NoticeModalPropsType } from './add';
import AdminUserEditModal from './edit';
import AdminUserDetailModal from './detail';
import AdminUserBindRolesModal from './bind';
import AdminUserEditPasswordModal from './password';
import { adminRoleAll, ResponseAdminRoleAllItemType } from '@/services/apis/admin/role';
import Authorization from '@/components/Autuorization';

const FormSearchRowGutter: [Gutter, Gutter] = [12, 0];
const FormSearchRowColSpan = 5.2;

const Admin: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const [pageInfo, setPageInfo] = useState<PageInfoType>({ ...DEFAULT_PAGE_INFO });
  const [rowsData, setRowsData] = useState<ResponseAdminUserListItemType[]>([]);
  const [detailData, setDetailData] = useState<any>();
  const [detailModalStatus, setDetailModalStatus] = useState<boolean>(false);
  const [editModalStatus, setEditModalStatus] = useState<boolean>(false);
  const [addModalStatus, setAddModalStatus] = useState<boolean>(false);
  const [bindModalStatus, setBindRolesModalStatus] = useState<boolean>(false);
  const [editPasswordModalStatus, setEditPasswordModalStatus] = useState<boolean>(false);
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
      title: '??????',
      align: 'center',
      dataIndex: 'username',
      width: '8rem',
    },
    {
      title: '??????',
      align: 'center',
      dataIndex: 'nickname',
      width: '8rem',
    },
    {
      title: '??????',
      align: 'center',
      dataIndex: 'avatar',
      width: '3rem',
      render: (avatar, record) => {
        return <Avatar src={avatar} />;
      },
    },
    {
      title: '??????',
      align: 'center',
      width: '14rem',
      dataIndex: 'email',
    },
    {
      title: '??????',
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
      title: '????????????',
      align: 'center',
      width: '6rem',
      dataIndex: 'totalLogin',
      sorter: true,
    },
    {
      title: '????????????',
      align: 'center',
      width: '12rem',
      dataIndex: 'createTime',
      sorter: true,
    },
    {
      title: '????????????',
      align: 'center',
      width: '12rem',
      dataIndex: 'modifyTime',
      sorter: true,
    },
    {
      title: '????????????IP',
      align: 'center',
      width: '12rem',
      dataIndex: 'lastLoginIp',
    },
    {
      title: '??????????????????',
      align: 'center',
      width: '12rem',
      dataIndex: 'lastLoginTime',
    },
    {
      title: '??????',
      width: '6rem',
      align: 'center',
      dataIndex: 'enabled',
      render(enabled: boolean, record: ResponseAdminUserListItemType) {
        return (
          <Authorization
            name="AdminUserEdit"
            forbidden={
              <>
                <Switch
                  disabled
                  checkedChildren={'??????'}
                  unCheckedChildren={'??????'}
                  checked={enabled}
                />
              </>
            }
          >
            <Popconfirm
              title={`?????????${record.enabled ? '??????' : '??????'}??????????????????`}
              okText="??????"
              cancelText="??????"
              onConfirm={() => updateEnabled(record)}
            >
              <Switch checkedChildren={'??????'} unCheckedChildren={'??????'} checked={enabled} />
            </Popconfirm>
          </Authorization>
        );
      },
    },
    {
      title: '??????',
      align: 'left',
      render(text, record: ResponseAdminUserListItemType) {
        return (
          <Space>
            <Authorization name="AdminUserView">
              <Button
                type="primary"
                style={{ marginRight: 4 }}
                onClick={() => openDetailModal(record)}
              >
                ??????
              </Button>
            </Authorization>

            <Authorization name="AdminUserEdit">
              <Button
                type="primary"
                style={{ marginRight: 4 }}
                onClick={() => openBindRolesModal(record)}
              >
                ????????????
              </Button>
            </Authorization>

            <Authorization name="AdminUserEdit">
              <Button
                type="primary"
                style={{ marginRight: 4 }}
                onClick={() => openEditModal(record)}
              >
                ??????
              </Button>
            </Authorization>

            <Authorization name="AdminUserEdit">
              {/* ????????????????????? */}
              <Button
                type="primary"
                style={{ marginRight: 4 }}
                onClick={() => openEditPasswordModal(record)}
              >
                ????????????
              </Button>
            </Authorization>

            {/* ????????????????????? */}
            <Authorization name="AdminUserDelete">
              {!record.enabled ? (
                <Popconfirm
                  title="?????????????????????????????????"
                  okText="??????"
                  cancelText="??????"
                  onConfirm={() => onDelete(record)}
                >
                  <Button type="primary" danger style={{ marginRight: 4 }}>
                    ??????
                  </Button>
                </Popconfirm>
              ) : (
                ''
              )}
            </Authorization>
          </Space>
        );
      },
    },
  ];

  // ?????????????????????
  function getRows(data?: RequestAdminUserListParamsType) {
    setLoading(true);
    adminUserList(data)
      .then((res: ResponseListType) => {
        const data: ResponseListDataType = res.data;
        const rows = data?.rows || [];
        const page = { total: data.total, pageSize: data.pageSize, pageNum: data.pageNum };
        setPageInfo(page);
        setRowsData(rows);
      })
      .catch((err) => {
        console.log('error', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  // ?????????????????????
  function updateEnabled(record: ResponseAdminUserListItemType) {
    const updateData: RequestAdminUserEnableParamsType = {
      adminId: record.adminId,
      enabled: !record.enabled,
    };
    adminUserEnable(updateData).then((res) => {
      message.success(res.message, MessageDuritain, () => {
        getRows({ ...pageInfo, ...form.getFieldsValue() });
      });
    });
  }

  function fetchAdminRoles(roleName?: string) {
    adminRoleAll({ roleName }).then((res) => {
      res.data.unshift({ roleId: 0, roleName: '??????' });
      setRoleOptions(res.data || []);
    });
  }

  // ???????????????
  function onDelete(record: ResponseAdminUserListItemType) {
    adminUserDelete({ adminId: record.adminId, enabled: record.enabled }).then(
      (res: ResponseBodyType) => {
        message.success(res.message, MessageDuritain);
        getRows({ ...pageInfo, ...form.getFieldsValue() });
      },
    );
  }

  // ???????????????
  function openDetailModal(record: ResponseAdminUserListItemType) {
    adminUserDetail({ adminId: record.adminId }).then((res) => {
      setDetailData(res.data);
      setDetailModalStatus(true);
    });
  }

  // ????????????
  function openBindRolesModal(record: ResponseAdminUserListItemType) {
    adminUserDetail({ adminId: record.adminId }).then((res) => {
      setDetailData(res.data);
      setBindRolesModalStatus(true);
    });
  }

  // ???????????????
  function openEditModal(record: ResponseAdminUserListItemType) {
    adminUserDetail({ adminId: record.adminId }).then((res) => {
      setDetailData(res.data);
      setEditModalStatus(true);
    });
  }

  // ???????????????
  function openAddModal() {
    setAddModalStatus(true);
  }

  function openEditPasswordModal(record: ResponseAdminUserListItemType) {
    adminUserDetail({ adminId: record.adminId }).then((res) => {
      setDetailData(res.data);
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
    setDetailData(undefined);
    setEditModalStatus(false);
    if (data.reload) {
      getRows({ ...pageInfo, ...form.getFieldsValue() });
    }
  }

  function noticeDetailModal(data: NoticeModalPropsType) {
    setDetailData(undefined);
    setDetailModalStatus(false);
    if (data.reload) {
      getRows({ ...pageInfo, ...form.getFieldsValue() });
    }
  }

  function noticeBindRolesModal(data: NoticeModalPropsType) {
    setDetailData(undefined);
    setBindRolesModalStatus(false);
    if (data.reload) {
      getRows({ ...pageInfo, ...form.getFieldsValue() });
    }
  }

  function noticeEditPasswordModal(data: NoticeModalPropsType) {
    setDetailData(undefined);
    setEditPasswordModalStatus(false);
    if (data.reload) {
      getRows({ ...pageInfo, ...form.getFieldsValue() });
    }
  }

  // ????????????
  function onSearchFinish(values: RequestAdminUserListParamsType) {
    const page = { ...pageInfo, pageNum: 1 };
    getRows({ ...values, ...page });
  }

  // ????????????
  function onSearchReset() {
    form.resetFields();
    getRows({ pageNum: 1, pageSize: pageInfo.pageSize });
  }

  function onShowSizeChange(current: number, size: number) {
    const page = { pageSize: size, pageNum: current };
    setPageInfo({ ...pageInfo, ...page });
  }

  function tableChange(pagination: any, filters: any, sorter: any) {
    const page = { pageSize: pagination.pageSize, pageNum: pagination.current };
    setPageInfo({ ...pageInfo, ...page });
    getRows({
      ...form.getFieldsValue(),
      ...page,
      sortField: sorter.field,
      sortType: sorter.order,
    });
  }

  useEffect(() => {
    onSearchReset();
  }, []);

  useEffect(() => {
    fetchAdminRoles();
  }, []);

  return (
    <Container>
      <Search>
        <Form form={form} onFinish={onSearchFinish}>
          <Row gutter={FormSearchRowGutter}>
            <Col span={FormSearchRowColSpan}>
              <Form.Item label="??????" name="username" initialValue={''}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={FormSearchRowColSpan}>
              <Form.Item label="??????" name="nickname" initialValue={''}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={FormSearchRowColSpan}>
              <Form.Item label="??????" name="email" initialValue={''}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={FormSearchRowColSpan}>
              <Form.Item label="?????????" name="roleId" initialValue={0}>
                <Select
                  style={{ offset: 0, width: '120' }}
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
              <Form.Item label="??????" name="enabled" initialValue={0}>
                <Select style={{ offset: 0, width: '120' }}>
                  <Select.Option value={0}>??????</Select.Option>
                  <Select.Option value={1}>??????</Select.Option>
                  <Select.Option value={2}>??????</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24} style={{ textAlign: 'right' }}>
              <Space>
                <Button type="primary" htmlType="submit">
                  <SearchOutlined />
                  ??????
                </Button>
                <Button type="primary" htmlType="button" onClick={onSearchReset}>
                  <ReloadOutlined />
                  ??????
                </Button>
              </Space>
            </Col>
          </Row>
        </Form>
      </Search>

      <Content>
        {/* button */}
        <Space style={{ marginBottom: '1rem' }}>
          <Authorization name="AdminUserEdit">
            <Button type="primary" onClick={openAddModal}>
              <PlusOutlined />
              ???????????????
            </Button>
          </Authorization>
        </Space>

        {/* table */}
        <Table
          sticky
          rowKey="adminId"
          scroll={{ x: 'auto' }}
          loading={loading}
          columns={columns}
          dataSource={rowsData}
          onChange={tableChange}
          pagination={{
            current: pageInfo.pageNum,
            pageSize: pageInfo.pageSize,
            total: pageInfo.total,
            showQuickJumper: true,
            position: ['bottomRight'],
            showTotal: (total) => `??? ${total} ?????????`,
            onShowSizeChange,
          }}
        />
      </Content>

      {/* modal */}

      <AdminUserAddModal modalStatus={addModalStatus} noticeModal={noticeAddModal} />

      <AdminUserDetailModal
        modalStatus={detailModalStatus}
        detailData={detailData}
        noticeModal={noticeDetailModal}
      />

      <AdminUserEditModal
        modalStatus={editModalStatus}
        detailData={detailData}
        noticeModal={noticeEditModal}
      />

      <AdminUserBindRolesModal
        modalStatus={bindModalStatus}
        detailData={detailData}
        noticeModal={noticeBindRolesModal}
      />

      <AdminUserEditPasswordModal
        modalStatus={editPasswordModalStatus}
        detailData={detailData}
        noticeModal={noticeEditPasswordModal}
      />
    </Container>
  );
};

export default Admin;
