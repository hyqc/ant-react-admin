import {
  adminPermissionBindApi,
  RequestAdminPermissionBindApiParamsType,
  ResponseAdminPermissionDetailType,
} from '@/services/apis/admin/permission';
import { SUCCESS } from '@/services/apis/code';
import { Form, Input, message, Modal, Select } from 'antd';
import { useEffect, useState } from 'react';
import 'antd/es/modal/style';
import 'antd/es/slider/style';
import { adminAPIAll, ResponseAdminAPIAllItemType } from '@/services/apis/admin/resource';

export type NoticeModalPropsType = {
  reload?: boolean;
};

export type BindModalPropsType = {
  modalStatus: boolean;
  detailData: ResponseAdminPermissionDetailType;
  noticeModal: (data: NoticeModalPropsType) => void;
};

const BindModal: React.FC<BindModalPropsType> = (props) => {
  const [form] = Form.useForm();
  const { modalStatus, detailData, noticeModal } = props;
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const [apiOptions, setAPIOptions] = useState<ResponseAdminAPIAllItemType[]>([]);

  const apiIdsValue: number[] =
    detailData?.apis.map((item: ResponseAdminAPIAllItemType) => {
      return item.apiId;
    }) || [];

  function handleOk() {
    setConfirmLoading(true);
    form
      .validateFields()
      .then((values) => {
        const data: RequestAdminPermissionBindApiParamsType = {
          permissionId: detailData.id,
          apiIds: values.apiIds || [],
        };
        adminPermissionBindApi(data)
          .then((res) => {
            message.destroy();
            message.success(res.message, MessageDuritain, () => {
              noticeModal({ reload: true });
            });
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

  function fetchAdminAPIs() {
    adminAPIAll().then((res) => {
      setAPIOptions(res.data || []);
    });
  }

  useEffect(() => {
    form.resetFields();
    if (detailData && detailData.name) {
      fetchAdminAPIs();
      form.setFieldsValue({ name: detailData?.name, apiIds: apiIdsValue });
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
        <Form.Item label="??????" name="name">
          <Input disabled />
        </Form.Item>
        <Form.Item label="??????" name="apiIds">
          <Select
            showSearch
            mode={'multiple'}
            filterOption={(input, option) => {
              return (option!.children as unknown as string)
                .toLowerCase()
                .includes(input.toLowerCase());
            }}
          >
            {apiOptions?.map((item) => {
              return (
                <Select.Option key={item.apiId} value={item.apiId}>
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

export default BindModal;
