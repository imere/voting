import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Form, Tag } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Store } from "rc-field-form/es/interface";
import { Redirect } from "react-router-dom";
import { LocationDescriptor } from "history";

import { QuestionnaireContext } from "@/contexts/questionnaire";
import { Questionnaire } from "@/components/Questionnaire/questionnaire";
import { Routes } from "@/constants";
import { QItemDataFactory, QItemDefaultData, renderQItems } from "@/components/Questionnaire/util";
import { getItemsValues } from "@/components/Questionnaire/data-util";
import { QuestionnaireExtended } from "@/data-types";
import { useStateBeforeUnMount } from "@/hooks/useStateBeforeUnMount";

import RedirectTo from "../RedirectTo";

export function dataSourceHolder(): QuestionnaireExtended {
  return {
    id: NaN,
    title: "Loading...",
    content: [],
    createdAt: Date.now().toLocaleString(),
  };
}

export interface Info {
  title: Questionnaire["title"]
  description?: Questionnaire["description"]
  isPublic?: Questionnaire["isPublic"]
}

interface QuestionnaireReceivedProps {
  isEditing: boolean
  loading?: boolean
  info: Info
  onConfirmClick?: (ev: React.MouseEvent<HTMLElement, MouseEvent>) => Promise<void>
  onCancelClick?: (ev: React.MouseEvent<HTMLElement, MouseEvent>) => Promise<void>
  onFinish?: (value: Store) => void
  redirectUrl?: LocationDescriptor
}

type QuestionnaireProps = QuestionnaireReceivedProps

let id = 0;

const { Meta } = Card;

const QCommon = ({ isEditing, loading, info, onFinish, onConfirmClick, onCancelClick, redirectUrl }: QuestionnaireProps) => {

  if (isEditing) {
    if (!info.title) {
      return <Redirect to={Routes.ACCOUNT_CENTER} />;
    }
  }

  const [, forceRefresh] = useState(false);

  const ctx = useContext(QuestionnaireContext);

  const [form] = Form.useForm();

  function add() {
    ctx.addItem(QItemDataFactory.input({
      label: `${id++}`,
      rules: QItemDefaultData.input().rules
    }));
  }

  const [
    processing,
    setProcessing
  ] = useStateBeforeUnMount(false);

  const [
    canceling,
    setCanceling
  ] = useStateBeforeUnMount(false);

  async function handleConfirmClick(ev: React.MouseEvent<HTMLElement, MouseEvent>) {
    try {
      setProcessing(true);
      onConfirmClick && await onConfirmClick(ev);
    } finally {
      setProcessing(false);
    }
  }

  async function handleCancelClick(ev: React.MouseEvent<HTMLElement, MouseEvent>) {
    try {
      setCanceling(true);
      onCancelClick && await onCancelClick(ev);
    } finally {
      setCanceling(false);
    }
  }

  useEffect(() => {
    function setFieldsValue() {
      form.setFieldsValue(getItemsValues(ctx.items));
    }

    ctx.addRefresher(forceRefresh);
    ctx.subscribe(setFieldsValue);
    return () => {
      ctx.removeRefresher(forceRefresh);
      ctx.unsubscribe(setFieldsValue);
      ctx.replaceItemsWith();
    };
  }, []);

  const formTitle = (
    <Meta
      title={info.title}
      description={info.description}
    />
  );

  return (
    <RedirectTo redirectUrl={redirectUrl}>
      <Card
        loading={loading}
        title={formTitle}
        extra={
          !loading && (
            info.isPublic
              ? <Tag color="volcano">公开</Tag>
              : <Tag color="green">非公开</Tag>
          )
        }
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={getItemsValues(ctx.items)}
        >
          {renderQItems(isEditing, ctx.items)}
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
              loading={processing}
              htmlType={isEditing ? "button" : "submit"}
              onClick={handleConfirmClick}
            >
              确认
            </Button>
            <Button
              loading={canceling}
              type="link"
            >
              <a onClick={handleCancelClick}>
              取消
              </a>
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </RedirectTo>
  );
};

export default QCommon;
