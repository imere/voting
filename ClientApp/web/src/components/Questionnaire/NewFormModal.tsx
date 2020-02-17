import React from "react";
import { Form, Input, Modal, Switch } from "antd";
import { Store } from "rc-field-form/lib/interface";

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
      title="Create a new collection"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form.
          validateFields().
          then((values) => {
            form.resetFields();
            onCreate(values);
          }).
          catch((info) => {
            console.log("Validate Failed:", info);
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
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
        >
          <Input type="textarea" />
        </Form.Item>
        <Form.Item label="Public" name="public">
          <Switch />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default React.forwardRef(NewFormModal);
