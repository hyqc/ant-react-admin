import { Button, Col, Form, Input, message, Row, Switch } from 'antd';
import { useEffect } from 'react';
import 'antd/es/modal/style';
import 'antd/es/slider/style';
import {
  adminMenuAdd,
  RequestAdminMenuAddParamsType,
  ResponseAdminMenuListItemType,
} from '@/services/apis/admin/menu';
import MenuTreeSelect from './components/MenuTreeSelect';
import { Container, Content } from '@/components/PageListContainer';
import { Gutter } from 'antd/lib/grid/row';
import { history } from 'umi';

export type NoticeModalPropsType = {
  reload?: boolean;
};

export type AddModalPropsType = {
  modalStatus: boolean;
  parentId?: number;
  menuTreeData: ResponseAdminMenuListItemType[];
  noticeModal: (data: NoticeModalPropsType) => void;
};

const FormSearchRowGutter: [Gutter, Gutter] = [12, 0];
const FormSearchRowColSpan = 10;

const AddModal: React.FC<AddModalPropsType> = (props) => {
  const [form] = Form.useForm();
  const { parentId, menuTreeData, noticeModal } = props;
  const rules: any = {
    name: [{ required: true, type: 'string', message: '请输入菜单名称!' }],
    path: [{ required: true, type: 'string', message: '请输入菜单路由!' }],
    key: [{ required: true, type: 'string', message: '请输入菜单键名!' }],
  };

  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  function handleOk() {
    form
      .validateFields()
      .then((values) => {
        const data: RequestAdminMenuAddParamsType = {
          ...values,
        };
        adminMenuAdd(data).then((res) => {
          message.success(res.message, MessageDuritain, () => {
            noticeModal({ reload: true });
            form.resetFields();
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCancel() {
    history.goBack();
  }

  function handleReset() {
    form.resetFields();
  }

  useEffect(() => {
    form.resetFields();
  }, [parentId]);

  return (
    <Container>
      <Content>
        <Form
          form={form}
          labelCol={{ span: 12 }}
          wrapperCol={{ span: 12 }}
          labelAlign="left"
          labelWrap
          layout="vertical"
        >
          <Row gutter={FormSearchRowGutter}>
            <Col span={FormSearchRowColSpan}>
              <Form.Item label="父级菜单" name="parentId" initialValue={parentId || 0} hasFeedback>
                <MenuTreeSelect
                  data={menuTreeData}
                  disabled={parentId !== undefined && parentId > 0}
                />
              </Form.Item>
              <Form.Item label="名称" name="name" initialValue={''} hasFeedback rules={rules.name}>
                <Input />
              </Form.Item>
              <Form.Item label="路由" name="path" initialValue={''} hasFeedback rules={rules.path}>
                <Input />
              </Form.Item>
              <Form.Item label="键名" name="key" initialValue={''} hasFeedback rules={rules.key}>
                <Input />
              </Form.Item>
              <Form.Item label="图标" name="icon" initialValue={''} hasFeedback>
                <Input />
              </Form.Item>
              <Form.Item label="重定向地址" name="redirect" initialValue={'/'} hasFeedback>
                <Input />
              </Form.Item>
            </Col>
            <Col span={FormSearchRowColSpan}>
              <Form.Item label="描述" name="describe" initialValue={''} hasFeedback>
                <Input.TextArea />
              </Form.Item>
              <Form.Item label="排序值" name="sort" initialValue={0} hasFeedback>
                <Input min={0} />
              </Form.Item>
              <Form.Item label="菜单中隐藏" name="hideInMenu" valuePropName="checked">
                <Switch checkedChildren={'隐藏'} unCheckedChildren={'显示'} />
              </Form.Item>
              <Form.Item label="隐藏子菜单" name="hideChildrenInMenu" valuePropName="checked">
                <Switch checkedChildren={'隐藏'} unCheckedChildren={'显示'} />
              </Form.Item>
              <Form.Item label="状态" name="enabled" valuePropName="checked">
                <Switch checkedChildren={'启用'} unCheckedChildren={'禁用'} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[12, 24]}>
            <Col span={24}>
              <Form.Item {...tailLayout} style={{ marginTop: '2rem' }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={handleCancel}
                  style={{ marginLeft: '2rem' }}
                >
                  取消
                </Button>
                <Button htmlType="button" onClick={handleReset} style={{ marginLeft: '2rem' }}>
                  重置
                </Button>
                <Button
                  htmlType="submit"
                  type="primary"
                  danger
                  onClick={handleOk}
                  style={{ marginLeft: '2rem' }}
                >
                  保存
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Content>
    </Container>
  );
};

export default AddModal;
