import React from "react";
import { Redirect, useLocation } from "react-router-dom";

import { QuestionnaireExtended, ResponseState } from "@/data-types";
import { QuestionnaireContentType } from "@/components/Questionnaire/questionnaire";
import { Routes } from "@/constants";
import { useHttp } from "@/hooks/useHttp";
import { API_V1_POLLS } from "@/shared/conf";
import { toastMessageByStatus } from "@/shared/toast-message";
import { initQContext } from "@/hooks/utils";

import Common from "./Common";

interface NewReceivedProps {
  dataSource?: Array<QuestionnaireExtended>
}

type NewProps = NewReceivedProps

const New: React.FC<NewProps> = () => {
  const params = new URLSearchParams(useLocation().search);

  let info = {
    title: params.get("title"),
    description: params.get("description") || undefined,
    isPublic: params.get("public")
  };

  info = {
    title: info.title && decodeURIComponent(info.title).trim(),
    description: info.description && decodeURIComponent(info.description).trim(),
    isPublic: info.isPublic && decodeURIComponent(info.isPublic).trim(),
  };

  if (!info.title) {
    return <Redirect to={Routes.ACCOUNT_CENTER} />;
  }

  const ctx = initQContext();

  const [
    request,
    response
  ] = useHttp<ResponseState<Array<QuestionnaireContentType>>>(API_V1_POLLS, {
    body: JSON.stringify({
      title: info.title,
      description: info.description,
      isPublic: !!info.isPublic,
      content: ctx.items
    })
  });

  async function handleConfirmClick() {
    await request.put("/");
    if (response.ok) {
      location.href = Routes.ACCOUNT_CENTER;
    } else {
      toastMessageByStatus(response.status);
    }
  }

  return (
    <Common
      info={info as any}
      dataSource={{
        title: info.title,
        description: info.description,
        isPublic: !!info.isPublic,
        content: ctx.items,
      }}
      onConfirmClick={handleConfirmClick}
    />
  );
};

export default New;
