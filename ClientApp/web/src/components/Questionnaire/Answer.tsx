import React, { useEffect, useState } from "react";
import { Store } from "rc-field-form/es/interface";
import { useParams } from "react-router";

import Common, { dataSourceHolder } from "@/components/Questionnaire/Common";
import { QuestionnaireExtended, ResponseState } from "@/data-types";
import { Http } from "@/shared";
import { API_V1_ANSWER, API_V1_POLL_BY_ID } from "@/shared/conf";
import { toastMessageByStatus } from "@/shared/toast-message";

import { unifyDataSource } from "./util";

const Answer: React.FC = () => {
  const { pollId } = useParams();
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const id = Number.parseInt(pollId!, 10);

  const [
    loading,
    setLoading
  ] = useState(false);

  const [
    dataSource,
    setDataSource
  ] = useState<QuestionnaireExtended>(dataSourceHolder());

  async function onFinish(values: Store) {
    setLoading(true);
    const response = await Http(`${API_V1_ANSWER}/${id}`, {
      method: "PUT",
      body: new Blob([JSON.stringify(values)], {
        type: "application/json; charset=utf-8"
      }),
    });
    if (response.ok) {
      setTimeout(() => location.href = "/");
    } else {
      toastMessageByStatus(response.status);
    }
    setLoading(false);
  }

  async function getPollById(id: number) {
    setLoading(true);
    const response = await Http(`${API_V1_POLL_BY_ID}/${id}`);
    if (response.ok) {
      const res: ResponseState<QuestionnaireExtended> = await response.json();
      setDataSource(unifyDataSource(res.data));
    } else {
      toastMessageByStatus(response.status);
    }
    setLoading(false);
  }

  useEffect(() => {
    getPollById(id);
  }, []);

  return (
    <Common
      isEditing={false}
      loading={loading}
      info={{
        title: dataSource.title,
        description: dataSource.description,
        isPublic: dataSource.isPublic,
      }}
      dataSource={dataSource}
      onFinish={onFinish}
    />
  );
};

export default Answer;
