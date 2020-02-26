import React from "react";
import { Form, InputNumber } from "antd";

import { TypeNumber } from "@/components/Questionnaire/questionnaire";

export interface QNumberReceivedProps extends TypeNumber {}

const QNumber = ({ name, label, extra, rules = [], min, max, ...rest }: QNumberReceivedProps) => {
  if (typeof min !== "undefined" || typeof max !== "undefined") {
    rules.unshift({
      min: min,
      max: max,
    });
  }
  return (
    <Form.Item
      label={label}
      name={name}
      rules={rules}
      extra={extra}
    >
      <InputNumber min={min} max={max} {...rest} />
    </Form.Item>
  );
};

export default QNumber;
