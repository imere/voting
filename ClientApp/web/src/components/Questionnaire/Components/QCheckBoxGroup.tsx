import React from "react";
import { Checkbox, Form } from "antd";

import { TypeCheckBoxGroup } from "@/components/Questionnaire/questionnaire";

import styels from "./QCheckBoxGroup.module.scss";

export interface QCheckBoxGroupReceivedProps extends Omit<TypeCheckBoxGroup, "typename"> {}

const QCheckBoxGroup = ({ label, name, rules = [], extra, options }: QCheckBoxGroupReceivedProps) => (
  <Form.Item
    label={label}
    name={name}
    rules={rules}
    extra={extra}
  >
    <Checkbox.Group className={styels.checkboxgroup} options={options} />
  </Form.Item>
);

export default QCheckBoxGroup;
