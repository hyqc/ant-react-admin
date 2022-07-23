import { Form, Input, message, Modal, Select, Switch } from 'antd';
import { ChangeEvent, useState } from 'react';
import 'antd/es/modal/style';
import 'antd/es/slider/style';
import {
  adminPermissionAdd,
  RequestAdminPermissionAddParamsType,
} from '@/services/apis/admin/permission';
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
        const data: RequestAdminPermissionAddParamsType = {
          ...values,
        };
        adminPermissionAdd(data).then((res) => {
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
      title="新建权限"
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
        <Form.Item label="菜单名称" name="menuName">
          <Input disabled />
        </Form.Item>
        <Form.Item label="菜单路由" name="menuPath">
          <Input disabled />
        </Form.Item>
        <Form.Item label="名称" name="name" initialValue={''} rules={rules.name}>
          <Input />
        </Form.Item>
        <Form.Item label="类型" name="type" initialValue={'view'}>
          <Select style={{ offset: 0, width: '160' }}>
            <Select.Option value="view">查看</Select.Option>
            <Select.Option value="edit">编辑</Select.Option>
            <Select.Option value="delete">删除</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="键名" name="key" initialValue={''} rules={rules.key}>
          <Input onChange={onChangePath} />
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
