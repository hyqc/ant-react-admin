import {
  adminUserEdit,
  RequestAdminUserEditParamsType,
  ResponseAdminUserDetailType,
} from '@/services/apis/admin';
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

export type AdminUserEditModalPropsType = {
  modalStatus: boolean;
  detailData: ResponseAdminUserDetailType;
  noticeModal: (data: NoticeModalPropsType) => void;
};

const AdminUserEditModal: React.FC<AdminUserEditModalPropsType> = (props) => {
  const [form] = Form.useForm();
  const { modalStatus, detailData, noticeModal } = props;
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const [fileList, setFielList] = useState<any[]>();
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
        const data: RequestAdminUserEditParamsType = {
          ...values,
          avatar,
        };
        adminUserEdit(data)
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
    setFielList(data.fileList || []);
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
    form.resetFields();
    form.setFieldsValue(detailData);
    if (detailData && detailData.avatar) {
      setFielList([
        {
          uid: '-1',
          name: detailData.name,
          url: detailData.avatar,
          status: 'done',
        },
      ]);
    }
    return () => {};
  }, [detailData]);

  return (
    <Modal
      title="编辑管理员"
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
        <Form.Item label="名称" name="name" rules={rules.name}>
          <Input allowClear />
        </Form.Item>
        <Form.Item label="昵称" name="nick_name">
          <Input allowClear />
        </Form.Item>
        <Form.Item label="邮箱" name="email" rules={rules.email}>
          <Input allowClear />
        </Form.Item>
        <Form.Item label="状态" name="status">
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

export default AdminUserEditModal;
