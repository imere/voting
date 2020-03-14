import React, { useState } from "react";
import { Card } from "antd";
import { DeleteOutlined, EditOutlined, PieChartOutlined } from "@ant-design/icons";
import { LocationDescriptor } from "history";

import RedirectTo from "@/components/RedirectTo";
import { QuestionnaireExtended } from "@/data-types";
import { Http } from "@/shared";
import { API_V1_POLLS } from "@/shared/conf";
import { Routes } from "@/constants";

interface PollReceivedProps extends QuestionnaireExtended {
  setPolls: React.Dispatch<React.SetStateAction<Array<QuestionnaireExtended>>>
}

type PollProps = PollReceivedProps;

const Polls = ({ id, title, description, createdAt, setPolls }: PollProps) => {
  const { Meta } = Card;

  const [
    loading,
    setLoading
  ] = useState(false);

  const [
    redirectUrl,
    setRedirectUrl
  ] = useState<LocationDescriptor<any> | undefined>(undefined);

  function handleEditClick() {
    setRedirectUrl(`${Routes.POLL_EDIT.split(":")[0]}${id}`);
  }

  async function handleDeleteClick() {
    setLoading(true);
    const response = await Http(`${API_V1_POLLS}/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      setPolls((prev) => prev.filter((item) => item.id !== id));
    }
    setLoading(false);
  }

  function handleStatisticClick() {
    // setRedirectUrl();
  }

  return (
    <RedirectTo redirectUrl={redirectUrl}>
      <Card
        loading={loading}
        actions={[
          <EditOutlined title="编辑" key="edit" onClick={handleEditClick} />,
          <DeleteOutlined title="删除" key="delete" onClick={handleDeleteClick} />,
          <PieChartOutlined title="统计" key="statistic" onClick={handleStatisticClick} />,
        ]}
      >
        <Meta
          title={title}
          description={
            <>
              <div>{description}</div>
              <br />
              <div>{createdAt}</div>
            </>
          }
        />
      </Card>
    </RedirectTo>
  );
};

export default Polls;
