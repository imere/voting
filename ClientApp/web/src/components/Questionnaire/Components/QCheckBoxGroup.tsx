import React from 'react';
import { Checkbox, Form } from 'antd';

import { TypeCheckBoxGroup } from '@/components/Questionnaire/questionnaire';

import styles from './QCheckBoxGroup.module.scss';

export interface QCheckBoxGroupReceivedProps extends TypeCheckBoxGroup {}

const QCheckBoxGroup = ({ label, name, rules = [], extra, options }: QCheckBoxGroupReceivedProps) => (
  <Form.Item
    label={label}
    name={name}
    rules={rules}
    extra={extra}
  >
    <Checkbox.Group className={styles.checkboxgroup} options={options} />
  </Form.Item>
);

export default QCheckBoxGroup;
