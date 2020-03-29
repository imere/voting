import React, { useContext, useState } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { LocationDescriptor } from 'history';

import { QuestionnaireContext } from '@/contexts/questionnaire';
import { Questionnaire } from '@/components/Questionnaire/questionnaire';
import { Routes } from '@/constants';
import { toastMessageByStatus } from '@/shared/toast-message';
import { createPoll } from '@/shared/request-util';

import QCommon, { Info } from './QCommon';
import { stripRulesLengthMessage } from './data-util';

const New: React.FC = () => {
  function getInfo() {
    const params = new URLSearchParams(useLocation().search);

    const res = {
      title: params.get('title'),
      description: params.get('description') || undefined,
      isPublic: params.get('public')
    };

    try {
      return {
        title: res.title && decodeURIComponent(res.title).trim(),
        description: res.description && decodeURIComponent(res.description).trim(),
        isPublic: res.isPublic && decodeURIComponent(res.isPublic).trim(),
      };
    } catch {
      return {};
    }
  }

  const info = getInfo();

  // ! non-null assertion check disabled below
  if (!info.title) {
    return <Redirect to={Routes.ACCOUNT_CENTER} />;
  }

  const ctx = useContext(QuestionnaireContext);

  const [
    redirectUrl,
    setRedirectUrl
  ] = useState<LocationDescriptor | undefined>(undefined);

  async function handleConfirmClick() {
    for (const item of ctx.items) {
      stripRulesLengthMessage(item.rules);
    }
    const dataSource: Questionnaire = {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      title: info.title!,
      description: info.description,
      isPublic: !!info.isPublic,
      content: ctx.items,
    };
    const response = await createPoll(dataSource);
    if (response.ok) {
      setRedirectUrl(Routes.ACCOUNT_CENTER);
    }
    toastMessageByStatus(response.status);
  }

  async function onCancelClick() {
    setRedirectUrl(Routes.ACCOUNT_CENTER);
  }

  return (
    <QCommon
      redirectUrl={redirectUrl}
      isEditing={true}
      info={{
        title: info.title,
        description: info.description,
        isPublic: info.isPublic as any as Info['isPublic']
      }}
      onConfirmClick={handleConfirmClick}
      onCancelClick={onCancelClick}
    />
  );
};

export default New;
