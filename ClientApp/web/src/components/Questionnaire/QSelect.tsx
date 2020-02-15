import React from "react";
import { Form, Select } from "antd";
import { FormComponentProps } from "antd/es/form";

import { TypeSelect } from "@/data-types";

import { QItemProps } from "./Q";

export interface QSelectReceivedProps extends QItemProps, TypeSelect {
  form: FormComponentProps["form"]
}

const { Option } = Select;

const QSelect = ({ form, id, label, extra, rules, value, options }: QSelectReceivedProps) => (
  <Form.Item label={label} extra={extra}>
    {form.getFieldDecorator(id, {
      initialValue: value,
      rules
    })(
      <Select>
        {options.map((option, i) => <Option key={i} value={option.value}>{option.label}</Option>)}
      </Select>
    )}
  </Form.Item>
);

export default QSelect;
