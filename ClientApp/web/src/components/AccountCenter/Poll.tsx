import React, { useState } from "react";
import { Card } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import { QuestionnaireExtended } from "@/data-types";
import { Http } from "@/shared";
import { API_V1_POLLS } from "@/shared/conf";

interface PollReceivedProps extends QuestionnaireExtended {
  setPolls: React.Dispatch<React.SetStateAction<Array<QuestionnaireExtended>>>
}

type PollProps = PollReceivedProps;

const Poll = ({ id, title, description, createdAt, setPolls }: PollProps) => {
  const { Meta } = Card;

  const [
    loading,
    setLoading
  ] = useState(false);

  function handleEditClick() {
    return;
  }

  async function handleDeleteClick() {
    setLoading(true);
    const res = await Http(`${API_V1_POLLS}/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setPolls((prev) => prev.filter((item) => item.id !== id));
    }
    setLoading(false);
  }

  return (
    <Card
      loading={loading}
      actions={[
        <EditOutlined key="edit" onClick={handleEditClick} />,
        <DeleteOutlined key="delete" onClick={handleDeleteClick} />,
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
  );
};

export default Poll;
