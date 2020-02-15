import React from "react";
import Checkbox, { CheckboxProps } from "antd/es/checkbox";
import Form, { FormComponentProps, GetFieldDecoratorOptions } from "antd/es/form/Form";

interface CheckboxItemReceivedProps extends CheckboxProps {
  form: FormComponentProps["form"]
  name: string
  options?: GetFieldDecoratorOptions
  content?: string | React.ReactNode
  append?: string | React.ReactNode
}

type CheckboxItemProps = CheckboxItemReceivedProps;

const CheckboxItem = ({ form, name, options, content, append, ...rest }: CheckboxItemProps) => {
  const { getFieldDecorator } = form;
  return (
    <Form.Item>
      {getFieldDecorator(name, options)(
        <Checkbox {...rest}>{content}</Checkbox>
      )}
      {append}
    </Form.Item>
  );
};

export default CheckboxItem;
