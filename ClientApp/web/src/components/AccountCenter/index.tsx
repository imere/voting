import loadable from '@loadable/component';
import React, { useEffect } from 'react';
import { List } from 'antd';

import { ResponseState, RQuestionnaireResponse } from '@/response';
import { toastMessageByStatus } from '@/framework/shared/toast-message';
import { unifyQuestionnaire } from '@/components/Questionnaire/data-util';
import { getAllPollsByCurrentUser } from '@/shared/request-util';
import { useStateBeforeUnMount } from '@/hooks/useStateBeforeUnMount';

import styles from './AccountCenter.module.scss';
import NewFormButton from './NewFormButton';

const PollLazy = loadable(
  () => import('./Poll')
);

const AccountCenter = () => {
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
    const response = await getAllPollsByCurrentUser();
    if (response.ok) {
      const res: ResponseState<Array<RQuestionnaireResponse>> = await response.json();
      for (const item of res.data) {
        unifyQuestionnaire(item);
      }
      setPolls(res.data);
    }
    toastMessageByStatus(response.status);
    setLoading(false);
  }

  useEffect(() => {
    getPolls();
  }, []);

  return (
    <div className={styles['account-center']}>
      <NewFormButton />
      <div>
        <List
          loading={loading}
          grid={{
            gutter: 10,
            xs: 1,
            sm: 2,
            md: 4,
            lg: 4,
            xl: 6,
            xxl: 3,
          }}
          dataSource={polls}
          renderItem={(item) => (
            <List.Item>
              <PollLazy setPolls={setPolls} {...item} />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default AccountCenter;
