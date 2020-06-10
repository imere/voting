import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Form, Tag, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Store } from 'rc-field-form/es/interface';
import { Redirect } from 'react-router-dom';
import { LocationDescriptor } from 'history';

import { QuestionnaireContext } from '@/contexts/questionnaire';
import { Questionnaire, QuestionnaireContentType } from '@/components/Questionnaire/questionnaire';
import { Routes } from '@/constants';
import { QItemDataFactory, QItemDefaultData, renderQItems } from '@/components/Questionnaire/util';
import { getItemsValues, addHour } from '@/components/Questionnaire/data-util';
import { RQuestionnaireResponse } from '@/typings/response';
import { useStateBeforeUnMount } from '@/hooks/useStateBeforeUnMount';
import { useQContext } from '@/hooks/useQContext';

import RedirectTo from '../RedirectTo';

export function dataSourceHolder(): RQuestionnaireResponse {
  return {
    id: NaN,
    title: 'Loading...',
    content: [],
    createdAt: new Date().toUTCString(),
  };
}

export interface Info {
  title: Questionnaire['title']
  description?: Questionnaire['description']
  isPublic?: Questionnaire['isPublic']
  expiresAt?: Questionnaire['expiresAt']
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

  const [, forceRefresh] = useState(false);

  const ctx = useContext(QuestionnaireContext);

  const [
    processing,
    setProcessing
  ] = useStateBeforeUnMount(false);

  const [
    canceling,
    setCanceling
  ] = useStateBeforeUnMount(false);

  const [form] = Form.useForm();

  function setFieldsValue() {
    form.setFieldsValue(getItemsValues(ctx.items));
  }

  useQContext({
    refreshers: [forceRefresh],
    listeners: [setFieldsValue],
  }, []);

  useEffect(() => () => {
    ctx.replaceItemsWith();
  }, [ctx]);

  function handleAddClick() {
    ctx.addItem(QItemDataFactory({
      typename: 'input',
      label: `${id++}`,
      rules: QItemDefaultData.input().rules,
    }) as QuestionnaireContentType);
  }

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

  if (isEditing) {
    if (!info.title) {
      return <Redirect to={Routes.ACCOUNT_CENTER} />;
    }
  }

  const expireTimeString = info.expiresAt
      && (new Date() > new Date(addHour(info.expiresAt as any, 8)))
      && new Date(addHour(info.expiresAt as any, 8)).toLocaleString()
        || '';

  if (expireTimeString) {
    message.warn('问卷已过期');
  }

  const formTitle = (
    <Meta
      title={`${info.title} ${expireTimeString ? `(过期时间:${expireTimeString})` : ''}`}
      description={info.description}
    />
  );

  return (
    <RedirectTo redirectUrl={redirectUrl}>
      <Card
        loading={loading}
        title={formTitle}
        extra={
          <>
            {expireTimeString
              ? <Tag color="volcano">问卷过期</Tag>
              : <Tag color="green">问卷有效</Tag>}
            {info.isPublic
              ? <Tag color="volcano">公开</Tag>
              : <Tag color="green">非公开</Tag>}
          </>
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
                <Button type="dashed" onClick={handleAddClick} style={{ width: '50%' }}>
                  <PlusOutlined /> 添加
                </Button>
              </Form.Item>
            )
          }
          <Form.Item>
            <Button
              type="primary"
              loading={processing}
              htmlType={isEditing ? 'button' : 'submit'}
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
