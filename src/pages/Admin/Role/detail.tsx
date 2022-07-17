import { ResponseAdminRoleDetailType } from '@/services/apis/admin/role';
import { Drawer, Form, Input, Switch } from 'antd';
import { useEffect } from 'react';
import 'antd/es/modal/style';
import 'antd/es/slider/style';
import { INPUT_STYLE } from '@/services/apis/config';

export type NoticeModalPropsType = {
  reload?: boolean;
};

export type DetailModalPropsType = {
  modalStatus: boolean;
  detailData: ResponseAdminRoleDetailType;
  noticeModal: (data: NoticeModalPropsType) => void;
};
const inputStyle = INPUT_STYLE;

const DetailModal: React.FC<DetailModalPropsType> = (props) => {
  const [form] = Form.useForm();
  const { modalStatus, detailData, noticeModal } = props;

  function onClose() {
    noticeModal({ reload: false });
  }

  useEffect(() => {
    form.setFieldsValue(detailData);
  });

  return (
    <Drawer
      forceRender
      title="角色详情"
      footer={null}
      width={DefaultDrawerWidth}
      destroyOnClose={true}
      getContainer={false}
      visible={modalStatus}
      onClose={onClose}
    >
      <Form form={form} labelCol={{ span: 6 }} wrapperCol={{ span: 12 }}>
        <Form.Item label="名称" name="roleName">
          <Input disabled style={inputStyle} />
        </Form.Item>
        <Form.Item label="状态" name="enabled" valuePropName="checked">
          <Switch disabled checkedChildren={'启用'} unCheckedChildren={'禁用'} />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default DetailModal;
