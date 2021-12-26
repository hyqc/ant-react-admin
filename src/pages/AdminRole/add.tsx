import { adminUserAdd, RequestAdminUserAddParamsType } from '@/services/apis/admin';
import { APIBase } from '@/services/apis/api';
import { SUCCESS } from '@/services/apis/code';
import { Form, Input, message, Modal, Switch, Upload } from 'antd';
import { useEffect, useState } from 'react';
import ImgCrop from 'antd-img-crop';
import { CloudUploadOutlined } from '@ant-design/icons';
import 'antd/es/modal/style';
import 'antd/es/slider/style';
import { adminRoleAdd, RequestAdminRoleAddParamsType } from '@/services/apis/role';

export type NoticeModalPropsType = {
  reload?: boolean;
};

export type AdminRoleAddModalPropsType = {
  modalStatus: boolean;
  noticeModal: (data: NoticeModalPropsType) => void;
};

const AdminRoleAddModal: React.FC<AdminRoleAddModalPropsType> = (props) => {
  const [form] = Form.useForm();
  const { modalStatus, noticeModal } = props;
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);

  const rules = {
    name: [{ required: true, message: '请输入角色名称!' }],
  };

  function handleOk() {
    setConfirmLoading(true);
    form
      .validateFields()
      .then((values) => {
        const data: RequestAdminRoleAddParamsType = {
          ...values,
        };
        adminRoleAdd(data)
          .then((res) => {
            if (res.code === SUCCESS) {
              message.destroy();
              message.success(res.message, MessageDuritain, () => {
                noticeModal({ reload: true });
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setConfirmLoading(false);
      });
  }

  function handleCancel() {
    noticeModal({ reload: false });
  }

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <Modal
      title="新建角色"
      width={DefaultModalWidth}
      destroyOnClose={true}
      getContainer={false}
      maskClosable={false}
      visible={modalStatus}
      confirmLoading={confirmLoading}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="保存"
      cancelText="取消"
    >
      <Form form={form} labelCol={{ span: 6 }} wrapperCol={{ span: 12 }}>
        <Form.Item label="名称" name="name" initialValue={''} rules={rules.name}>
          <Input allowClear />
        </Form.Item>
        <Form.Item label="状态" name="status" initialValue={true}>
          <Switch
            checkedChildren={'启用'}
            unCheckedChildren={'禁用'}
            defaultChecked={true}
            checked
          />
        </Form.Item>
        <Form.Item label="权限" name="avatar" initialValue={''}></Form.Item>
      </Form>
    </Modal>
  );
};

export default AdminRoleAddModal;
