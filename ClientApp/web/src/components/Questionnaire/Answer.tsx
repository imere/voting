import React, { useContext, useEffect, useState } from "react";
import { Store } from "rc-field-form/es/interface";
import { useParams } from "react-router";
import { LocationDescriptor } from "history";

import QCommon, { dataSourceHolder, Info } from "@/components/Questionnaire/QCommon";
import { QuestionnaireExtended, ResponseState } from "@/data-types";
import { Http } from "@/shared";
import { API_V1_ANSWER, API_V1_POLL_BY_ID } from "@/shared/conf";
import { toastMessageByStatus } from "@/shared/toast-message";
import { QuestionnaireContext } from "@/contexts/questionnaire";
import { Routes } from "@/constants";
import { useStateBeforeUnMount } from "@/hooks/useStateBeforeUnMount";
import { unifyDataSource } from "@/components/Questionnaire/data-util";

const Answer: React.FC = () => {
  const { pollId } = useParams();
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const id = Number.parseInt(pollId!, 10);

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
  ] = useState<Info>(dataSourceHolder());

  const ctx = useContext(QuestionnaireContext);

  async function onFinish(values: Store) {
    setLoading(true);
    const response = await Http(`${API_V1_ANSWER}/${id}`, {
      method: "PUT",
      body: new Blob([JSON.stringify(values)], {
        type: "application/json; charset=utf-8",
      }),
    });
    if (response.ok) {
      setRedirectUrl("/");
    }
    toastMessageByStatus(response.status);
    setLoading(false);
  }

  async function getPollById(id: number) {
    setLoading(true);
    const response = await Http(`${API_V1_POLL_BY_ID}/${id}`);
    if (response.ok) {
      const res: ResponseState<QuestionnaireExtended> = await response.json();
      const dataSource = unifyDataSource(res.data);
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
    getPollById(id);
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

export default Answer;
