import React, { useState } from 'react';
import { Card } from 'antd';
import { DeleteOutlined, EditOutlined, PieChartOutlined } from '@ant-design/icons';
import { LocationDescriptor } from 'history';

import RedirectTo from '@/components/RedirectTo';
import { RQuestionnaireResponse } from '@/typings/response';
import { Routes } from '@/constants';
import { deletePollById } from '@/framework/shared/request-util';
import { useStateBeforeUnMount } from '@/hooks/useStateBeforeUnMount';

interface PollReceivedProps extends RQuestionnaireResponse {
  setPolls: React.Dispatch<React.SetStateAction<Array<RQuestionnaireResponse>>>
}

type PollProps = PollReceivedProps;

const Polls = ({ id, title, description, createdAt, setPolls }: PollProps) => {
  const { Meta } = Card;

  const [
    loading,
    setLoading
  ] = useStateBeforeUnMount(false);

  const [
    redirectUrl,
    setRedirectUrl
  ] = useState<LocationDescriptor<any> | undefined>(undefined);

  function handleEditClick() {
    setRedirectUrl(`${Routes.POLL_EDIT.split(':')[0]}${id}`);
  }

  async function handleDeleteClick() {
    setLoading(true);
    const response = await deletePollById(id);
    if (response.ok) {
      setPolls((prev) => prev.filter((item) => item.id !== id));
    }
    setLoading(false);
  }

  function handleStatisticClick() {
    setRedirectUrl(`${Routes.POLL_STATISTIC.split(':')[0]}${id}`);
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
