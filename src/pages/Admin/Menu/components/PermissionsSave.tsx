import { Form, Input, message, Modal, Space, Switch } from 'antd';
import { useEffect, useState } from 'react';
import 'antd/es/modal/style';
import 'antd/es/slider/style';
import {
  adminAddMenuPermission,
  RequestAdminPermissionAddForMenuParamsType,
  ResponseAdminMenuPermissionsItemType,
} from '@/services/apis/admin/permission';
import { PERMIDDION_RULES } from '../../Permission/components/common';
import { ResponseAdminMenuPermissionsType } from '@/services/apis/admin/menu';

export type NoticeModalPropsType = {
  reload?: boolean;
};

export type AddModalPropsType = {
  detailData: ResponseAdminMenuPermissionsType;
  modalStatus: boolean;
  noticeModal: (data: NoticeModalPropsType) => void;
};

const AddPermissionsModal: React.FC<AddModalPropsType> = (props) => {
  const [form] = Form.useForm();
  const { detailData, modalStatus, noticeModal } = props;
  const { menu, permissions } = detailData;
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const [savePermissions] = useState<ResponseAdminMenuPermissionsItemType[]>(permissions);
  const rules = PERMIDDION_RULES;

  function handleOk() {
    setConfirmLoading(true);
    form
      .validateFields()
      .then((values) => {
        const data: RequestAdminPermissionAddForMenuParamsType = {
          menuId: detailData.menu.id,
          permission: handleFormValues(values),
        };
        adminAddMenuPermission(data).then((res) => {
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

  function handleFormValues(values: any) {
    return permissions.map((item: ResponseAdminMenuPermissionsItemType, index: number) => {
      let tmp: ResponseAdminMenuPermissionsItemType = { ...item };
      tmp.name = values[`name[${index}]`];
      tmp.key = values[`key[${index}]`];
      tmp.enabled = values[`enabled[${index}]`];
      return tmp;
    });
  }

  function handleCancel() {
    form.resetFields();
    noticeModal({ reload: false });
  }

  useEffect(() => {
    console.log(form, '+++++++++');
  }, [form]);

  return (
    <Modal
      forceRender
      title="????????????????????????"
      width={900}
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
      <Form form={form} labelCol={{ span: 3 }} wrapperCol={{ span: 20 }}>
        <Form.Item label="??????">
          <Input disabled value={menu?.name} style={{ width: 260 }} />
        </Form.Item>
        <Form.Item label="??????">
          {savePermissions.map((item, index) => {
            return (
              <Form.Item label={item.typeText} name={index} key={index}>
                <Space>
                  <Form.Item
                    label="??????"
                    name={`name[${index}]`}
                    rules={rules.view.name}
                    initialValue={item.name}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="?????????"
                    name={`key[${index}]`}
                    rules={rules.view.key}
                    initialValue={item.key}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="??????"
                    name={`enabled[${index}]`}
                    initialValue={item.enabled}
                    valuePropName="checked"
                  >
                    <Switch
                      checkedChildren={'??????'}
                      unCheckedChildren={'??????'}
                      defaultChecked={item.enabled}
                    />
                  </Form.Item>
                </Space>
              </Form.Item>
            );
          })}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddPermissionsModal;
