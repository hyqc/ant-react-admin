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
} from 'antd';
import { SearchOutlined, ReloadOutlined, PlusOutlined } from '@ant-design/icons';
import type { Gutter } from 'antd/lib/grid/row';
import { ResponseListDataType, ResponseListType } from '@/services/apis/types';
import {
  adminMenuDelete,
  adminMenuDetail,
  adminMenuEnable,
  adminMenuTree,
  RequestAdminMenuEnableParamsType,
  RequestAdminMenuListParamsType,
  RequestAdminMenuTreeParamsType,
  ResponseAdminMenuListItemType,
} from '@/services/apis/admin/menu';
import { DEFAULT_PAGE_INFO } from '@/services/apis/config';
import { ColumnsType } from 'antd/lib/table';
import Authorization from '@/components/Autuorization';
import AdminMenuDetailModal, { NoticeModalPropsType } from './detail';
import { history } from 'umi';

const FormSearchRowGutter: [Gutter, Gutter] = [12, 0];
const FormSearchRowColSpan = 5.2;

const Admin: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const [detailData, setDetailData] = useState<any>();
  const [rowsData, setRowsData] = useState<ResponseAdminMenuListItemType[]>([]);
  const [detailModalStatus, setDetailModalStatus] = useState<boolean>(false);

  const columns: ColumnsType<any> = [
    {
      title: '名称',
      align: 'left',
      dataIndex: 'name',
      width: '20rem',
    },
    {
      title: '路由',
      align: 'left',
      dataIndex: 'path',
      width: '12rem',
    },
    {
      title: '菜单',
      width: '6rem',
      align: 'left',
      dataIndex: 'hideInMenu',
      render(enabled: boolean, record: ResponseAdminMenuListItemType) {
        if (record.path == '/') {
          return <></>;
        }
        return (
          <Authorization>
            <Popconfirm
              title={`确定在菜单中${record.hideInMenu ? '显示' : '隐藏'}该项吗？`}
              okText="确定"
              cancelText="取消"
              onConfirm={() => updateMenuStatus(record, 'hideInMenu')}
            >
              <Switch checkedChildren={'隐藏'} unCheckedChildren={'显示'} checked={enabled} />
            </Popconfirm>
          </Authorization>
        );
      },
    },
    {
      title: '子菜单',
      width: '6rem',
      align: 'left',
      dataIndex: 'hideChildrenInMenu',
      render(enabled: boolean, record: ResponseAdminMenuListItemType) {
        if (record.path == '/') {
          return <></>;
        }
        return (
          <Authorization>
            <Popconfirm
              title={`确定在菜单中${record.hideInMenu ? '显示' : '隐藏'}其子菜单项吗？`}
              okText="确定"
              cancelText="取消"
              onConfirm={() => updateMenuStatus(record, 'hideChildrenInMenu')}
            >
              <Switch checkedChildren={'隐藏'} unCheckedChildren={'显示'} checked={enabled} />
            </Popconfirm>
          </Authorization>
        );
      },
    },
    {
      title: '状态',
      width: '6rem',
      align: 'center',
      dataIndex: 'enabled',
      render(enabled: boolean, record: ResponseAdminMenuListItemType) {
        if (record.path == '/') {
          return <></>;
        }
        return (
          <Authorization>
            <Popconfirm
              title={`确定要${record.enabled ? '禁用' : '启用'}该菜单吗？`}
              okText="确定"
              cancelText="取消"
              onConfirm={() => updateMenuStatus(record, 'enabled')}
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
      render(text, record: ResponseAdminMenuListItemType) {
        if (record.path == '/') {
          return <></>;
        }
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
                onClick={() => openAddModal(record)}
              >
                添加子菜单
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
                  title="确定要删除该菜单吗？"
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

  // 获取菜单列表
  function getRows(data?: RequestAdminMenuTreeParamsType) {
    setLoading(true);
    adminMenuTree(data)
      .then((res: ResponseListType) => {
        const resData: ResponseListDataType = res.data || DEFAULT_PAGE_INFO;
        setRowsData(resData.rows);
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
      ...form.getFieldsValue(),
    });
  }

  // 菜单状态更新
  function updateMenuStatus(record: ResponseAdminMenuListItemType, field: string) {
    const updateData: RequestAdminMenuEnableParamsType = {
      menuId: record.menuId,
    };
    updateData[field] = !record[field];
    adminMenuEnable(updateData).then((res) => {
      message.success(res.message, MessageDuritain, () => {
        getRows({ ...form.getFieldsValue() });
      });
    });
  }

  // 菜单详情
  function openDetailModal(record: ResponseAdminMenuListItemType) {
    adminMenuDetail({ menuId: record.menuId }).then((res) => {
      setDetailData(res.data);
      setDetailModalStatus(true);
    });
  }

  // 菜单编辑
  function openEditModal(record: ResponseAdminMenuListItemType) {
    history.push(`/admin/menu/edit?menuId=${record.menuId}`);
  }

  // 菜单添加
  function openAddModal(record?: ResponseAdminMenuListItemType) {
    if (record?.menuId) {
      history.push(`/admin/menu/add?menuId=${record.menuId}`);
      return;
    }
    history.push('/admin/menu/add');
  }

  function noticeDetailModal(data: NoticeModalPropsType) {
    setDetailData(undefined);
    setDetailModalStatus(false);
    if (data.reload) {
      getRows({ ...form.getFieldsValue() });
    }
  }

  // 删除菜单
  function onDelete(record: ResponseAdminMenuListItemType) {
    adminMenuDelete({ menuId: record.menuId, enabled: record.enabled }).then((res) => {
      message.success(res.message, MessageDuritain);
      getRows({ ...form.getFieldsValue() });
    });
  }

  // 管理员列表搜索
  function onSearchFinish(values: RequestAdminMenuListParamsType) {
    getRows({ ...values });
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
      <Content>
        {/* button */}
        <Space style={{ marginBottom: '1rem' }}>
          <Button type="primary" onClick={() => openAddModal()}>
            <PlusOutlined />
            新建菜单
          </Button>
        </Space>

        {/* table */}
        {rowsData !== undefined && rowsData.length > 0 ? (
          <Table
            sticky
            key={'menuId'}
            rowKey="menuId"
            scroll={{ x: 'auto' }}
            expandable={{
              defaultExpandAllRows: true,
              fixed: 'left',
              indentSize: 24,
            }}
            loading={loading}
            columns={columns}
            pagination={false}
            dataSource={rowsData}
            onChange={tableChange}
          ></Table>
        ) : (
          <></>
        )}
      </Content>

      {/* modal */}

      <AdminMenuDetailModal
        modalStatus={detailModalStatus}
        detailData={detailData}
        noticeModal={noticeDetailModal}
      />
    </Container>
  );
};

export default Admin;
