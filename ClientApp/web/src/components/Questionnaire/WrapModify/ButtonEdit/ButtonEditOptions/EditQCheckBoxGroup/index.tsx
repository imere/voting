import React from "react";
import { Form } from "antd";

import Layout from "@/components/Questionnaire/WrapModify/ButtonEdit/ButtonEditOptions/Common/Layout";
import LengthRange from "@/components/Questionnaire/WrapModify/ButtonEdit/ButtonEditOptions/Common/LengthRange";
import { TypeCheckBoxGroup } from "@/components/Questionnaire/questionnaire";

import DefaultValue from "./DefaultValue";
import Options from "./Options";

interface EditQCheckBoxGroupReceivedProps extends TypeCheckBoxGroup {}

type EditQCheckBoxGroupProps = EditQCheckBoxGroupReceivedProps

const EditQCheckBoxGroup = (props: EditQCheckBoxGroupProps) => (
  <Layout
    { ...props }
  >
    <Form.Item
      label="默认值"
      name="value"
    >
      <DefaultValue {...props} />
    </Form.Item>
    <Form.Item
      label="选项"
      name="options"
    >
      <Options {...props} />
    </Form.Item>
    <Form.Item
      label="选项数"
      name="length"
    >
      <LengthRange
        lengthName="选项数"
        {...props}
      />
    </Form.Item>
  </Layout>
);

export default EditQCheckBoxGroup;
