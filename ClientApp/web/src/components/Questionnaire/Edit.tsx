import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LocationDescriptor } from "history";

import { QuestionnaireExtended, ResponseState } from "@/data-types";
import { API_V1_POLL_BY_ID, API_V1_POLLS } from "@/shared/conf";
import { toastMessageByStatus } from "@/shared/toast-message";
import { initQContext } from "@/hooks/util";
import { Http } from "@/shared";
import { Routes } from "@/constants";

import RedirectTo from "../RedirectTo";
import Common, { dataSourceHolder } from "./Common";
import { unifyDataSource } from "./util";

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
    dataSource,
    setDataSource
  ] = useState<QuestionnaireExtended>(dataSourceHolder());

  const ctx = initQContext();

  async function onConfirmClick() {
    const response = await Http(API_V1_POLLS, {
      method: "POST",
      body: new Blob([
        JSON.stringify({
          ...dataSource,
          content: ctx.items,
        })
      ], {
        type: "application/json; charset=utf-8"
      }),
    });
    if (response.ok) {
      setRedirectUrl(Routes.ACCOUNT_CENTER);
    } else {
      toastMessageByStatus(response.status);
    }
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
      ctx.items = data.content;
      setDataSource(data);
    } else {
      toastMessageByStatus(response.status);
    }
    setLoading(false);
  }

  useEffect(() => {
    getPollById(id);
  }, []);

  return (
    <RedirectTo redirectUrl={redirectUrl}>
      <Common
        isEditing={true}
        loading={loading}
        info={{
          title: dataSource.title,
          description: dataSource.description,
          isPublic: dataSource.isPublic,
        }}
        dataSource={{
          ...dataSource,
          content: ctx.items,
        }}
        onConfirmClick={onConfirmClick}
        onCancelClick={onCancelClick}
      />
    </RedirectTo>
  );
};

export default Edit;
