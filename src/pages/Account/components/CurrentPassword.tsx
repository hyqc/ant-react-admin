import { AdminUserFormRules } from '@/pages/Admin/User/common';
import { adminUserEdit, RequestAdminUserEditParamsType } from '@/services/apis/admin/user';
import { Button, Form, Input, message } from 'antd';
import { useEffect } from 'react';
import { useModel } from 'umi';

const CurrentAccountPassword: React.FC = () => {
  const [form] = Form.useForm();
  const { initialState } = useModel('@@initialState');
  const detailData = { ...initialState?.currentUser };
  const styleButton = {
    marginLeft: '3rem',
  };

  const rules: any = AdminUserFormRules(form);

  function handleOk() {
    form
      .validateFields()
      .then((values) => {
        const adminId = detailData.adminId || 0;
        let data: RequestAdminUserEditParamsType;
        data = {
          adminId: adminId,
          passwrod: values.password,
          confirmPassword: values.confirmPassword,
        };
        adminUserEdit(data).then((res) => {
          message.success(res.message, MessageDuritain, () => {});
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  }

  useEffect(() => {
    form.setFieldsValue(detailData);
  }, []);

  return (
    <Form form={form} key="password" labelCol={{ span: 2 }} wrapperCol={{ span: 10 }}>
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
  );
};

export default CurrentAccountPassword;
