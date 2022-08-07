import { Button, Col, Form, Input, message, Row, Switch } from 'antd';
import { ChangeEvent, useEffect, useState } from 'react';
import 'antd/es/modal/style';
import 'antd/es/slider/style';
import {
  adminMenuAdd,
  adminMenuTree,
  RequestAdminMenuAddParamsType,
  ResponseAdminMenuListItemType,
} from '@/services/apis/admin/menu';
import MenuTreeSelect from './components/MenuTreeSelect';
import { FORM_RULES, makeMenuSpreadTreeData, path2UpperCamelCase } from './components/common';
import { Container, Content } from '@/components/PageListContainer';
import { Gutter } from 'antd/lib/grid/row';
import { history } from 'umi';

const ButtonStyles = { marginRight: '2rem' };
const FormSearchRowGutter: [Gutter, Gutter] = [12, 0];
const FormSearchRowColSpan = 10;

const AddModal: React.FC = () => {
  const [form] = Form.useForm();
  const [menuData, setMenuData] = useState<ResponseAdminMenuListItemType[]>([]);
  const [parentId, setParentId] = useState<number>(0);

  const rules: any = FORM_RULES;

  function handleOk() {
    form
      .validateFields()
      .then((values) => {
        const data: RequestAdminMenuAddParamsType = {
          ...values,
        };
        adminMenuAdd(data).then((res) => {
          message.success(res.message, MessageDuritain, () => {
            form.resetFields();
            handleCancel();
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

  function onChangePath(e: ChangeEvent) {
    form.setFieldsValue({ key: path2UpperCamelCase(form.getFieldValue('path')) });
  }

  useEffect(() => {
    let menuId: any = history.location.query?.menuId;
    menuId = (menuId as number) || 0;
    setParentId(parseInt(menuId));
  });

  useEffect(() => {
    adminMenuTree().then((res) => {
      const { list } = res.data;
      setMenuData(makeMenuSpreadTreeData(list));
    });
  }, []);

  useEffect(() => {
    form.resetFields();
  }, [parentId]);

  return (
    <Container>
      <Content>
        <Form
          form={form}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 12 }}
          labelAlign="right"
          labelWrap
        >
          <Row gutter={FormSearchRowGutter}>
            <Col span={FormSearchRowColSpan}>
              <Form.Item
                label="父级菜单"
                name="parentId"
                initialValue={parentId}
                rules={rules.parentId}
              >
                <MenuTreeSelect data={menuData} disabled={parentId > 0} />
              </Form.Item>
              <Form.Item label="名称" name="name" initialValue={''} rules={rules.name}>
                <Input />
              </Form.Item>
              <Form.Item label="路由" name="path" initialValue={''} rules={rules.path}>
                <Input onChange={onChangePath} />
              </Form.Item>
              <Form.Item label="唯一键名" name="key" initialValue={''} rules={rules.key}>
                <Input />
              </Form.Item>
              <Form.Item label="排序值" name="sort" initialValue={0} rules={rules.sort}>
                <Input min={0} />
              </Form.Item>
              <Form.Item label="图标" name="icon" initialValue={''}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={FormSearchRowColSpan}>
              <Form.Item label="重定向地址" name="redirect" initialValue={'/'}>
                <Input />
              </Form.Item>
              <Form.Item label="描述" name="describe" initialValue={''}>
                <Input.TextArea />
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
              <Form.Item style={{ marginTop: '2rem', marginLeft: '8rem' }}>
                <Button htmlType="submit" type="primary" onClick={handleOk} style={ButtonStyles}>
                  保存
                </Button>
                <Button htmlType="button" type="primary" onClick={handleReset} style={ButtonStyles}>
                  重置
                </Button>
                <Button type="primary" onClick={handleCancel} style={ButtonStyles}>
                  返回
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
