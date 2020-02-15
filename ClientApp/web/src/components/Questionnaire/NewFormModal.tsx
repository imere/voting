import React from "react";
import { Form, Input, Modal, Switch } from "antd";
import { FormComponentProps } from "antd/es/form";

interface NewFormModalReceivedProps extends FormComponentProps {
  visible?: boolean
  onCreate: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
  onCancel: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
}

interface NewFormModalOwnProps {
  form: FormComponentProps["form"]
}

type NewFormModalProps =
  NewFormModalReceivedProps &
  NewFormModalOwnProps

const NewFormModal = ({ form, visible, onCancel, onCreate }: NewFormModalProps) => {
  const { getFieldDecorator } = form;
  return (
    <Modal
      visible={visible}
      title="创建新问卷"
      okText="创建"
      onOk={onCreate}
      onCancel={onCancel}
    >
      <Form layout="vertical">
        <Form.Item label="Title">
          {getFieldDecorator("title", {
            rules: [{ required: true, message: "Please input the title of collection!" }],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Description">
          {getFieldDecorator("description")(<Input type="textarea" />)}
        </Form.Item>
        <Form.Item label="Public">
          {getFieldDecorator("public", {
            valuePropName: "checked",
            initialValue: false,
          })(
            <Switch />
          )}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Form.create<NewFormModalReceivedProps>({
  name: "new_form_modal"
})(
  React.forwardRef(NewFormModal)
);
