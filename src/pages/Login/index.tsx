import { Button, Card, Checkbox, Form, Input, message } from 'antd';
import React, { useEffect } from 'react';
import { useIntl, history, SelectLang, useModel } from 'umi';
import styles from './index.less';
import { login } from '@/services/apis/admin/account';
import type { RequestLoginParamsType } from '@/services/apis/admin/account';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { SetLoginToken } from '@/utils/common';
import { AdminUserFormRules } from '../Admin/User/common';

const Login: React.FC = () => {
  const [form] = Form.useForm();
  const { setInitialState } = useModel('@@initialState');
  const intl = useIntl();

  const rules: any = AdminUserFormRules(form);

  const handleSubmit = async (values: RequestLoginParamsType) => {
    try {
      const res = await login(values);
      // 设置token
      SetLoginToken(res.data.token, res.data.expire, values.remember || false);
      // 设置菜单
      await setInitialState((s: any) => ({
        ...s,
        currentUser: res.data,
      }));
      /** 此方法会跳转到 redirect 参数所在的位置 */
      if (!history) return;
      const { query } = history.location;
      const { redirect } = query as { redirect: string };
      window.location.href = redirect || '/';
      return;
    } catch (error) {
      console.log(error);
      const defaultLoginFailureMessage = intl.formatMessage({
        id: 'pages.login.failure',
        defaultMessage: '登录失败，请重试！',
      });
      message.error(defaultLoginFailureMessage);
    }
  };

  useEffect(() => {
    form.resetFields();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.lang} data-lang>
        {SelectLang && <SelectLang />}
      </div>
      <div className={styles.login}>
        <Card>
          <Form form={form} name="login" className={styles.loginForm} onFinish={handleSubmit}>
            <Form.Item>
              <p className={styles.title}>
                <img className={styles.logo} src="/favicon.ico" />
                <span>管理后台</span>
              </p>
            </Form.Item>
            <Form.Item name="username" rules={rules.username}>
              <Input
                type="text"
                className={styles.loginInput}
                prefix={<UserOutlined />}
                placeholder="账号"
              />
            </Form.Item>
            <Form.Item name="password" rules={rules.password}>
              <Input.Password
                className={styles.loginInput}
                prefix={<LockOutlined />}
                placeholder="密码"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>自动登录</Checkbox>
              </Form.Item>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className={styles.loginButton}>
                登录
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default Login;
