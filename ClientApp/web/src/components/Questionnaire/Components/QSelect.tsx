import React from 'react';
import { Form, Select } from 'antd';

import { TypeSelect } from '@/components/Questionnaire/questionnaire';

export interface QSelectReceivedProps extends TypeSelect {}

const { Option } = Select;

const QSelect = ({ name, label, extra, rules = [], options, ...rest }: QSelectReceivedProps) => (
  <Form.Item
    label={label}
    name={name}
    rules={rules}
    extra={extra}
  >
    <Select {...rest}>
      {options.map((option, i) => <Option key={i} value={option.value}>{option.label}</Option>)}
    </Select>
  </Form.Item>
);

export default QSelect;
