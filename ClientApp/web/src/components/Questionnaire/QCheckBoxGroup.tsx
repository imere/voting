import React from "react";
import { Checkbox, Form } from "antd";

import { TypeCheckBoxGroup } from "@/data-types";

import styels from "./QCheckBoxGroup.module.scss";

export interface QCheckBoxGroupReceivedProps extends Omit<TypeCheckBoxGroup, "typename"> {}

const QCheckBoxGroup = ({ label, name, rules = [], extra, ...rest }: QCheckBoxGroupReceivedProps) => (
  <Form.Item
    label={label}
    name={name}
    rules={rules}
    extra={extra}
  >
    <Checkbox.Group className={styels.checkboxgroup} {...rest} />
  </Form.Item>
);

export default QCheckBoxGroup;
