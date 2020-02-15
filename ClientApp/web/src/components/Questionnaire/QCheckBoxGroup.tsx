import React from "react";
import { Checkbox } from "antd";
import { FormComponentProps } from "antd/es/form";

import { TypeCheckBoxGroup } from "@/data-types";

import styels from "./QCheckBoxGroup.module.scss";
import { QItemProps } from "./Q";

export interface QCheckBoxGroupReceivedProps extends QItemProps, TypeCheckBoxGroup {
  form: FormComponentProps["form"]
}

const QCheckBoxGroup = ({ form, id, rules, value, options }: QCheckBoxGroupReceivedProps) => (
  <>
    {form.getFieldDecorator(id, {
      initialValue: value,
      rules
    })(
      <Checkbox.Group className={styels.checkboxgroup} options={options} />
    )}
  </>
);

export default QCheckBoxGroup;
