import { ResponseAdminUserIDetailType } from '@/services/apis/admin';
import { Form, Modal, Switch, Tag } from 'antd';
import { useEffect } from 'react';
import 'antd/es/modal/style';
import 'antd/es/slider/style';
import Avatar from 'antd/lib/avatar/avatar';
import { STATUS_VALID } from './common';

export type NoticeModalPropsType = {
  reload?: boolean;
};

export type AdminUserEditModalPropsType = {
  modalStatus: boolean;
  detailData: ResponseAdminUserIDetailType;
  noticeModal: (data: NoticeModalPropsType) => void;
};

const AdminUserDetailModal: React.FC<AdminUserEditModalPropsType> = (props) => {
  const { modalStatus, detailData, noticeModal } = props;

  function handleCancel() {
    noticeModal({ reload: false });
  }

  useEffect(() => {
    return () => {};
  }, [detailData]);

  return (
    <Modal
      title="管理员详情"
      footer={null}
      width={DefaultModalWidth}
      destroyOnClose={true}
      getContainer={false}
      visible={modalStatus}
      onCancel={handleCancel}
    >
      <Form labelCol={{ span: 6 }} wrapperCol={{ span: 12 }}>
        <Form.Item label="ID" name="id">
          <span>{detailData?.id}</span>
        </Form.Item>
        <Form.Item label="名称" name="name">
          <span>{detailData?.name}</span>
        </Form.Item>
        <Form.Item label="头像" name="avatar" initialValue={true}>
          <Avatar size={64} src={detailData?.avatar} />
        </Form.Item>
        <Form.Item label="昵称" name="nick_name">
          <span>{detailData?.nick_name}</span>
        </Form.Item>
        <Form.Item label="邮箱" name="email">
          <span>{detailData?.email}</span>
        </Form.Item>
        <Form.Item label="角色" name="email">
          <span>
            {detailData?.roles?.map((item) => {
              return (
                <Tag key={item.id} color="blue">
                  {item.name}
                </Tag>
              );
            })}
          </span>
        </Form.Item>
        <Form.Item label="状态" name="status">
          <Switch
            disabled
            checkedChildren={'启用'}
            unCheckedChildren={'禁用'}
            checked={detailData?.status === STATUS_VALID}
          />
        </Form.Item>
        <Form.Item label="登录次数" name="email">
          <span>{detailData?.total_login}</span>
        </Form.Item>
        <Form.Item label="创建时间" name="email">
          <span>{detailData?.create_time}</span>
        </Form.Item>
        <Form.Item label="更新时间" name="email">
          <span>{detailData?.modify_time}</span>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AdminUserDetailModal;
