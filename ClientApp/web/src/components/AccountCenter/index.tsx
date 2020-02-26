import loadable from "@loadable/component";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { List } from "antd";

import { QuestionnaireExtended, ResponseState } from "@/data-types";
import { API_V1_POLLS_BY_USER } from "@/shared/conf";
import { toastMessageByStatus } from "@/shared/toast-message";
import { Http } from "@/shared";

import styles from "./AccountCenter.module.scss";
import NewFormButton from "./NewFormButton";

const PollLazy = loadable(
  () => import("./Poll")
);

const AccountCenter = () => {
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
    const response = await Http(API_V1_POLLS_BY_USER);
    if (response.ok) {
      const json: ResponseState<Array<QuestionnaireExtended>> = await response.json();
      setPolls(json.data);
    } else {
      toastMessageByStatus(response.status);
    }
    setLoading(false);
  }

  useEffect(() => {
    getPolls();
  }, []);

  return (
    <div className={styles["account-center"]}>
      <NewFormButton />
      <div>
        <List
          loading={loading}
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 4,
            lg: 4,
            xl: 6,
            xxl: 3,
          }}
          dataSource={polls}
          renderItem={(item) => {
            item.createdAt = dayjs(item.createdAt).
              add(8, "h").
              toDate().
              toLocaleString();
            return (
              <List.Item>
                <PollLazy setPolls={setPolls} {...item} />
              </List.Item>
            );
          }}
        />
      </div>
    </div>
  );
};

export default AccountCenter;
