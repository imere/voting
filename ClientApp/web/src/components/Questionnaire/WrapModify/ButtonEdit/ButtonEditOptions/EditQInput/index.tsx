import React from "react";
import { Form } from "antd";

import Layout from "@/components/Questionnaire/WrapModify/ButtonEdit/ButtonEditOptions/Common/Layout";
import LengthRange from "@/components/Questionnaire/WrapModify/ButtonEdit/ButtonEditOptions/Common/LengthRange";
import { TypeInput } from "@/components/Questionnaire/questionnaire";

import DefaultValue from "./DefaultValue";

interface EditQInputReceivedProps extends TypeInput {}

type EditQInputProps = EditQInputReceivedProps

const EditQInput: React.FC<EditQInputProps> = (props: EditQInputProps) => (
  <Layout
    {...props}
  >
    <Form.Item
      label="默认值"
      name="value"
    >
      <DefaultValue {...props} />
    </Form.Item>
    <Form.Item
      label="长度"
      name="length"
    >
      <LengthRange
        lengthName="长度"
        {...props}
      />
    </Form.Item>
  </Layout>
);

export default EditQInput;
