import { Form, Input, message, Modal, Switch } from 'antd';
import { useEffect, useState } from 'react';
import 'antd/es/modal/style';
import 'antd/es/slider/style';
import {
  adminMenuAdd,
  RequestAdminMenuAddParamsType,
  ResponseAdminMenuListItemType,
} from '@/services/apis/admin/menu';
import MenuTreeSelect from './components/MenuTreeSelect';

export type NoticeModalPropsType = {
  reload?: boolean;
};

export type AddModalPropsType = {
  modalStatus: boolean;
  menuTreeData: ResponseAdminMenuListItemType[];
  noticeModal: (data: NoticeModalPropsType) => void;
};

const AddModal: React.FC<AddModalPropsType> = (props) => {
  const [form] = Form.useForm();
  const { modalStatus, menuTreeData, noticeModal } = props;
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const rules: any = {
    name: [{ required: true, type: 'string', message: '请输入菜单名称!' }],
    path: [{ required: true, type: 'string', message: '请输入菜单路由!' }],
    key: [{ required: true, type: 'string', message: '请输入菜单键名!' }],
  };

  function handleOk() {
    setConfirmLoading(true);
    form
      .validateFields()
      .then((values) => {
        const data: RequestAdminMenuAddParamsType = {
          ...values,
        };
        adminMenuAdd(data).then((res) => {
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

  return (
    <Modal
      forceRender
      title="新建菜单"
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
        <Form.Item label="父级菜单" name="pid" initialValue={0} hasFeedback>
          <MenuTreeSelect data={menuTreeData} />
        </Form.Item>
        <Form.Item label="名称" name="name" initialValue={''} hasFeedback rules={rules.name}>
          <Input allowClear />
        </Form.Item>
        <Form.Item label="路由" name="path" initialValue={''} hasFeedback rules={rules.path}>
          <Input allowClear />
        </Form.Item>
        <Form.Item label="键名" name="key" initialValue={''} hasFeedback rules={rules.key}>
          <Input allowClear />
        </Form.Item>
        <Form.Item label="描述" name="describe" initialValue={''} hasFeedback>
          <Input.TextArea allowClear />
        </Form.Item>
        <Form.Item label="菜单中隐藏" name="hideInMenu" initialValue={true}>
          <Switch
            checkedChildren={'隐藏'}
            unCheckedChildren={'显示'}
            defaultChecked={false}
            checked
          />
        </Form.Item>
        <Form.Item label="菜单中隐藏子菜单" name="hideChildrenInMenu" initialValue={true}>
          <Switch
            checkedChildren={'隐藏'}
            unCheckedChildren={'显示'}
            defaultChecked={false}
            checked
          />
        </Form.Item>
        <Form.Item label="状态" name="enabled" initialValue={true}>
          <Switch
            checkedChildren={'启用'}
            unCheckedChildren={'禁用'}
            defaultChecked={false}
            checked
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddModal;
