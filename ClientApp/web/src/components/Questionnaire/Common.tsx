import React, { useContext, useState } from "react";
import { Button, Card, Form } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Store } from "rc-field-form/es/interface";
import { Link, Redirect } from "react-router-dom";

import QuestionnaireContext from "@/contexts/questionnaire";
import { Questionnaire } from "@/components/Questionnaire/questionnaire";
import { Routes } from "@/constants";
import { getItemsValues, QItemDataFactory, QItemDefaultData, renderQItems } from "@/components/Questionnaire/utils";
import { QuestionnaireExtended } from "@/data-types";

export function dataSourceHolder(): QuestionnaireExtended {
  return {
    id: -1,
    title: "Loading...",
    content: [],
    createdAt: Date.now().toLocaleString(),
  };
}

interface Info {
  title: Questionnaire["title"]
  description: Questionnaire["description"]
  isPublic: Questionnaire["isPublic"]
}

interface QuestionnaireReceivedProps {
  loading?: boolean
  info: Info
  dataSource: Questionnaire
  onConfirmClick?: (ev: React.MouseEvent<HTMLElement, MouseEvent>) => Promise<void>
  onCancelClick?: (ev: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => Promise<void>
  onFinish?: (value: Store) => void
}

type QuestionnaireProps = QuestionnaireReceivedProps

let id = 0;

const Common = ({ loading, info, dataSource, onFinish, onConfirmClick, onCancelClick }: QuestionnaireProps) => {
  dataSource.content = typeof dataSource.content === "string"
    ? JSON.parse(dataSource.content)
    : dataSource.content;

  const { Meta } = Card;

  const { pathname } = location;
  const isEditing = pathname.startsWith(Routes.POLL_EDIT) ||
    pathname.startsWith(Routes.POLL_NEW);

  if (isEditing) {
    if (!info.title) {
      return <Redirect to={Routes.ACCOUNT_CENTER} />;
    }
  }

  const { addItem } = useContext(QuestionnaireContext);

  const [form] = Form.useForm();

  function add() {
    addItem(QItemDataFactory.input({
      label: `${id++}`,
      rules: QItemDefaultData.input().rules
    }));
  }

  const [
    processing,
    setProcessing
  ] = useState(false);

  async function handleConfirmClick(ev: React.MouseEvent<HTMLElement, MouseEvent>) {
    setProcessing(true);
    onConfirmClick && await onConfirmClick(ev);
    setProcessing(false);
  }

  const formTitle = (
    <Meta
      title={info.title}
      description={info.description}
    />
  );

  return (
    <Card
      loading={loading}
      title={formTitle}
      extra={isEditing ?? <Link to={Routes.ACCOUNT_CENTER}>返回</Link>}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={getItemsValues(dataSource.content)}
      >
        {renderQItems(isEditing, dataSource.content)}
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
            type="link"
          >
            <a onClick={onCancelClick}>
              取消
            </a>
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Common;
