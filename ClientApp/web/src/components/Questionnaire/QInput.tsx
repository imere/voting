import React from "react";
import { Input } from "antd";
import { FormComponentProps } from "antd/es/form";

import { TypeInput } from "@/data-types";

export interface QInputReceivedProps extends Omit<TypeInput, "typename"> {
  form: FormComponentProps["form"]
}

const QInput: React.FC<QInputReceivedProps> = ({ form, id, rules, value }: QInputReceivedProps) => (
  <>
    {form.getFieldDecorator(id, {
      initialValue: value,
      rules
    })(
      <Input />
    )}
  </>
);
  
export default QInput;
