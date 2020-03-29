import React, { useContext, useEffect, useState } from 'react';
import { Store } from 'rc-field-form/es/interface';
import { useParams } from 'react-router';
import { LocationDescriptor } from 'history';

import QCommon, { dataSourceHolder, Info } from '@/components/Questionnaire/QCommon';
import { ResponseState, RQuestionnaireResponse } from '@/response';
import { toastMessageByStatus } from '@/shared/toast-message';
import { QuestionnaireContext } from '@/contexts/questionnaire';
import { Routes } from '@/constants';
import { useStateBeforeUnMount } from '@/hooks/useStateBeforeUnMount';
import { unifyQuestionnaire } from '@/components/Questionnaire/data-util';
import { createAnswerByPollId, getPollByPollId } from '@/shared/request-util';

import { Answer } from './questionnaire';

const AnswerComponent: React.FC = () => {
  const { pollId } = useParams();

  const [
    loading,
    setLoading
  ] = useStateBeforeUnMount(false);

  const [
    redirectUrl,
    setRedirectUrl
  ] = useState<LocationDescriptor | undefined>(undefined);

  const [
    info,
    setInfo
  ] = useStateBeforeUnMount<Info>(dataSourceHolder());

  const ctx = useContext(QuestionnaireContext);

  async function onFinish(values: Store) {
    setLoading(true);
    const response = await createAnswerByPollId(pollId as string, values as Array<Answer>);
    if (response.ok) {
      setRedirectUrl('/');
    }
    toastMessageByStatus(response.status);
    setLoading(false);
  }

  async function getPollById(id: number | string) {
    setLoading(true);
    const response = await getPollByPollId(id);
    if (response.ok) {
      const res: ResponseState<RQuestionnaireResponse> = await response.json();
      const dataSource = unifyQuestionnaire(res.data);
      setInfo(dataSource);
      ctx.replaceItemsWith(dataSource.content);
    }
    toastMessageByStatus(response.status);
    setLoading(false);
  }

  async function onCancelClick() {
    setRedirectUrl(Routes.POLL_LIST);
  }

  useEffect(() => {
    getPollById(pollId as string);
  }, []);

  return (
    <QCommon
      redirectUrl={redirectUrl}
      isEditing={false}
      loading={loading}
      info={info}
      onCancelClick={onCancelClick}
      onFinish={onFinish}
    />
  );
};

export default AnswerComponent;
