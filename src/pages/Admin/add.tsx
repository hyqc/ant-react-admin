import { adminUserAdd, RequestAdminUserAddParamsType } from '@/services/apis/admin';
import { SUCCESS } from '@/services/apis/code';
import { Form, Input, message, Modal, Switch, Upload } from 'antd';
import { useEffect, useState } from 'react';
import ImgCrop from 'antd-img-crop';
import { CloudUploadOutlined } from '@ant-design/icons';

export type NoticeModalPropsType = {
  reload?: boolean;
};

export type AdminAddModalPropsType = {
  modalStatus: boolean;
  noticeModal: (data: NoticeModalPropsType) => void;
};

const AdminAddModal: React.FC<AdminAddModalPropsType> = (props) => {
  const [form] = Form.useForm();
  const { modalStatus, noticeModal } = props;
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);

  const rules = {
    name: [{ required: true, message: '请输入管理员名称!' }],
    status: [{ required: true, message: '请设置管理员初始状态!' }],
  };

  function handleOk() {
    setConfirmLoading(true);
    form
      .validateFields()
      .then((values) => {
        adminUserAdd(values)
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

  useEffect(() => {}, []);

  return (
    <Modal
      title="新建管理员"
      width={600}
      destroyOnClose={true}
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
        <Form.Item label="邮箱" name="email" initialValue={''}>
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
        <Form.Item label="头像" name="avatar" initialValue={true}>
          <ImgCrop rotate>
            <Upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture-card"
              onPreview={onPreview}
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

export default AdminAddModal;
