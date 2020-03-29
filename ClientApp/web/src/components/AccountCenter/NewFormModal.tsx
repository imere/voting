import React from 'react';
import { Form, Input, Modal, Switch } from 'antd';
import { Store } from 'rc-field-form/es/interface';

import { descriptionRules, titleRules } from '@/shared/validate';

interface NewFormModalReceivedProps {
  visible?: boolean
  onCreate: (e: Store) => void
  onCancel: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
}

type NewFormModalProps = NewFormModalReceivedProps

const NewFormModal = ({ visible, onCancel, onCreate }: NewFormModalProps) => {
  const [form] = Form.useForm();

  return (
    <Modal
      visible={visible}
      title="创建问卷"
      okText="创建"
      cancelText="取消"
      onCancel={onCancel}
      onOk={() => {
        form.
          validateFields().
          then((values) => {
            form.resetFields();
            onCreate(values);
          }).
          catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="new_form"
      >
        <Form.Item
          label="Title"
          name="title"
          rules={titleRules}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={descriptionRules}
        >
          <Input type="textarea" />
        </Form.Item>
        <Form.Item
          label="Public"
          name="pub"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default NewFormModal;
