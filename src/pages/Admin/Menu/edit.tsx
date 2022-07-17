import { adminMenuEdit } from '@/services/apis/admin/menu';
import { Form, Input, message, Modal, Switch } from 'antd';
import { useEffect, useState } from 'react';
import 'antd/es/modal/style';
import 'antd/es/slider/style';
import {
  ResponseAdminMenuDetailType,
  ResponseAdminMenuListItemType,
} from '@/services/apis/admin/menu';
import MenuTreeSelect from './components/MenuTreeSelect';

export type NoticeModalPropsType = {
  reload?: boolean;
};

export type EditModalPropsType = {
  modalStatus: boolean;
  detailData: ResponseAdminMenuDetailType;
  menuTreeData: ResponseAdminMenuListItemType[];
  noticeModal: (data: NoticeModalPropsType) => void;
};

const EditModal: React.FC<EditModalPropsType> = (props) => {
  const [form] = Form.useForm();
  const { modalStatus, detailData, menuTreeData, noticeModal } = props;
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
        adminMenuEdit(values).then((res) => {
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
      title="编辑菜单"
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
        <Form.Item label="父级菜单" name="pid" hasFeedback>
          <MenuTreeSelect data={menuTreeData} />
        </Form.Item>
        <Form.Item label="名称" name="name" hasFeedback rules={rules.name}>
          <Input allowClear />
        </Form.Item>
        <Form.Item label="路由" name="path" hasFeedback rules={rules.path}>
          <Input allowClear />
        </Form.Item>
        <Form.Item label="键名" name="key" hasFeedback rules={rules.key}>
          <Input allowClear />
        </Form.Item>
        <Form.Item label="描述" name="describe" hasFeedback>
          <Input.TextArea allowClear />
        </Form.Item>
        <Form.Item label="菜单中隐藏" name="hideInMenu" valuePropName="checked">
          <Switch checkedChildren={'隐藏'} unCheckedChildren={'显示'} />
        </Form.Item>
        <Form.Item label="菜单中隐藏子菜单" name="hideChildrenInMenu" valuePropName="checked">
          <Switch checkedChildren={'隐藏'} unCheckedChildren={'显示'} />
        </Form.Item>
        <Form.Item label="状态" name="enabled" valuePropName="checked">
          <Switch checkedChildren={'启用'} unCheckedChildren={'禁用'} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditModal;
