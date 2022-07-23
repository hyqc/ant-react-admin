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
  message,
  Popconfirm,
  Switch,
  Tag,
} from 'antd';
import { SearchOutlined, ReloadOutlined, PlusOutlined } from '@ant-design/icons';
import type { Gutter } from 'antd/lib/grid/row';
import { PageInfoType, ResponseListDataType, ResponseListType } from '@/services/apis/types';
import {
  adminPermissionDelete,
  adminPermissionDetail,
  adminPermissionEnable,
  adminPermissionList,
  RequestAdminPermissionEnableParamsType,
  RequestAdminPermissionListParamsType,
  ResponseAdminPermissionListItemType,
} from '@/services/apis/admin/permission';
import { DEFAULT_PAGE_INFO } from '@/services/apis/config';
import { ColumnsType } from 'antd/lib/table';
import Authorization from '@/components/Autuorization';
import AdminPermissionAddModal, { NoticeModalPropsType } from './add';
import AdminPermissionEditModal from './edit';
import AdminPermissionDetailModal from './detail';

const FormSearchRowGutter: [Gutter, Gutter] = [12, 0];
const FormSearchRowColSpan = 5.2;

const Admin: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const [pageInfo, setPageInfo] = useState<PageInfoType>({ ...DEFAULT_PAGE_INFO });
  const [detailData, setDetailData] = useState<any>();
  const [rowsData, setRowsData] = useState<ResponseAdminPermissionListItemType[]>([]);
  const [detailModalStatus, setDetailModalStatus] = useState<boolean>(false);
  const [editModalStatus, setEditModalStatus] = useState<boolean>(false);
  const [addModalStatus, setAddModalStatus] = useState<boolean>(false);
  const [bindAPIModalStatus, setBindAPIModalStatus] = useState<boolean>(false);

  const columns: ColumnsType<any> = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: '4rem',
      align: 'center',
      sorter: true,
    },
    {
      title: '菜单名称',
      align: 'left',
      dataIndex: 'menuName',
      width: '8rem',
    },
    {
      title: '名称',
      align: 'left',
      dataIndex: 'name',
      width: '8rem',
    },
    {
      title: '类型',
      align: 'left',
      dataIndex: 'typeText',
      width: '4rem',
      render(type: string, record: ResponseAdminPermissionListItemType) {
        return record.type === 'view' ? (
          <Tag key={record.id} color="#87d068">
            {record.typeText}
          </Tag>
        ) : record.type === 'edit' ? (
          <Tag key={record.id} color="#108ee9">
            {record.typeText}
          </Tag>
        ) : (
          <Tag key={record.id} color="#f50">
            {record.typeText}
          </Tag>
        );
      },
    },
    {
      title: '唯一键',
      align: 'left',
      dataIndex: 'key',
      width: '10rem',
    },
    {
      title: '状态',
      width: '6rem',
      align: 'center',
      dataIndex: 'enabled',
      render(enabled: boolean, record: ResponseAdminPermissionListItemType) {
        return (
          <Popconfirm
            title={`确定要${record.enabled ? '禁用' : '启用'}该权限吗？`}
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
      render(text, record: ResponseAdminPermissionListItemType) {
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
            <Authorization>
              <Button
                type="primary"
                style={{ marginRight: 4 }}
                onClick={() => openBindAPIModal(record)}
              >
                绑定接口
              </Button>
            </Authorization>
            {/* 禁用的才能删除 */}
            <Authorization>
              {!record.enabled ? (
                <Popconfirm
                  title="确定要删除该权限吗？"
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

  // 获取权限列表
  function getRows(data?: RequestAdminPermissionListParamsType) {
    setLoading(true);
    adminPermissionList(data)
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

  // 权限状态更新
  function updateEnabled(record: ResponseAdminPermissionListItemType) {
    const updateData: RequestAdminPermissionEnableParamsType = {
      permissionId: record.id,
      enabled: !record.enabled,
    };
    adminPermissionEnable(updateData).then((res) => {
      message.success(res.message, MessageDuritain, () => {
        getRows({ ...form.getFieldsValue() });
      });
    });
  }

  // 权限添加
  function openAddModal() {
    setAddModalStatus(true);
  }

  // 权限详情
  function openDetailModal(record: ResponseAdminPermissionListItemType) {
    adminPermissionDetail({ permissionId: record.id }).then((res) => {
      setDetailData(res.data);
      setDetailModalStatus(true);
    });
  }

  // 权限编辑
  function openEditModal(record: ResponseAdminPermissionListItemType) {
    adminPermissionDetail({ permissionId: record.id }).then((res) => {
      setDetailData(res.data);
      setEditModalStatus(true);
    });
  }

  function openBindAPIModal(record: ResponseAdminPermissionListItemType) {
    adminPermissionDetail({ permissionId: record.id }).then((res) => {
      setDetailData(res.data);
      setBindAPIModalStatus(true);
    });
  }

  function noticeAddModal(data: NoticeModalPropsType) {
    setAddModalStatus(false);
    if (data.reload) {
      getRows({ ...form.getFieldsValue() });
    }
  }

  function noticeDetailModal(data: NoticeModalPropsType) {
    setDetailData(undefined);
    setDetailModalStatus(false);
    if (data.reload) {
      getRows({ ...form.getFieldsValue() });
    }
  }

  function noticeEditModal(data: NoticeModalPropsType) {
    setDetailData(undefined);
    setEditModalStatus(false);
    if (data.reload) {
      getRows({ ...form.getFieldsValue() });
    }
  }

  // 删除权限
  function onDelete(record: ResponseAdminPermissionListItemType) {
    adminPermissionDelete({ permissionId: record.id, enabled: record.enabled }).then((res) => {
      message.success(res.message, MessageDuritain);
      getRows({ ...form.getFieldsValue() });
    });
  }

  // 管理员列表搜索
  function onSearchFinish(values: RequestAdminPermissionListParamsType) {
    const page = { ...pageInfo, pageNum: 1 };
    getRows({ ...values, ...page });
  }

  // 管理员搜索重置
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

  return (
    <Container>
      <Search>
        <Form form={form} onFinish={onSearchFinish}>
          <Row gutter={FormSearchRowGutter}>
            <Col span={FormSearchRowColSpan}>
              <Form.Item label="菜单名称" name="menuName" initialValue={''}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={FormSearchRowColSpan}>
              <Form.Item label="权限名称" name="name" initialValue={''}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={FormSearchRowColSpan}>
              <Form.Item label="权限键名" name="key" initialValue={''}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={FormSearchRowColSpan}>
              <Form.Item label="权限类型" name="type" initialValue={''}>
                <Select style={{ offset: 0, width: '160' }}>
                  <Select.Option value="">全部</Select.Option>
                  <Select.Option value="view">查看</Select.Option>
                  <Select.Option value="edit">编辑</Select.Option>
                  <Select.Option value="delete">删除</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={FormSearchRowColSpan}>
              <Form.Item label="权限状态" name="enabled" initialValue={0}>
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
            新建接口
          </Button>
        </Space>

        {/* table */}
        <Table
          sticky
          rowKey="id"
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
            showTotal: (total) => `共 ${total} 条数据`,
            onShowSizeChange,
          }}
        />
      </Content>

      {/* modal */}

      <AdminPermissionAddModal modalStatus={addModalStatus} noticeModal={noticeAddModal} />

      <AdminPermissionDetailModal
        detailData={detailData}
        modalStatus={detailModalStatus}
        noticeModal={noticeDetailModal}
      />

      <AdminPermissionEditModal
        modalStatus={editModalStatus}
        detailData={detailData}
        noticeModal={noticeEditModal}
      />
    </Container>
  );
};

export default Admin;
