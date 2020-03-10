import "./PollList.scss";

import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { GetComponentProps } from "rc-table/lib/interface";
import { useHistory } from "react-router";

import { API_V1_POLLS } from "@/shared/conf";
import { QuestionnaireExtended, ResponseState } from "@/data-types";
import { Http } from "@/shared";
import { Routes } from "@/constants";
import { toastMessageByStatus } from "@/shared/toast-message";

const PollList: React.FunctionComponent = () => {
  const history = useHistory();
  const [
    loading,
    setLoading
  ] = useState(false);

  const [
    polls,
    setPolls
  ] = useState<Array<QuestionnaireExtended>>([]);

  async function getPolls() {
    setLoading(true);
    const response = await Http(API_V1_POLLS);
    if (response.ok) {
      const res: ResponseState<Array<QuestionnaireExtended>> = await response.json();
      for (const poll of res.data) {
        poll.createdAt = dayjs(poll.createdAt).
          add(8, "h").
          toDate().
          toLocaleString();
      }
      setPolls(res.data);
    } else {
      toastMessageByStatus(response.status);
    }
    setLoading(false);
  }

  useEffect(() => {
    getPolls();
  }, []);

  const columns: ColumnsType<QuestionnaireExtended> = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      ellipsis: true,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
    },
    {
      title: "Time",
      dataIndex: "createdAt",
      key: "createdAt",
    },
  ];

  const onRow: GetComponentProps<QuestionnaireExtended> = (record) => ({
    onClick: () => {
      history.push({
        pathname: `${Routes.POLL_ANSWER.split(":")[0]}${record.id}`
      });
    },
  });

  return (
    <Table<QuestionnaireExtended>
      className="poll-list"
      loading={loading}
      showHeader={false}
      columns={columns}
      onRow={onRow}
      pagination={polls?.length ? { position: "bottom" } : false}
      dataSource={polls}
    />
  );
};

export default PollList;
