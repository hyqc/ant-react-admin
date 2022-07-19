import {
  adminUserAssignRoles,
  RequestAdminUserAssignRolesParamsType,
  ResponseAdminUserDetailType,
} from '@/services/apis/admin/user';
import { SUCCESS } from '@/services/apis/code';
import { Form, Input, message, Modal, Select } from 'antd';
import { useEffect, useState } from 'react';
import 'antd/es/modal/style';
import 'antd/es/slider/style';
import { adminRoleAll, ResponseAdminRoleAllItemType } from '@/services/apis/admin/role';
import { ResponseAdminUserListItemRolesItemType } from '@/services/apis/admin/user';

export type NoticeModalPropsType = {
  reload?: boolean;
};

export type BindModalPropsType = {
  modalStatus: boolean;
  detailData: ResponseAdminUserDetailType;
  noticeModal: (data: NoticeModalPropsType) => void;
};

const BindModal: React.FC<BindModalPropsType> = (props) => {
  const [form] = Form.useForm();
  const { modalStatus, detailData, noticeModal } = props;
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const [roleOptions, setRoleOptions] = useState<ResponseAdminRoleAllItemType[]>([]);

  const roleIdsValue: number[] =
    detailData?.roles.map((item: ResponseAdminUserListItemRolesItemType) => {
      return item.roleId;
    }) || [];

  function handleOk() {
    setConfirmLoading(true);
    form
      .validateFields()
      .then((values) => {
        const data: RequestAdminUserAssignRolesParamsType = {
          adminId: detailData.adminId,
          roleIds: values.roleIds || [],
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

  function fetchAdminRoles(roleName?: string) {
    adminRoleAll({ roleName }).then((res) => {
      if (res.code === SUCCESS) {
        setRoleOptions(res.data || []);
      }
    });
  }

  useEffect(() => {
    form.resetFields();
    if (detailData && detailData.username) {
      fetchAdminRoles();
      form.setFieldsValue({ username: detailData?.username, roleIds: roleIdsValue });
    }
    return () => {};
  }, [detailData]);

  return (
    <Modal
      forceRender
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
        <Form.Item label="名称" name="username">
          <Input disabled />
        </Form.Item>
        <Form.Item label="角色" name="roleIds">
          <Select
            
            showSearch
            maxTagCount={3}
            mode={'multiple'}
            filterOption={(input, option) => {
              return (option!.children as unknown as string)
                .toLowerCase()
                .includes(input.toLowerCase());
            }}
          >
            {roleOptions?.map((item) => {
              return (
                <Select.Option key={item.roleId} value={item.roleId}>
                  {item.roleName}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default BindModal;
