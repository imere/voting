import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LocationDescriptor } from "history";

import { QuestionnaireContext } from "@/contexts/questionnaire";
import { QuestionnaireExtended, ResponseState } from "@/data-types";
import { API_V1_POLL_BY_ID, API_V1_POLLS } from "@/shared/conf";
import { toastMessageByStatus } from "@/shared/toast-message";
import { Http } from "@/shared";
import { Routes } from "@/constants";

import QCommon, { dataSourceHolder, Info } from "./QCommon";
import { stripItemsLengthMessage, unifyDataSource } from "./data-util";
import { Questionnaire } from "./questionnaire";

interface EditReceivedProps {
  dataSource?: Array<QuestionnaireExtended>
}

type EditProps = EditReceivedProps

const Edit: React.FC<EditProps> = () => {
  const { pollId } = useParams();
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const id = Number.parseInt(pollId!, 10);

  const [
    loading,
    setLoading
  ] = useState(false);

  const [
    redirectUrl,
    setRedirectUrl
  ] = useState<LocationDescriptor | undefined>(undefined);

  const [
    info,
    setInfo
  ] = useState<Info>(dataSourceHolder());

  const ctx = useContext(QuestionnaireContext);

  async function onConfirmClick() {
    const dataSource: Questionnaire = {
      ...info,
      content: stripItemsLengthMessage(ctx.items),
    };
    const response = await Http(API_V1_POLLS, {
      method: "POST",
      body: new Blob([JSON.stringify(dataSource)], {
        type: "application/json; charset=utf-8",
      }),
    });
    if (response.ok) {
      setRedirectUrl(Routes.ACCOUNT_CENTER);
    }
    toastMessageByStatus(response.status);
  }

  async function onCancelClick() {
    setRedirectUrl(Routes.ACCOUNT_CENTER);
  }

  async function getPollById(id: number) {
    setLoading(true);
    const response = await Http(`${API_V1_POLL_BY_ID}/${id}`);
    if (response.ok) {
      const res: ResponseState<QuestionnaireExtended> = await response.json();
      const data = unifyDataSource(res.data);
      ctx.replaceItemsWith(data.content);
      setInfo(data);
    }
    toastMessageByStatus(response.status);
    setLoading(false);
  }

  useEffect(() => {
    getPollById(id);
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
