import React from "react";
import { Form, Radio } from "antd";

import { TypeRadio } from "@/data-types";

export interface QRadioReceivedProps extends TypeRadio {}

const QRadio = ({ name, label, extra, rules = [], type, options, ...rest }: QRadioReceivedProps) => (
  <Form.Item
    label={label}
    name={name}
    rules={rules}
    extra={extra}
  >
    {
      !type || "outline" === type || "solid" === type
        ? <Radio.Group options={options} buttonStyle={type} {...rest} />
        : (
          <Radio.Group {...rest}>
            {options.map((option, i) => <Radio.Button key={i} value={option.value}>{option.label}</Radio.Button>)}
          </Radio.Group>
        )
    }
  </Form.Item>
);

export default QRadio;
