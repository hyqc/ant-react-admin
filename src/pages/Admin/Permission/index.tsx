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
  Tooltip,
} from 'antd';
import { SearchOutlined, ReloadOutlined, PlusOutlined } from '@ant-design/icons';
import type { Gutter } from 'antd/lib/grid/row';
import {
  PageInfoType,
  ResponseBodyType,
  ResponseListDataType,
  ResponseListType,
} from '@/services/apis/types';
import {
  adminPermissionDelete,
  adminPermissionDetail,
  adminPermissionEnable,
  adminPermissionList,
  adminPermissionUnbindApi,
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
import AdminPermissionBindApiModal from './bind';
import { adminPageMenus, ResponseAdminMenuListItemType } from '@/services/apis/admin/menu';
import PageMenus from './components/PageMenus';
import { ResponseAdminAPIAllItemType } from '@/services/apis/admin/resource';

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
  const [pageMenusData, setPageMenusData] = useState<ResponseAdminMenuListItemType[]>([]);

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
      render(name: string, record: ResponseAdminPermissionListItemType) {
        return (
          <Tooltip title={record.key} key={record.id}>
            {name}
          </Tooltip>
        );
      },
    },
    {
      title: '类型',
      align: 'left',
      dataIndex: 'typeText',
      width: '3rem',
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
      title: '关联接口',
      align: 'left',
      dataIndex: 'apis',
      width: '24rem',
      render(apis: ResponseAdminAPIAllItemType[], record: ResponseAdminPermissionListItemType) {
        return showApisTag(apis, record);
      },
    },
    {
      title: '状态',
      width: '6rem',
      align: 'center',
      dataIndex: 'enabled',
      render(enabled: boolean, record: ResponseAdminPermissionListItemType) {
        return (
          <Authorization
            name="AdminPermissionEdit"
            forbidden={
              <>
                <Switch
                  disabled
                  checkedChildren={'启用'}
                  unCheckedChildren={'禁用'}
                  checked={enabled}
                />
              </>
            }
          >
            <Popconfirm
              title={`确定要${record.enabled ? '禁用' : '启用'}该权限吗？`}
              okText="确定"
              cancelText="取消"
              onConfirm={() => updateEnabled(record)}
            >
              <Switch checkedChildren={'启用'} unCheckedChildren={'禁用'} checked={enabled} />
            </Popconfirm>
          </Authorization>
        );
      },
    },
    {
      title: '操作',
      align: 'left',
      render(text, record: ResponseAdminPermissionListItemType) {
        return (
          <Space>
            <Authorization name="AdminPermissionView">
              <Button
                type="primary"
                style={{ marginRight: 4 }}
                onClick={() => openDetailModal(record)}
              >
                详情
              </Button>
            </Authorization>
            <Authorization name="AdminPermissionEdit">
              <Button
                type="primary"
                style={{ marginRight: 4 }}
                onClick={() => openEditModal(record)}
              >
                编辑
              </Button>
            </Authorization>
            <Authorization name="AdminPermissionEdit">
              <Button
                type="primary"
                style={{ marginRight: 4 }}
                onClick={() => openBindAPIModal(record)}
              >
                绑定接口
              </Button>
            </Authorization>
            {/* 禁用的才能删除 */}
            <Authorization name="AdminPermissionDelete">
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
        const rows = data?.list || [];
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

  // 删除绑定的接口
  function deleteBindApi(permissionId: number, apiId: number) {
    adminPermissionUnbindApi({ permissionId, apiId }).then((res) => {
      message.success(res.message, MessageDuritain, () => {
        getRows({ ...form.getFieldsValue() });
      });
    });
  }

  function showApisTag(
    apis: ResponseAdminAPIAllItemType[],
    record: ResponseAdminPermissionListItemType,
  ) {
    return apis.map((item) => {
      return (
        <Authorization
          key={item.apiId}
          name="AdminPermissionEdit"
          forbidden={
            <>
              <Tag style={{ cursor: 'no-drop' }} key={item.apiId}>
                {item.name}
              </Tag>
            </>
          }
        >
          <Popconfirm
            key={item.apiId}
            title={`确定要解绑${item.path}接口吗？`}
            okText="确定"
            cancelText="取消"
            onConfirm={() => deleteBindApi(record.id, item.apiId)}
          >
            <Tag style={{ cursor: 'pointer' }} key={item.apiId}>
              {item.name}
            </Tag>
          </Popconfirm>
        </Authorization>
      );
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

  function noticeBindModal(data: NoticeModalPropsType) {
    setDetailData(undefined);
    setBindAPIModalStatus(false);
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

  function getPageMenus() {
    adminPageMenus().then((res: ResponseBodyType) => {
      const rows = res.data?.filter((item: ResponseAdminMenuListItemType) => {
        return !item.hideInMenu;
      });
      setPageMenusData(rows);
    });
  }

  useEffect(() => {
    getPageMenus();
  }, []);

  useEffect(() => {
    onSearchReset();
  }, []);

  return (
    <Container>
      <Search>
        <Form form={form} onFinish={onSearchFinish}>
          <Row gutter={FormSearchRowGutter}>
            <Col span={FormSearchRowColSpan}>
              <Form.Item label="菜单名称" name="menuId" initialValue={0}>
                <PageMenus data={pageMenusData}>
                  <Select.Option value={0}>全部</Select.Option>
                </PageMenus>
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
                <Select>
                  <Select.Option value="">全部</Select.Option>
                  <Select.Option value="view">查看</Select.Option>
                  <Select.Option value="edit">编辑</Select.Option>
                  <Select.Option value="delete">删除</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={FormSearchRowColSpan}>
              <Form.Item label="权限状态" name="enabled" initialValue={0}>
                <Select>
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
          <Authorization name="AdminPermissionEdit">
            <Button type="primary" onClick={openAddModal}>
              <PlusOutlined />
              新建接口
            </Button>
          </Authorization>
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

      <AdminPermissionAddModal
        pageMenusData={pageMenusData}
        modalStatus={addModalStatus}
        noticeModal={noticeAddModal}
      />

      <AdminPermissionDetailModal
        detailData={detailData}
        modalStatus={detailModalStatus}
        noticeModal={noticeDetailModal}
      />

      <AdminPermissionEditModal
        pageMenusData={pageMenusData}
        modalStatus={editModalStatus}
        detailData={detailData}
        noticeModal={noticeEditModal}
      />

      <AdminPermissionBindApiModal
        modalStatus={bindAPIModalStatus}
        detailData={detailData}
        noticeModal={noticeBindModal}
      />
    </Container>
  );
};

export default Admin;
