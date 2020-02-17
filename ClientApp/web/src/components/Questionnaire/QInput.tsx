import React from "react";
import { Input, Form } from "antd";

import { TypeInput } from "@/data-types";

export interface QInputReceivedProps extends Omit<TypeInput, "typename"> {}

const QInput: React.FC<QInputReceivedProps> = ({ label, name, rules = [], extra, ...rest }: QInputReceivedProps) => (
  <Form.Item
    label={label}
    name={name}
    rules={rules}
    extra={extra}
  >
    <Input {...rest} />
  </Form.Item>
);

export default QInput;
