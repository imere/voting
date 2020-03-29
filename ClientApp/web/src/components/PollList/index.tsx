import './PollList.scss';

import React, { useEffect } from 'react';
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { GetComponentProps } from 'rc-table/es/interface';
import { useHistory } from 'react-router';

import { ResponseState, RQuestionnaireResponse } from '@/response';
import { Routes } from '@/constants';
import { toastMessageByStatus } from '@/shared/toast-message';
import { unifyQuestionnaire } from '@/components/Questionnaire/data-util';
import { getAllPolls } from '@/shared/request-util';
import { useStateBeforeUnMount } from '@/hooks/useStateBeforeUnMount';

const columns: ColumnsType<RQuestionnaireResponse> = [
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
    ellipsis: true,
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
    ellipsis: true,
  },
  {
    title: 'Time',
    dataIndex: 'createdAt',
    key: 'createdAt',
  },
];

const PollList: React.FunctionComponent = () => {
  const history = useHistory();

  const [
    loading,
    setLoading
  ] = useStateBeforeUnMount(false);

  const [
    polls,
    setPolls
  ] = useStateBeforeUnMount<Array<RQuestionnaireResponse>>([]);

  async function getPolls() {
    setLoading(true);
    const response = await getAllPolls();
    if (response.ok) {
      const res: ResponseState<Array<RQuestionnaireResponse>> = await response.json();
      const { data } = res;
      const { length } = data;
      for (let i = 0; i < length; i++) {
        Reflect.set(data[i], 'key', i);
        unifyQuestionnaire(data[i]);
      }
      setPolls(res.data);
    }
    toastMessageByStatus(response.status);
    setLoading(false);
  }

  useEffect(() => {
    getPolls();
  }, []);

  const onRow: GetComponentProps<RQuestionnaireResponse> = (record) => ({
    onClick: () => {
      history.push({
        pathname: `${Routes.POLL_ANSWER.split(':')[0]}${record.id}`
      });
    },
  });

  return (
    <Table<RQuestionnaireResponse>
      className="poll-list"
      loading={loading}
      showHeader={false}
      columns={columns}
      onRow={onRow}
      pagination={polls?.length ? { position: 'bottom' } : false}
      dataSource={polls}
    />
  );
};

export default PollList;
