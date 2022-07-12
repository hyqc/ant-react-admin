import { ResponseAdminUserDetailType } from '@/services/apis/admin/admin';
import { Drawer, Form, Switch, Tag } from 'antd';
import { useEffect } from 'react';
import 'antd/es/modal/style';
import 'antd/es/slider/style';
import Avatar from 'antd/lib/avatar/avatar';

export type NoticeModalPropsType = {
  reload?: boolean;
};

export type AdminUserDetailModalPropsType = {
  modalStatus: boolean;
  detailData: ResponseAdminUserDetailType;
  noticeModal: (data: NoticeModalPropsType) => void;
};

const AdminUserDetailModal: React.FC<AdminUserDetailModalPropsType> = (props) => {
  const { modalStatus, detailData, noticeModal } = props;

  function onClose() {
    noticeModal({ reload: false });
  }

  useEffect(() => {
    return () => {};
  }, [detailData]);

  return (
    <Drawer
      title="管理员详情"
      footer={null}
      width={DefaultDrawerWidth}
      destroyOnClose={true}
      getContainer={false}
      visible={modalStatus}
      onClose={onClose}
    >
      <Form labelCol={{ span: 6 }} wrapperCol={{ span: 12 }}>
        <Form.Item label="ID" name="adminId">
          <span>{detailData?.adminId}</span>
        </Form.Item>
        <Form.Item label="名称" name="username">
          <span>{detailData?.username}</span>
        </Form.Item>
        <Form.Item label="头像" name="avatar" initialValue={true}>
          <Avatar size={64} src={detailData?.avatar} />
        </Form.Item>
        <Form.Item label="昵称" name="nickname">
          <span>{detailData?.nickname}</span>
        </Form.Item>
        <Form.Item label="邮箱" name="email">
          <span>{detailData?.email}</span>
        </Form.Item>
        <Form.Item label="角色" name="roles">
          <span>
            {detailData?.roles?.map((item) => {
              return (
                <Tag key={item.roleId} color="blue">
                  {item.roleName}
                </Tag>
              );
            })}
          </span>
        </Form.Item>
        <Form.Item label="状态" name="enabled">
          <Switch
            disabled
            checkedChildren={'启用'}
            unCheckedChildren={'禁用'}
            checked={detailData?.enabled}
          />
        </Form.Item>
        <Form.Item label="登录次数" name="totalLogin">
          <span>{detailData?.totalLogin}</span>
        </Form.Item>
        <Form.Item label="最后登录IP" name="lastLoginIp">
          <span>{detailData?.lastLoginIp}</span>
        </Form.Item>
        <Form.Item label="最后登录时间" name="lastLoginTime">
          <span>{detailData?.lastLoginTime}</span>
        </Form.Item>
        <Form.Item label="创建时间" name="createTime">
          <span>{detailData?.createTime}</span>
        </Form.Item>
        <Form.Item label="更新时间" name="modifyTime">
          <span>{detailData?.modifyTime}</span>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default AdminUserDetailModal;
