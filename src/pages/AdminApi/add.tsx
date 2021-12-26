import { adminUserAdd, RequestAdminUserAddParamsType } from '@/services/apis/admin';
import { APIBase } from '@/services/apis/api';
import { SUCCESS } from '@/services/apis/code';
import { Form, Input, message, Modal, Switch, Upload } from 'antd';
import { useEffect, useState } from 'react';
import ImgCrop from 'antd-img-crop';
import { CloudUploadOutlined } from '@ant-design/icons';
import 'antd/es/modal/style';
import 'antd/es/slider/style';

export type NoticeModalPropsType = {
  reload?: boolean;
};

export type AdminUserAddModalPropsType = {
  modalStatus: boolean;
  noticeModal: (data: NoticeModalPropsType) => void;
};

const AdminUserAddModal: React.FC<AdminUserAddModalPropsType> = (props) => {
  const [form] = Form.useForm();
  const { modalStatus, noticeModal } = props;
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const [fileList, setFielList] = useState<any[]>([]);
  const [avatar, setAvatar] = useState<string>('');

  const rules = {
    name: [{ required: true, message: '请输入管理员名称!' }],
    email: [{ type: 'email', message: '邮箱格式错误!' }],
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
        adminUserAdd(data)
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
    return () => {};
  }, []);

  return (
    <Modal
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
        <Form.Item label="名称" name="name" initialValue={''} rules={rules.name}>
          <Input allowClear />
        </Form.Item>
        <Form.Item label="昵称" name="nick_name" initialValue={''}>
          <Input allowClear />
        </Form.Item>
        <Form.Item label="邮箱" name="email" initialValue={''} rules={rules.email}>
          <Input allowClear />
        </Form.Item>
        <Form.Item label="状态" name="status" initialValue={true}>
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
              action={`${BaseAPI}${APIBase.upload.url}`}
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

export default AdminUserAddModal;
