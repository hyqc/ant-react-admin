import { AdminUserPassword } from '@/services/common/pattern';
import { FormInstance } from 'antd';

export const DEFAULT_PAGE_NO = 1;
export const DEFAULT_PAGE_SIZE = 10;

export const AdminUserFormRules = (form: FormInstance<any>): any => {
  return {
    username: [{ required: true, type: 'string', message: '请输入账号名称!' }],
    email: [{ type: 'email', message: '邮箱格式错误!' }],
    password: [
      { required: true, type: 'string', message: '密码不能为空' },
      {
        required: true,
        pattern: AdminUserPassword,
        message: '密码长度6-30位',
      },
    ],
    confirmPassword: [
      { required: true, type: 'string', message: '密码不能为空' },
      {
        required: true,
        pattern: AdminUserPassword,
        message: '密码长度6-30位',
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
};
