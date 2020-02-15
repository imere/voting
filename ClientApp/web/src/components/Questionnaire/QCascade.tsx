import React from "react";
import { Cascader, Form } from "antd";
import { FormComponentProps } from "antd/es/form";

import { TypeCascade } from "@/data-types";

import { QItemProps } from "./Q";

export interface QCascadeReceivedProps extends QItemProps, TypeCascade {
  form: FormComponentProps["form"]
}

const QCascade = ({ form, id, label, extra, rules, value, options }: QCascadeReceivedProps) => (
  <Form.Item label={label} extra={extra}>
    {form.getFieldDecorator(id, {
      initialValue: value,
      rules
    })(
      <Cascader options={options} />
    )}
  </Form.Item>
);

export default QCascade;
