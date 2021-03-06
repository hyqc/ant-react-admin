import {
  adminPermissionEdit,
  ResponseAdminPermissionDetailType,
} from '@/services/apis/admin/permission';
import { Form, Input, message, Modal, Select, Switch } from 'antd';
import { ChangeEvent, useEffect, useState } from 'react';
import 'antd/es/modal/style';
import 'antd/es/slider/style';
import { DEFAULT_RULES, path2UpperCamelCase } from './components/common';
import PageMenus from './components/PageMenus';
import { ResponseAdminMenuListItemType } from '@/services/apis/admin/menu';

export type NoticeModalPropsType = {
  reload?: boolean;
};

export type EditModalPropsType = {
  pageMenusData: ResponseAdminMenuListItemType[];
  modalStatus: boolean;
  detailData: ResponseAdminPermissionDetailType;
  noticeModal: (data: NoticeModalPropsType) => void;
};

const EditModal: React.FC<EditModalPropsType> = (props) => {
  const [form] = Form.useForm();
  const { pageMenusData, modalStatus, detailData, noticeModal } = props;
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
        adminPermissionEdit(values).then((res) => {
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

  useEffect(() => {
    form.setFieldsValue(detailData);
    if (detailData?.menuId) {
      menuIdChange(detailData.menuId);
    }
  }, [detailData]);

  return (
    <Modal
      forceRender
      title="????????????"
      width={DefaultModalWidth}
      destroyOnClose={true}
      maskClosable={false}
      getContainer={false}
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
        <Form.Item label="??????" name="name" rules={rules.name}>
          <Input />
        </Form.Item>
        <Form.Item label="??????" name="type">
          <Select style={{ offset: 0, width: '160' }}>
            <Select.Option value="view">??????</Select.Option>
            <Select.Option value="edit">??????</Select.Option>
            <Select.Option value="delete">??????</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="??????" name="key" rules={rules.key}>
          <Input onChange={onChangePath} />
        </Form.Item>
        <Form.Item label="??????" name="describe">
          <Input.TextArea />
        </Form.Item>
        <Form.Item label="??????" name="enabled" valuePropName="checked">
          <Switch checkedChildren={'??????'} unCheckedChildren={'??????'} defaultChecked />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditModal;
