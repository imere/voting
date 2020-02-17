import React, { useContext, useState } from "react";
import { Button, Card, Form } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Store } from "rc-field-form/lib/interface";
import { Link } from "react-router-dom";

import QuestionnaireContext from "@/contexts/questionnaire";
import { QuestionnaireContentType } from "@/data-types";
import { Routes } from "@/constants";

import { QItemDataFactory, QItemDefaultData, renderQItems } from "./utils";

type QuestionnaireProps = {}

const { Meta } = Card;

let id = 0;

const Questionnaire: React.FC<QuestionnaireProps> = () => {
  const [, reRender] = useState(false);
  const [
    items,
    setItems
  ] = useState<Array<QuestionnaireContentType>>([]);

  function getItem(name: string) {
    return items.find((item) => item.name === name);
  }

  function addItem(item: QuestionnaireContentType) {
    setItems((prev) => prev.concat(item));
  }

  function removeItem(name: string) {
    setItems((prev) => prev.filter((item) => item.name !== name));
  }

  function updateItem({ name, ...rest }: QuestionnaireContentType) {
    setItems((prev) => {
      prev.find((item, index, prev) => {
        if (item.name !== name) {
          return false;
        }
        Object.assign(prev[index], { name, ...rest });
        return true;
      });
      return prev;
    });
  }

  function forceRender() {
    reRender((v) => !v);
  }

  const ctx = useContext(QuestionnaireContext);
  ctx.getItem = getItem;
  ctx.addItem = addItem;
  ctx.removeItem = removeItem;
  ctx.updateItem = updateItem;
  ctx.forceRender = forceRender;

  const [form] = Form.useForm();

  function getValues(items: Array<QuestionnaireContentType>) {
    const ret = {};
    items.forEach(({ name, value }) => {
      Reflect.defineProperty(ret, name, {
        enumerable: true,
        value,
      });
    });
    return ret;
  }

  form.setFieldsValue(getValues(items));

  function add() {
    setItems((prev) => prev.concat(
      QItemDataFactory.input({
        label: `${id++}`,
        rules: QItemDefaultData.input().rules
      })
    ));
  }

  function onFinish(values: Store) {
    console.log("Received values of form: ", values);
  }

  const isEditing = window.location.pathname.startsWith(Routes.POLL_NEW);

  const formTitle = (
    <Meta
      title="默认标题"
      description="默认描述"
    />
  );

  return (
    <Card
      title={formTitle}
      extra={<Link to={Routes.ACCOUNT_CENTER}>返回</Link>}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        {renderQItems(isEditing, items)}
        {
          isEditing && (
            <Form.Item>
              <Button type="dashed" onClick={add} style={{ width: "50%" }}>
                <PlusOutlined /> 添加
              </Button>
            </Form.Item>
          )
        }
        <Form.Item>
          <Button type="primary" htmlType={ isEditing ? "button" : "submit"}>
            确认
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Questionnaire;
