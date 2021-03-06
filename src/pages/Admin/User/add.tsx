import { adminUserAdd, RequestAdminUserAddParamsType } from '@/services/apis/admin/user';
import { APIAccount } from '@/services/apis/admin/api';
import { Form, Input, message, Modal, Switch, Upload } from 'antd';
import { useState } from 'react';
import { CloudUploadOutlined } from '@ant-design/icons';
import 'antd/es/modal/style';
import 'antd/es/slider/style';
import ImgCrop from 'antd-img-crop';
import { AdminUserFormRules } from './common';

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
  const [fileList, setFielList] = useState<any[]>([]);
  const [avatar, setAvatar] = useState<string>('');
  const rules = AdminUserFormRules(form);

  function handleOk() {
    setConfirmLoading(true);
    form
      .validateFields()
      .then((values) => {
        const data: RequestAdminUserAddParamsType = {
          ...values,
          avatar,
        };
        adminUserAdd(data).then((res) => {
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

  function uploadOnChange(data: any) {
    if (data && data.fileList && data.fileList[0]?.response) {
      setAvatar(data.fileList[0]?.response?.data?.url || '');
    }
    setFielList(data.fileList);
  }

  async function onPreview(file: any) {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  }

  return (
    <Modal
      forceRender
      title="???????????????"
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
        <Form.Item label="??????" name="username" initialValue={''} rules={rules.username}>
          <Input />
        </Form.Item>
        <Form.Item label="??????" name="nickname" initialValue={''}>
          <Input />
        </Form.Item>
        <Form.Item label="??????" name="password" initialValue={''} rules={rules.password}>
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="????????????"
          name="confirmPassword"
          initialValue={''}
          dependencies={['password']}
          rules={rules.confirmPassword}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item label="??????" name="email" initialValue={''} rules={rules.email}>
          <Input />
        </Form.Item>
        <Form.Item label="??????" name="enabled" valuePropName="checked">
          <Switch checkedChildren={'??????'} unCheckedChildren={'??????'} />
        </Form.Item>
        <Form.Item label="??????" name="avatar" initialValue={''}>
          <ImgCrop rotate>
            <Upload
              maxCount={1}
              accept={UploadImageAccept}
              action={`${BaseAPI}${APIAccount.upload.url}`}
              fileList={fileList}
              listType="picture-card"
              onPreview={onPreview}
              onChange={uploadOnChange}
            >
              <CloudUploadOutlined />
              ????????????
            </Upload>
          </ImgCrop>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddModal;
