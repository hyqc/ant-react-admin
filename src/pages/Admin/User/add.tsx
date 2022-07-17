import { adminUserAdd, RequestAdminUserAddParamsType } from '@/services/apis/admin/user';
import { APIAccount } from '@/services/apis/admin/api';
import { Form, Input, message, Modal, Switch, Upload } from 'antd';
import { useEffect, useState } from 'react';
import { CloudUploadOutlined } from '@ant-design/icons';
import 'antd/es/modal/style';
import 'antd/es/slider/style';
import { AdminUserPassword } from '@/services/common/pattern';
import ImgCrop from 'antd-img-crop';

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
  const rules: any = {
    username: [{ required: true, type: 'string', message: '请输入管理员名称!' }],
    email: [{ type: 'email', message: '邮箱格式错误!' }],
    password: [
      { required: true, type: 'string', message: '密码不能为空' },
      {
        required: true,
        pattern: AdminUserPassword,
        message: '',
      },
    ],
    confirmPassword: [
      { required: true, type: 'string', message: '密码不能为空' },
      {
        required: true,
        pattern: AdminUserPassword,
        message: '',
      },
      {
        required: true,
        validator: (rule: any, value: string) => {
          if (form.getFieldValue('password') !== value) {
            return Promise.reject(new Error('两次输入的密码不一致'));
          }
          return Promise.resolve();
        },
      },
    ],
  };

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

  useEffect(() => {
    return () => {
      form.resetFields();
    };
  });

  return (
    <Modal
      forceRender
      title="新建管理员"
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
        <Form.Item
          label="名称"
          name="username"
          initialValue={''}
          hasFeedback
          rules={rules.username}
        >
          <Input allowClear />
        </Form.Item>
        <Form.Item label="昵称" name="nickname" initialValue={''} hasFeedback>
          <Input allowClear />
        </Form.Item>
        <Form.Item
          label="密码"
          name="password"
          initialValue={''}
          rules={rules.password}
          hasFeedback
        >
          <Input.Password allowClear />
        </Form.Item>
        <Form.Item
          label="确认密码"
          name="confirmPassword"
          initialValue={''}
          dependencies={['password']}
          hasFeedback
          rules={rules.confirmPassword}
        >
          <Input.Password allowClear />
        </Form.Item>
        <Form.Item label="邮箱" name="email" initialValue={''} rules={rules.email} hasFeedback>
          <Input allowClear />
        </Form.Item>
        <Form.Item label="状态" name="enabled" initialValue={true}>
          <Switch
            checkedChildren={'启用'}
            unCheckedChildren={'禁用'}
            defaultChecked={true}
            checked
          />
        </Form.Item>
        <Form.Item label="头像" name="avatar" initialValue={''}>
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
              上传头像
            </Upload>
          </ImgCrop>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddModal;
