import React, { useEffect, useState } from 'react';
import { Container, Content, Search } from '@/components/PageListContainer';
import {
  Form,
  Input,
  Button,
  Select,
  Row,
  Col,
  Space,
  Table,
  Pagination,
  message,
  Popconfirm,
  Switch,
} from 'antd';
import { SearchOutlined, ReloadOutlined, PlusOutlined } from '@ant-design/icons';
import type { Gutter } from 'antd/lib/grid/row';
import {
  ResponseListDataType,
  ResponseListType,
  ResponsePageInfoDataType,
} from '@/services/apis/types';
import {
  adminRoleDelete,
  adminRoleDetail,
  adminRoleEdit,
  adminRoleList,
  RequestAdminRoleEditParamsType,
  RequestAdminRoleListParamsType,
  ResponseAdminRoleListItemType,
} from '@/services/apis/admin/role';
import { DEFAULT_PAGE_INFO } from '@/services/apis/config';
import { ColumnsType } from 'antd/lib/table';
import Authorization from '@/components/Autuorization';
import { DEFAULT_PAGE_NO, DEFAULT_PAGE_SIZE } from './common';
import AdminRoleAddModal, { NoticeModalPropsType } from './add';
import AdminRoleEditModal from './edit';
import AdminRoleDetailModal from './detail';

const FormSearchRowGutter: [Gutter, Gutter] = [12, 0];
const FormSearchRowColSpan = 5.2;

const Admin: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const [pageInfo, setPageInfo] = useState<ResponsePageInfoDataType>();
  const [detailData, setDetailData] = useState<any>();
  const [rowsData, setRowsData] = useState<ResponseAdminRoleListItemType[]>([]);
  const [detailModalStatus, setDetailModalStatus] = useState<boolean>(false);
  const [editModalStatus, setEditModalStatus] = useState<boolean>(false);
  const [addModalStatus, setAddModalStatus] = useState<boolean>(false);

  const columns: ColumnsType<any> = [
    {
      title: 'ID',
      dataIndex: 'roleId',
      width: '6rem',
      align: 'center',
      sorter: true,
    },
    {
      title: '名称',
      align: 'center',
      dataIndex: 'roleName',
      width: '12rem',
    },
    {
      title: '创建时间',
      align: 'center',
      dataIndex: 'createTime',
      sorter: true,
    },
    {
      title: '更新时间',
      align: 'center',
      dataIndex: 'modifyTime',
      sorter: true,
    },
    {
      title: '状态',
      width: '4rem',
      align: 'center',
      dataIndex: 'enabled',
      render(enabled: boolean, record: ResponseAdminRoleListItemType) {
        return (
          <Popconfirm
            title={`确实要${record.enabledText}该角色吗？`}
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
      render(text, record: ResponseAdminRoleListItemType) {
        return (
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
            <Authorization>
              <Button
                type="primary"
                style={{ marginRight: 4 }}
                onClick={() => openEditModal(record)}
              >
                编辑
              </Button>
            </Authorization>

            {/* 禁用的才能删除 */}
            <Authorization>
              {!record.enabled ? (
                <Popconfirm
                  title="确实要删除该角色吗？"
                  okText="确定"
                  cancelText="取消"
                  onConfirm={() => onDelete(record)}
                >
                  <Button type="primary" danger style={{ marginRight: 4 }}>
                    删除
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

  // 获取角色列表
  function getRows(data?: RequestAdminRoleListParamsType) {
    setLoading(true);
    adminRoleList(data)
      .then((res: ResponseListType) => {
        const data: ResponseListDataType = res.data || DEFAULT_PAGE_INFO;
        const rows = data?.rows || [];
        const pageInfo: ResponsePageInfoDataType = {
          total: data.total,
          pageSize: data.pageSize,
          pageNo: data.pageNo,
        };
        setRowsData(rows);
        setPageInfo(pageInfo);
      })
      .catch((err) => {
        console.log('error', err);
      })
      .finally(() => {
        setLoading(false);
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

  // 角色状态更新
  function updateEnabled(record: ResponseAdminRoleListItemType) {
    const updateData: RequestAdminRoleEditParamsType = {
      roleId: record.roleId,
      enabled: !record.enabled,
    };
    adminRoleEdit(updateData).then((res) => {
      message.success(res.message, MessageDuritain, () => {
        getRows({ ...pageInfo, ...form.getFieldsValue() });
      });
    });
  }

  // 角色详情
  function openDetailModal(record: ResponseAdminRoleListItemType) {
    adminRoleDetail({ roleId: record.roleId }).then((res) => {
      setDetailData(res.data);
      setDetailModalStatus(true);
    });
  }

  // 角色编辑
  function openEditModal(record: ResponseAdminRoleListItemType) {
    adminRoleDetail({ roleId: record.roleId }).then((res) => {
      setDetailData(res.data);
      setEditModalStatus(true);
    });
  }

  // 角色添加
  function openAddModal() {
    setAddModalStatus(true);
  }

  function noticeAddModal(data: NoticeModalPropsType) {
    setAddModalStatus(false);
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

  function noticeEditModal(data: NoticeModalPropsType) {
    setDetailData(undefined);
    setEditModalStatus(false);
    if (data.reload) {
      getRows({ ...pageInfo, ...form.getFieldsValue() });
    }
  }

  // 删除角色
  function onDelete(record: ResponseAdminRoleListItemType) {
    adminRoleDelete({ roleId: record.roleId, enabled: record.enabled }).then((res) => {
      message.success(res.message, MessageDuritain);
      getRows({ ...pageInfo, ...form.getFieldsValue() });
    });
  }

  // 管理员列表搜索
  function onSearchFinish(values: RequestAdminRoleListParamsType) {
    getRows({ ...values, ...pageInfo, pageNum: 1 });
  }

  // 管理员搜索重置
  function onSearchReset() {
    form.resetFields();
    getRows();
  }

  useEffect(() => {
    getRows();
  }, []);

  return (
    <Container>
      <Search>
        <Form form={form} onFinish={onSearchFinish}>
          <Row gutter={FormSearchRowGutter}>
            <Col span={FormSearchRowColSpan}>
              <Form.Item label="名称" name="roleName" initialValue={''}>
                <Input allowClear />
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
            新建角色
          </Button>
        </Space>

        {/* table */}
        <Table
          rowKey="roleId"
          scroll={{ x: 'auto' }}
          loading={loading}
          columns={columns}
          pagination={false}
          dataSource={rowsData}
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

      <AdminRoleAddModal modalStatus={addModalStatus} noticeModal={noticeAddModal} />

      <AdminRoleDetailModal
        modalStatus={detailModalStatus}
        detailData={detailData}
        noticeModal={noticeDetailModal}
      />

      <AdminRoleEditModal
        modalStatus={editModalStatus}
        detailData={detailData}
        noticeModal={noticeEditModal}
      />
    </Container>
  );
};

export default Admin;
