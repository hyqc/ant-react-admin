import { adminRoleEdit, ResponseAdminRoleDetailType } from '@/services/apis/admin/role';
import { Form, Input, message, Modal, Switch } from 'antd';
import { useEffect, useState } from 'react';
import 'antd/es/modal/style';
import 'antd/es/slider/style';

export type NoticeModalPropsType = {
  reload?: boolean;
};

export type AddPermissionModalPropsType = {
  modalStatus: boolean;
  detailData: ResponseAdminRoleDetailType;
  noticeModal: (data: NoticeModalPropsType) => void;
};

const AddPermissionModal: React.FC<AddPermissionModalPropsType> = (props) => {
  const [form] = Form.useForm();
  const { modalStatus, detailData, noticeModal } = props;
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);

  const rules: any = {
    roleName: [{ required: true, type: 'string', message: '请输入角色名称!' }],
  };

  function handleOk() {
    setConfirmLoading(true);
    form
      .validateFields()
      .then((values) => {
        adminRoleEdit(values).then((res) => {
          message.success(res.message, MessageDuritain, () => {
            noticeModal({ reload: true });
          });
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
    form.setFieldsValue(detailData);
  }, [detailData]);

  return (
    <Modal
      forceRender
      title="角色分配权限"
      width={DefaultModalWidth}
      destroyOnClose={true}
      maskClosable={false}
      getContainer={false}
      visible={modalStatus}
      confirmLoading={confirmLoading}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="保存"
      cancelText="取消"
    >
      <Form form={form} labelCol={{ span: 6 }} wrapperCol={{ span: 12 }}>
        <Form.Item label="ID" name="id" hidden>
          <Input disabled />
        </Form.Item>
        <Form.Item label="名称" name="name" rules={rules.name}>
          <Input disabled />
        </Form.Item>
        <Form.Item label="描述" name="describe">
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddPermissionModal;
