import React from 'react';
import { Cascader, Form } from 'antd';

import { TypeCascade } from '@/components/Questionnaire/questionnaire';

export interface QCascadeReceivedProps extends TypeCascade {}

const QCascade = ({ name, label, extra, rules = [], ...rest }: QCascadeReceivedProps) => (
  <Form.Item
    label={label}
    name={name}
    rules={rules}
    extra={extra}
  >
    <Cascader {...rest} />
  </Form.Item>
);

export default QCascade;
