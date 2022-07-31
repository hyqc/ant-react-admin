import React, { useEffect, useState } from 'react';
import { Container, Content } from '@/components/PageListContainer';
import { Form, Input, Button, Upload, message, Tabs } from 'antd';
import ImgCrop from 'antd-img-crop';
import { CloudUploadOutlined } from '@ant-design/icons';
import { APIAccount } from '@/services/apis/admin/api';
import { adminUserEdit, RequestAdminUserEditParamsType } from '@/services/apis/admin/user';
import { AdminUserPassword } from '@/services/common/pattern';
import { useModel } from 'umi';
import { FormInstance } from 'rc-field-form';

const Demo: React.FC = () => {
  const [formCenter] = Form.useForm();
  const [formPassword] = Form.useForm();
  const { initialState, setInitialState } = useModel('@@initialState');
  const detailData = { ...initialState?.currentUser };

  const [fileList, setFielList] = useState<any[]>();
  const [avatar, setAvatar] = useState<string>(detailData.avatar || '');
  const [tabKey, setTabKey] = useState<string>('center');

  const styleButton = {
    marginLeft: '5.6rem',
  };

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
          if (formPassword.getFieldValue('password') !== value) {
            return Promise.reject(new Error('两次输入的密码不一致'));
          }
          return Promise.resolve();
        },
      },
    ],
  };

  function handleOk() {
    const form = tabKey === 'center' ? formCenter : formPassword;
    form
      .validateFields()
      .then((values) => {
        const adminId = detailData.adminId || 0;
        let data: RequestAdminUserEditParamsType;
        if (tabKey === 'center') {
          data = {
            adminId: adminId,
            nickname: values.nickname,
            email: values.email,
            avatar,
          };
        } else {
          data = {
            adminId: adminId,
            passwrod: values.password,
            confirmPassword: values.confirmPassword,
          };
        }
        adminUserEdit(data).then((res) => {
          message.success(res.message, MessageDuritain, () => {});
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
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

  function tabChange(key: string) {
    setTabKey(key);
  }

  useEffect(() => {
    formCenter.setFieldsValue(detailData);
    formPassword.setFieldsValue(detailData);
    if (detailData && detailData.avatar) {
      setFielList([
        {
          adminId: -1,
          nickname: detailData.nickname,
          url: detailData.avatar,
          enabled: detailData.enabled,
        },
      ]);
    }
  }, []);

  return (
    <Container>
      <Content>
        <Tabs tabPosition="left" onChange={tabChange}>
          <Tabs.TabPane tab="个人信息" key="center" forceRender>
            <Form form={formCenter} key="center" labelCol={{ span: 2 }} wrapperCol={{ span: 8 }}>
              <Form.Item label="名称" name="username" rules={rules.username}>
                <Input disabled />
              </Form.Item>
              <Form.Item label="昵称" name="nickname" rules={rules.nickname}>
                <Input />
              </Form.Item>
              <Form.Item label="邮箱" name="email" rules={rules.email}>
                <Input />
              </Form.Item>
              <Form.Item label="头像" name="avatar" initialValue={true}>
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
              <Form.Item>
                <Button style={styleButton} htmlType="submit" type="primary" onClick={handleOk}>
                  保存
                </Button>
              </Form.Item>
            </Form>
          </Tabs.TabPane>
          <Tabs.TabPane tab="修改密码" key="password" forceRender>
            <Form
              form={formPassword}
              key="password"
              labelCol={{ span: 2 }}
              wrapperCol={{ span: 8 }}
            >
              <Form.Item label="名称" name="username">
                <Input disabled />
              </Form.Item>
              <Form.Item label="密码" name="password" initialValue={''} rules={rules.password}>
                <Input.Password />
              </Form.Item>
              <Form.Item
                label="确认密码"
                name="confirmPassword"
                initialValue={''}
                dependencies={['password']}
                rules={rules.confirmPassword}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item>
                <Button style={styleButton} htmlType="submit" type="primary" onClick={handleOk}>
                  保存
                </Button>
              </Form.Item>
            </Form>
          </Tabs.TabPane>
        </Tabs>
      </Content>
    </Container>
  );
};

export default Demo;
