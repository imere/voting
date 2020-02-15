import React from "react";
import { Form, Input } from "antd";
import { FormComponentProps } from "antd/es/form";

import { TypeTextArea } from "@/data-types";

import { QItemProps } from "./Q";

export interface QTextAreaReceivedProps extends QItemProps, TypeTextArea {
  form: FormComponentProps["form"]
}

const { TextArea } = Input;

const QTextArea = ({ form, id, label, extra, rules }: QTextAreaReceivedProps) => (
  <Form.Item label={label} extra={extra}>
    {form.getFieldDecorator(id, {
      rules
    })(
      <TextArea autoSize />
    )}
  </Form.Item>
);

export default QTextArea;
