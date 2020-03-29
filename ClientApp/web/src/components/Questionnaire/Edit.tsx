import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LocationDescriptor } from "history";

import { QuestionnaireContext } from "@/contexts/questionnaire";
import { ResponseState, RQuestionnaireResponse } from "@/response";
import { toastMessageByStatus } from "@/shared/toast-message";
import { Routes } from "@/constants";
import { getPollByPollId, updatePoll } from "@/shared/request-util";
import { useStateBeforeUnMount } from "@/hooks/useStateBeforeUnMount";

import QCommon, { dataSourceHolder, Info } from "./QCommon";
import { stripItemsLengthMessage, unifyQuestionnaire } from "./data-util";
import { Questionnaire } from "./questionnaire";

interface EditReceivedProps {
  dataSource?: Array<RQuestionnaireResponse>
}

type EditProps = EditReceivedProps

const Edit: React.FC<EditProps> = () => {
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

  async function onConfirmClick() {
    const dataSource: Questionnaire = {
      ...info,
      content: stripItemsLengthMessage(ctx.items),
    };
    const response = await updatePoll(dataSource);
    if (response.ok) {
      setRedirectUrl(Routes.ACCOUNT_CENTER);
    }
    toastMessageByStatus(response.status);
  }

  async function onCancelClick() {
    setRedirectUrl(Routes.ACCOUNT_CENTER);
  }

  async function getPollById(id: number | string) {
    setLoading(true);
    const response = await getPollByPollId(id);
    if (response.ok) {
      const res: ResponseState<RQuestionnaireResponse> = await response.json();
      const data = unifyQuestionnaire(res.data);
      ctx.replaceItemsWith(data.content);
      setInfo(data);
    }
    toastMessageByStatus(response.status);
    setLoading(false);
  }

  useEffect(() => {
    getPollById(pollId as string);
  }, []);

  return (
    <QCommon
      redirectUrl={redirectUrl}
      isEditing={true}
      loading={loading}
      info={info}
      onConfirmClick={onConfirmClick}
      onCancelClick={onCancelClick}
    />
  );
};

export default Edit;
