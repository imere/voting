import React from "react";
import Form, { FormComponentProps, GetFieldDecoratorOptions } from "antd/es/form/Form";
import { Input } from "antd";
import { InputProps } from "antd/es/input";
import { ValidateStatus } from "@/types";

interface InputItemReceivedProps extends Omit<InputProps, "form"> {
  form: FormComponentProps["form"]
  name: string
  options?: GetFieldDecoratorOptions
  help?: React.ReactNode
  validateStatus?: ValidateStatus
}

type InputItemProps = InputItemReceivedProps;

const InputItem = ({ form, name, options, help, validateStatus, ...rest }: InputItemProps) => {
  const { getFieldDecorator } = form;
  return (
    <Form.Item help={help} validateStatus={validateStatus}>
      {getFieldDecorator(name, options)(
        <Input {...rest} />,
      )}
    </Form.Item>
  );
};

export default InputItem;
