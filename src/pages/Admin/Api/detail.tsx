import { ResponseAdminAPIDetailType } from '@/services/apis/admin/resource';
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
  detailData: ResponseAdminAPIDetailType;
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
      title="接口详情"
      footer={null}
      width={DefaultDrawerWidth}
      destroyOnClose={true}
      getContainer={false}
      visible={modalStatus}
      onClose={onClose}
    >
      <Form form={form} labelAlign="left" labelCol={{ span: 4 }} wrapperCol={{ span: 12 }}>
        <Form.Item label="ID" name="apiId">
          <Input disabled style={inputStyle} />
        </Form.Item>
        <Form.Item label="名称" name="name">
          <Input disabled style={inputStyle} />
        </Form.Item>
        <Form.Item label="路由" name="path">
          <Input disabled style={inputStyle} />
        </Form.Item>
        <Form.Item label="键名" name="key">
          <Input disabled style={inputStyle} />
        </Form.Item>
        <Form.Item label="描述" name="describe">
          <Input.TextArea disabled style={inputStyle} />
        </Form.Item>
        <Form.Item label="创建时间" name="createTime">
          <Input.TextArea disabled style={inputStyle} />
        </Form.Item>
        <Form.Item label="更新时间" name="modifyTime">
          <Input.TextArea disabled style={inputStyle} />
        </Form.Item>
        <Form.Item label="状态" name="enabled" valuePropName="checked">
          <Switch disabled style={inputStyle} checkedChildren={'启用'} unCheckedChildren={'禁用'} />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default DetailModal;
