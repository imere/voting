import React, { useContext } from "react";
import { Checkbox, Form, Input } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";

import QuestionnaireContext from "@/contexts/questionnaire";
import { QuestionnaireContentType, TypeCheckBoxGroup } from "@/data-types";
import { getLength, isRequired, toggleRequired } from "@/components/Questionnaire/utils";

interface LayoutReceivedProps {
  children?: React.ReactNode
}

type LayoutProps =
  LayoutReceivedProps &
  QuestionnaireContentType & { options?: TypeCheckBoxGroup["options"] }

const Layout: React.FC<LayoutProps> = ({ children, label, name, value, options, rules }: LayoutProps) => {
  const { getItem, updateItem, forceRender } = useContext(QuestionnaireContext);
  const required = isRequired(rules);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const item = getItem(name)!;

  function handleRequireChange({ target: { checked } }: CheckboxChangeEvent) {
    if (checked !== isRequired(item.rules)) {
      toggleRequired(item.rules);
      forceRender();
    }
  }

  function handleLabelChange({ target: { value: label } }: React.ChangeEvent<HTMLInputElement>) {
    label = label.trim();
    if (!label) {
      return;
    }
    item.label = label;
    updateItem(item);
  }

  return (
    <Form
      initialValues={{
        label,
        value,
        options,
        required,
        length: getLength(item.rules) ?? ({})
      }}
    >
      <Form.Item
        label="标签"
        name="label"
      >
        <Input
          placeholder="两端空格无效"
          onChange={handleLabelChange}
        />
      </Form.Item>
      <Form.Item
        label="必填"
        name="required"
        valuePropName="checked"
      >
        <Checkbox onChange={handleRequireChange} />
      </Form.Item>
      {children}
    </Form>
  );
};

export default Layout;
