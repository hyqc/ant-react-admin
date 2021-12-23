import {
  adminUserAssignRoles,
  RequestAdminUserAssignRolesParamsType,
  ResponseAdminUserInfoType,
} from '@/services/apis/admin';
import { SUCCESS } from '@/services/apis/code';
import { Form, Input, message, Modal, Select } from 'antd';
import { useEffect, useState } from 'react';
import 'antd/es/modal/style';
import 'antd/es/slider/style';
import { adminRolesAll, ResponseAdminRolesAllItemType } from '@/services/apis/role';

export type NoticeModalPropsType = {
  reload?: boolean;
};

export type AdminAssignRolesModalPropsType = {
  modalStatus: boolean;
  detailData: ResponseAdminUserInfoType;
  noticeModal: (data: NoticeModalPropsType) => void;
};

const AdminAssignRolesModal: React.FC<AdminAssignRolesModalPropsType> = (props) => {
  const [form] = Form.useForm();
  const { modalStatus, detailData, noticeModal } = props;
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const [roleOptions, setRoleOptions] = useState<ResponseAdminRolesAllItemType[]>([]);

  const roleIdsValue: number[] =
    detailData?.roles.map((item) => {
      return item.id;
    }) || [];

  function handleOk() {
    setConfirmLoading(true);
    form
      .validateFields()
      .then((values) => {
        const data: RequestAdminUserAssignRolesParamsType = {
          id: detailData.id,
          role_ids: values.role_ids?.join(',') || [],
        };
        adminUserAssignRoles(data)
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
      .finally(() => {
        setConfirmLoading(false);
      });
  }

  function handleCancel() {
    noticeModal({ reload: false });
  }

  function fetchAdminRoles(name?: string) {
    adminRolesAll({ name }).then((res) => {
      if (res.code === SUCCESS) {
        setRoleOptions(res.data || []);
      }
    });
  }

  useEffect(() => {
    fetchAdminRoles();
    form.resetFields();
    if (detailData && detailData.name) {
      form.setFieldsValue({ name: detailData?.name, role_ids: roleIdsValue });
    }
    return () => {};
  }, [detailData]);

  return (
    <Modal
      title="分配角色"
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
        <Form.Item label="名称" name="name">
          <Input disabled />
        </Form.Item>
        <Form.Item label="角色" name="role_ids">
          <Select
            allowClear
            showSearch
            maxTagCount={3}
            mode={'multiple'}
            filterOption={false}
            onSearch={fetchAdminRoles}
          >
            {roleOptions?.map((item) => {
              return (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AdminAssignRolesModal;
