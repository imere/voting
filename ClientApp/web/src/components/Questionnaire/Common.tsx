import React, { useContext, useState } from "react";
import { Button, Card, Form, Tag } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Store } from "rc-field-form/es/interface";
import { Redirect } from "react-router-dom";

import QuestionnaireContext from "@/contexts/questionnaire";
import { Questionnaire } from "@/components/Questionnaire/questionnaire";
import { Routes } from "@/constants";
import { getItemsValues, QItemDataFactory, QItemDefaultData, renderQItems } from "@/components/Questionnaire/util";
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
  isEditing: boolean
  loading?: boolean
  info: Info
  dataSource: Questionnaire
  onConfirmClick?: (ev: React.MouseEvent<HTMLElement, MouseEvent>) => Promise<void>
  onCancelClick?: (ev: React.MouseEvent<HTMLElement, MouseEvent>) => Promise<void>
  onFinish?: (value: Store) => void
}

type QuestionnaireProps = QuestionnaireReceivedProps

let id = 0;

const Common = ({ isEditing, loading, info, dataSource, onFinish, onConfirmClick, onCancelClick }: QuestionnaireProps) => {
  const { Meta } = Card;

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

  const [
    canceling,
    setCanceling
  ] = useState(false);

  async function handleConfirmClick(ev: React.MouseEvent<HTMLElement, MouseEvent>) {
    setProcessing(true);
    onConfirmClick && await onConfirmClick(ev);
    setProcessing(false);
  }

  async function handleCancelClick(ev: React.MouseEvent<HTMLElement, MouseEvent>) {
    setCanceling(true);
    onCancelClick && await onCancelClick(ev);
    setCanceling(false);
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
      extra={
        !loading &&(
          dataSource.isPublic
            ? <Tag color="volcano">公开</Tag>
            : <Tag color="green">非公开</Tag>
        )
      }
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
  );
};

export default Common;
