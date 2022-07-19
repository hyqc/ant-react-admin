import { Settings as LayoutSettings } from '@ant-design/pro-layout';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  // 拂晓蓝
  primaryColor: '#1890ff',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: '管理后台',
  pwa: false,
  logo: '/9d8e8a2487205a32c402584efe583012.ico',
  iconfontUrl: '',
};

export default Settings;
