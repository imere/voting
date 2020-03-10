import React from "react";
import { Input, Form } from "antd";

import { TypeInput } from "@/components/Questionnaire/questionnaire";

export interface QInputReceivedProps extends TypeInput {}

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
