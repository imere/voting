import React from "react";
import { Form, Radio } from "antd";
import { FormComponentProps } from "antd/es/form";

import { TypeRadio } from "@/data-types";

import { QItemProps } from "./Q";

export interface QRadioReceivedProps extends QItemProps, TypeRadio {
  form: FormComponentProps["form"]
}

const QRadio = ({ form, id, label, extra, rules, type, value, options }: QRadioReceivedProps) => (
  <Form.Item label={label} extra={extra}>
    {form.getFieldDecorator(id, {
      initialValue: value,
      rules
    })(
      !type || "outline" === type || "solid" === type
        ? <Radio.Group options={options} buttonStyle={type} />
        : (
          <Radio.Group>
            {options.map((option, i) => <Radio.Button key={i} value={option.value}>{option.label}</Radio.Button>)}
          </Radio.Group>
        )
    )}
  </Form.Item>
);

export default QRadio;
