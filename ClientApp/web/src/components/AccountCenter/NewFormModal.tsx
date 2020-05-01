import React from 'react';
import { Form, Input, Modal, Switch, DatePicker } from 'antd';
import { Store } from 'rc-field-form/es/interface';

import { descriptionRules, titleRules } from '@/shared/validate';
import { Logger } from '@/framework/shared/logger';

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
            Logger.warn('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="new_form"
      >
        <Form.Item
          label="标题"
          name="title"
          rules={titleRules}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="描述"
          name="description"
          rules={descriptionRules}
        >
          <Input type="textarea" />
        </Form.Item>
        <Form.Item
          label="公开"
          name="pub"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
        <Form.Item
          label="截至时间"
          name="expiresAt"
        >
          <DatePicker showTime />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default NewFormModal;
