import React from 'react';
import { Form, Input } from 'antd';

import { TypeTextArea } from '@/components/Questionnaire/questionnaire';

export interface QTextAreaReceivedProps extends TypeTextArea {}

const { TextArea } = Input;

const QTextArea = ({ label, name, extra, rules = [], ...rest }: QTextAreaReceivedProps) => (
  <Form.Item
    label={label}
    name={name}
    rules={rules}
    extra={extra}
  >
    <TextArea autoSize {...rest} />
  </Form.Item>
);

export default QTextArea;
