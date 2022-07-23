import { Form, Input, message, Modal, Switch } from 'antd';
import { ChangeEvent, useState } from 'react';
import 'antd/es/modal/style';
import 'antd/es/slider/style';
import { adminAPIAdd, RequestAdminAPIAddParamsType } from '@/services/apis/admin/resource';
import { DEFAULT_RULES, path2UpperCamelCase } from './components/common';

export type NoticeModalPropsType = {
  reload?: boolean;
};

export type AddModalPropsType = {
  modalStatus: boolean;
  noticeModal: (data: NoticeModalPropsType) => void;
};

const AddModal: React.FC<AddModalPropsType> = (props) => {
  const [form] = Form.useForm();
  const { modalStatus, noticeModal } = props;
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const rules: any = DEFAULT_RULES;

  function handleOk() {
    setConfirmLoading(true);
    form
      .validateFields()
      .then((values) => {
        const data: RequestAdminAPIAddParamsType = {
          ...values,
        };
        adminAPIAdd(data).then((res) => {
          message.success(res.message, MessageDuritain, () => {
            noticeModal({ reload: true });
            form.resetFields();
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
    form.resetFields();
    noticeModal({ reload: false });
  }

  function onChangePath(e: ChangeEvent) {
    form.setFieldsValue({ key: path2UpperCamelCase(form.getFieldValue('path')) });
  }

  return (
    <Modal
      forceRender
      title="新建接口"
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
          <Input />
        </Form.Item>
        <Form.Item label="路由" name="path" initialValue={''} rules={rules.path}>
          <Input onChange={onChangePath} />
        </Form.Item>
        <Form.Item label="键名" name="key" initialValue={''} rules={rules.key}>
          <Input />
        </Form.Item>
        <Form.Item label="描述" name="describe" initialValue={''}>
          <Input.TextArea />
        </Form.Item>
        <Form.Item label="状态" name="enabled" valuePropName="checked">
          <Switch checkedChildren={'启用'} unCheckedChildren={'禁用'} defaultChecked />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddModal;
