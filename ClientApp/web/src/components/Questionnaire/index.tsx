import Form, { FormComponentProps } from "antd/es/form";
import React, { FormEvent, useState } from "react";
import { Button, Icon } from "antd";

import { AnyType, None } from "@/types";
import { QuestionnaireContentType } from "@/data-types";

import { hashItemId, QItemDataFactory, renderQItems } from "./utils";

interface QuestionnaireOwnFormProps {
  form: FormComponentProps["form"]
}

type QuestionnaireProps = QuestionnaireOwnFormProps

let id = 0;

const Questionnaire = ({ form }: QuestionnaireProps) => {
  const [
    items,
    setItems
  ] = useState<(QuestionnaireContentType & AnyType)[]>([]);

  const add = function() {
    setItems((prev) => prev.concat(
      Math.random() > 0.5
        ? QItemDataFactory.input({
          typename: "input",
          id: hashItemId(id.toString()),
          label: `${id++}`,
        })
        : QItemDataFactory.checkboxgroup({
          typename: "checkboxgroup",
          id: hashItemId(id.toString()),
          label: `${id++}`,
        })
    ));
  };

  const handleSubmit = function(e: FormEvent) {
    e.preventDefault();
    form.validateFieldsAndScroll((err: Error | None, values: AnyType) => {
      if (err) {
        return;
      }
      console.log("Received values of form: ", values);
    });
  };

  return (
    <>
      <Form
        layout="vertical"
        style={{ margin: "0 auto" }}
        onSubmit={handleSubmit}
      >
        {renderQItems(form, true, items, setItems)}
        <Form.Item>
          <Button type="dashed" onClick={add} style={{ width: "50%" }}>
            <Icon type="plus" /> 添加
          </Button>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            确认
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Form.create({ name: "Questionnaire" })(Questionnaire);
