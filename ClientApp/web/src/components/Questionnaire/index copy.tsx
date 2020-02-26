import React, { useContext, useState } from "react";
import { Button, Card, Form } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Store } from "rc-field-form/es/interface";
import { Link, Redirect, useLocation } from "react-router-dom";

import QuestionnaireContext from "@/contexts/questionnaire";
import { ResponseState, QuestionnaireExtended } from "@/data-types";
import { QuestionnaireContentType } from "@/components/Questionnaire/questionnaire";
import { Routes } from "@/constants";
import { useHttp } from "@/hooks/useHttp";
import { API_V1_POLLS } from "@/shared/conf";
import { toastMessageByStatus } from "@/shared/toast-message";

import { getItemsValues, QItemDataFactory, QItemDefaultData, renderQItems } from "./utils";

interface QuestionnaireReceivedProps {
  dataSource?: Array<QuestionnaireExtended>
}

type QuestionnaireProps = QuestionnaireReceivedProps

let id = 0;

const QuestionnaireComponent: React.FC<QuestionnaireProps> = () => {
  const { Meta } = Card;

  const isEditing = location.pathname === Routes.POLL_NEW;
  const params = new URLSearchParams(useLocation().search);

  let info = {
    title: params.get("title"),
    description: params.get("description") || undefined,
    isPublic: params.get("public")
  };

  info = {
    title: info.title && decodeURIComponent(info.title).trim(),
    description: info.description && decodeURIComponent(info.description).trim(),
    isPublic: info.isPublic && decodeURIComponent(info.isPublic).trim(),
  };

  if (isEditing) {
    if (!info.title) {
      return <Redirect to={Routes.ACCOUNT_CENTER} />;
    }
  }

  const [, reRender] = useState(false);

  const ctx = useContext(QuestionnaireContext);
  const items = ctx.items;

  function getItem(name: string) {
    return items.find((item) => item.name === name);
  }

  function forceRender() {
    requestAnimationFrame(() => reRender((v) => !v));
  }

  function addItem(item: QuestionnaireContentType) {
    items.push(item);
    forceRender();
  }

  function removeItem(name: string) {
    ctx.items = items.filter((item) => item.name !== name);
    forceRender();
  }

  function updateItem({ name, ...rest }: QuestionnaireContentType) {
    for (const item of items) {
      if (item.name !== name) {
        continue;
      }
      delete item.value;
      Object.assign(item, { name, ...rest });
      break;
    }
    forceRender();
  }

  ctx.getItem = getItem;
  ctx.addItem = addItem;
  ctx.removeItem = removeItem;
  ctx.updateItem = updateItem;
  ctx.forceRender = forceRender;

  const [form] = Form.useForm();

  form.setFieldsValue(getItemsValues(items));

  function add() {
    addItem(QItemDataFactory.input({
      label: `${id++}`,
      rules: QItemDefaultData.input().rules
    }));
  }

  function onFinish(values: Store) {
    console.log("Received values of form: ", values);
  }

  const [
    uploading,
    setUploading
  ] = useState(false);

  const [
    request,
    response
  ] = useHttp<ResponseState<Array<QuestionnaireContentType>>>(API_V1_POLLS, {
    body: JSON.stringify({
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      title: info.title!,
      description: info.description,
      isPublic: !!info.isPublic,
      content: items
    })
  });

  async function handleConfirmClick() {
    setUploading(true);
    await request.put("/");
    setUploading(false);
    if (response.ok) {
      location.href = Routes.ACCOUNT_CENTER;
    } else {
      toastMessageByStatus(response.status);
    }
  }

  const formTitle = (
    <Meta
      title={info.title}
      description={info.description}
    />
  );

  return (
    <Card
      title={formTitle}
      extra={isEditing ?? <Link to={Routes.ACCOUNT_CENTER}>返回</Link>}
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
          <Button
            type="primary"
            loading={uploading}
            htmlType={isEditing ? "button" : "submit"}
            onClick={isEditing ? () => handleConfirmClick() : undefined}
          >
            确认
          </Button>
          <Button
            type="link"
          >
            <Link to={Routes.ACCOUNT_CENTER} onClick={ isEditing ? () => ctx.items = [] : undefined}>
              取消
            </Link>
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default QuestionnaireComponent;
