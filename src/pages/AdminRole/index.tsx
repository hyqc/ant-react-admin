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
  Switch,
  message,
  Popconfirm,
  Pagination,
  Space,
} from 'antd';
import { SearchOutlined, ReloadOutlined, PlusOutlined } from '@ant-design/icons';
import type { Gutter } from 'antd/lib/grid/row';
import { ColumnsType } from 'antd/lib/table';
import type {
  ResponseListDataType,
  ResponseListType,
  ResponsePageInfoDataType,
} from '@/services/apis/types';
import { SUCCESS } from '@/services/apis/code';
import { DEFAULT_PAGE_INFO } from '@/services/apis/config';
import { DEFAULT_PAGE_NO, DEFAULT_PAGE_SIZE, STATUS_INVALID, STATUS_VALID } from './common';
import AdminRoleAddModal, { NoticeModalPropsType } from './add';
import AdminRoleEditModal from './edit';
import AdminRoleDetailModal from './detail';
import {
  adminRoleDelete,
  adminRoleEdit,
  adminRoleGet,
  adminRoleList,
  RequestAdminRoleListParamsType,
  ResponseAdminRoleEditParamsType,
  ResponseAdminRoleListItemType,
} from '@/services/apis/role';

const FormSearchRowGutter: [Gutter, Gutter] = [12, 0];
const FormSearchRowColSpan = 6;

const Admin: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const [pageInfo, setPageInfo] = useState<ResponsePageInfoDataType>();
  const [adminRoleListData, setAdminRoleDataList] = useState<ResponseAdminRoleListItemType[]>([]);
  const [detailModalStatus, setDetailModalStatus] = useState<boolean>(false);
  const [editModalStatus, setEditModalStatus] = useState<boolean>(false);
  const [addModalStatus, setAddModalStatus] = useState<boolean>(false);
  const [adminRoleInfoData, setAdminRoleInfoData] = useState<any>();

  const columns: ColumnsType<any> = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: '4rem',
      align: 'center',
      sorter: true,
    },
    {
      title: '角色名称',
      align: 'center',
      dataIndex: 'name',
      width: '8rem',
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
      render(status: number, record: ResponseAdminRoleListItemType) {
        return (
          <Popconfirm
            title={`确实要${record.status_text}该角色吗？`}
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
      render(text, record: ResponseAdminRoleListItemType) {
        return (
          <>
            <Space>
              <Button
                type="primary"
                style={{ marginRight: 4 }}
                onClick={() => openDetailModal(record)}
              >
                详情
              </Button>
              <Button
                type="primary"
                style={{ marginRight: 4 }}
                onClick={() => openAssignRolesModal(record)}
              >
                分配权限
              </Button>
              <Button
                type="primary"
                style={{ marginRight: 4 }}
                onClick={() => openEditModal(record)}
              >
                编辑
              </Button>

              {/* 禁用的才能删除 */}
              {record.status === STATUS_VALID ? (
                <Popconfirm
                  title="确实要删除该角色吗？"
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

  // 获取角色列表
  function getAdminRoleList(data?: RequestAdminRoleListParamsType) {
    setLoading(true);
    adminRoleList(data)
      .then((res: ResponseListType) => {
        if (res.code === SUCCESS) {
          const data: ResponseListDataType = res.data || DEFAULT_PAGE_INFO;
          const rows = data?.rows || [];
          const pageInfo: ResponsePageInfoDataType = {
            total: data.total,
            pageSize: data.pageSize,
            pageNo: data.pageNo,
          };
          setAdminRoleDataList(rows);
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

  // 角色状态更新
  function clickStatusBtn(record: ResponseAdminRoleListItemType) {
    const updateData: ResponseAdminRoleEditParamsType = {
      id: record.id,
      status: record.status === STATUS_VALID ? STATUS_INVALID : STATUS_VALID,
    };
    adminRoleEdit(updateData).then((res) => {
      if (res.code === SUCCESS) {
        message.success(res.message, MessageDuritain, () => {
          getAdminRoleList({ ...pageInfo, ...form.getFieldsValue() });
        });
      }
    });
  }

  // 角色列表搜索
  function onSearchFinish(values: RequestAdminRoleListParamsType) {
    getAdminRoleList({ ...values, ...pageInfo, pageNo: 1 });
  }

  // 角色搜索重置
  function onSearchReset() {
    form.resetFields();
    getAdminRoleList();
  }

  function tableChange(pagination: any, filters: any, sorter: any) {
    getAdminRoleList({
      ...pageInfo,
      ...form.getFieldsValue(),
      sortField: sorter.field,
      sortType: sorter.order,
    });
  }

  // 角色详情
  function openDetailModal(record: ResponseAdminRoleListItemType) {
    adminRoleGet({ id: record.id }).then((res) => {
      if (res.code === SUCCESS) {
        setAdminRoleInfoData(res.data);
        setDetailModalStatus(true);
      }
    });
  }

  // 角色编辑
  function openEditModal(record: ResponseAdminRoleListItemType) {
    adminRoleGet({ id: record.id }).then((res) => {
      if (res.code === SUCCESS) {
        setAdminRoleInfoData(res.data);
        setEditModalStatus(true);
      }
    });
  }

  // 角色添加
  function openAddModal() {
    setAddModalStatus(true);
  }

  function noticeAddModal(data: NoticeModalPropsType) {
    setAddModalStatus(false);
    if (data.reload) {
      getAdminRoleList({ ...pageInfo, ...form.getFieldsValue() });
    }
  }

  function noticeEditModal(data: NoticeModalPropsType) {
    setAdminRoleInfoData(undefined);
    setEditModalStatus(false);
    if (data.reload) {
      getAdminRoleList({ ...pageInfo, ...form.getFieldsValue() });
    }
  }

  function noticeDetailModal(data: NoticeModalPropsType) {
    setAdminRoleInfoData(undefined);
    setDetailModalStatus(false);
    if (data.reload) {
      getAdminRoleList({ ...pageInfo, ...form.getFieldsValue() });
    }
  }

  // 删除角色
  function onDeleteAdminUser(record: ResponseAdminRoleListItemType) {
    adminRoleDelete({ ...record }).then((res) => {
      if (res.code === SUCCESS) {
        message.success(res.message, MessageDuritain);
        getAdminRoleList({ ...pageInfo, ...form.getFieldsValue() });
      }
    });
  }

  useEffect(() => {
    getAdminRoleList();
  }, []);

  return (
    <Container>
      <Search>
        <Form form={form} onFinish={onSearchFinish}>
          <Row gutter={FormSearchRowGutter}>
            <Col span={FormSearchRowColSpan}>
              <Form.Item label="角色名称" name="name" initialValue={''}>
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
          rowKey="id"
          scroll={{ x: 'auto' }}
          loading={loading}
          columns={columns}
          pagination={false}
          dataSource={adminRoleListData}
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
          onChange={(pageNo) => getAdminRoleList({ pageNo, ...form.getFieldsValue() })}
          onShowSizeChange={(pageSize) => getAdminRoleList({ pageSize, ...form.getFieldsValue() })}
        />
      </Content>

      {/* modal */}
      <AdminRoleAddModal modalStatus={addModalStatus} noticeModal={noticeAddModal} />

      <AdminRoleEditModal
        modalStatus={editModalStatus}
        detailData={adminRoleInfoData}
        noticeModal={noticeEditModal}
      />

      <AdminRoleDetailModal
        modalStatus={detailModalStatus}
        detailData={adminRoleInfoData}
        noticeModal={noticeDetailModal}
      />
    </Container>
  );
};

export default Admin;
