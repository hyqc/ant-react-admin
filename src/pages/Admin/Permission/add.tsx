import { Form, Input, message, Modal, Select, Switch } from 'antd';
import { ChangeEvent, useEffect, useState } from 'react';
import 'antd/es/modal/style';
import 'antd/es/slider/style';
import {
  adminPermissionAdd,
  RequestAdminPermissionAddParamsType,
} from '@/services/apis/admin/permission';
import { DEFAULT_RULES, path2UpperCamelCase } from './components/common';
import { ResponseAdminMenuListItemType } from '@/services/apis/admin/menu';
import PageMenus from './components/PageMenus';

export type NoticeModalPropsType = {
  reload?: boolean;
};

export type AddModalPropsType = {
  pageMenusData: ResponseAdminMenuListItemType[];
  modalStatus: boolean;
  noticeModal: (data: NoticeModalPropsType) => void;
};

const AddModal: React.FC<AddModalPropsType> = (props) => {
  const [form] = Form.useForm();
  const { pageMenusData, modalStatus, noticeModal } = props;
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const [menuCheckedItem, setMenuCheckedItem] = useState<
    ResponseAdminMenuListItemType | undefined
  >();
  const [pageMenusDataMap, setPageMenusDataMap] = useState<any>();

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

  function menuIdChange(index: number) {
    if (pageMenusDataMap[index] !== undefined) {
      setMenuCheckedItem(pageMenusDataMap[index]);
    }
  }

  useEffect(() => {
    const data: any = {};
    pageMenusData?.forEach((item) => {
      data[item.menuId] = item;
    });
    setPageMenusDataMap(data);
  }, [pageMenusData]);

  return (
    <Modal
      forceRender
      title="????????????"
      width={DefaultModalWidth}
      destroyOnClose={true}
      getContainer={false}
      maskClosable={false}
      visible={modalStatus}
      confirmLoading={confirmLoading}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="??????"
      cancelText="??????"
    >
      <Form form={form} labelCol={{ span: 6 }} wrapperCol={{ span: 12 }}>
        <Form.Item label="????????????" name="menuId">
          <PageMenus data={pageMenusData} onChange={menuIdChange} />
        </Form.Item>
        <Form.Item label="????????????">
          <Input disabled value={menuCheckedItem?.path} />
        </Form.Item>
        <Form.Item label="??????" name="name" initialValue={''} rules={rules.name}>
          <Input />
        </Form.Item>
        <Form.Item label="??????" name="type" initialValue={'view'}>
          <Select style={{ offset: 0, width: '160' }}>
            <Select.Option value="view">??????</Select.Option>
            <Select.Option value="edit">??????</Select.Option>
            <Select.Option value="delete">??????</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="??????" name="key" initialValue={''} rules={rules.key}>
          <Input onChange={onChangePath} />
        </Form.Item>
        <Form.Item label="??????" name="describe" initialValue={''}>
          <Input.TextArea />
        </Form.Item>
        <Form.Item label="??????" name="enabled" valuePropName="checked">
          <Switch checkedChildren={'??????'} unCheckedChildren={'??????'} defaultChecked />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddModal;
