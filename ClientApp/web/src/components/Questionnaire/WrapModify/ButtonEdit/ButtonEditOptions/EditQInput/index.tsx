import React from "react";
import { Form } from "antd";

import { TypeInput } from "@/data-types";
import Common from "../Common";

interface EditQInputReceivedProps extends Omit<TypeInput, "typename"> { }

type EditQInputProps = EditQInputReceivedProps

const EditQInput: React.FC<EditQInputProps> = ({ ...rest }: EditQInputProps) => (
  <Common
    {...rest}
  >
    <Form.Item
      label="长度"
      name="length"
    >

    </Form.Item>
  </Common>
);

export default EditQInput;
