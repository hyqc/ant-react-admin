import { Button, Card, Checkbox, Form, Input, message } from 'antd';
import React from 'react';
import { useIntl, history, SelectLang, useModel } from 'umi';
import styles from './index.less';
import { login } from '@/services/apis/admin/account';
import type { RequestLoginParamsType } from '@/services/apis/admin/account';
import { AdminUserPassword } from '@/services/common/pattern';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { MenuDataItem } from '@umijs/route-utils';

const Login: React.FC = () => {
  const { setInitialState } = useModel('@@initialState');
  const intl = useIntl();

  const rules: any = {
    username: [{ required: true, type: 'string', message: '请输入用户名!' }],
    password: [
      { required: true, type: 'string', message: '密码不能为空' },
      {
        required: true,
        pattern: AdminUserPassword,
        message: '',
      },
    ],
  };

  const handleSubmit = async (values: RequestLoginParamsType) => {
    try {
      const res = await login(values);
      // 设置token
      localStorage.setItem('token', res.data.token);
      await setInitialState((s: any) => ({
        ...s,
        currentUser: res.data,
      }));
      /** 此方法会跳转到 redirect 参数所在的位置 */
      if (!history) return;
      const { query } = history.location;
      const { redirect } = query as { redirect: string };
      history.push(redirect || '/');
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

  return (
    <div className={styles.container}>
      <div className={styles.lang} data-lang>
        {SelectLang && <SelectLang />}
      </div>
      <div className={styles.login}>
        <Card>
          <Form
            name="login"
            className={styles.loginForm}
            initialValues={{ remember: true }}
            onFinish={handleSubmit}
          >
            <Form.Item>
              <p className={styles.title}>
                <img className={styles.logo} src="/9d8e8a2487205a32c402584efe583012.ico" />
                <span>管理后台</span>
              </p>
            </Form.Item>
            <Form.Item name="username" rules={rules.username}>
              <Input className={styles.loginInput} prefix={<UserOutlined />} placeholder="账号" />
            </Form.Item>
            <Form.Item name="password" rules={rules.password}>
              <Input
                className={styles.loginInput}
                prefix={<LockOutlined />}
                type="password"
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

/**
 * 菜单数据平铺
 */
export function menusListData2Map(menus: MenuDataItem[]) {
  let result = {};
  menus.forEach((item: MenuDataItem) => {
    if (item.key) {
      result[item.key] = item;
    }
  });
  return result;
}

export default Login;
