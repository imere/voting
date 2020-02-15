import React from "react";
import { Form, InputNumber } from "antd";
import { FormComponentProps } from "antd/es/form";

import { TypeNumber } from "@/data-types";

import { QItemProps } from "./Q";

export interface QNumberReceivedProps extends QItemProps, TypeNumber {
  form: FormComponentProps["form"]
}

const QNumber = ({ form, id, label, extra, rules, value, min, max }: QNumberReceivedProps) => {
  if (typeof min !== "undefined" || typeof max !== "undefined") {
    rules.unshift({
      min: min,
      max: max,
    });
  }
  return (
    <Form.Item label={label} extra={extra}>
      {form.getFieldDecorator(id, {
        initialValue: value,
        rules
      })(
        <InputNumber min={min} max={max} />
      )}
    </Form.Item>
  );
};

export default QNumber;
