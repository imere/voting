import React, { useEffect } from "react";
import { Card, Collapse } from "antd";
import { useParams } from "react-router";

import { toastMessageByStatus } from "@/shared/toast-message";
import { ResponseState, RQuestionnaireWithAnswer } from "@/response";
import { getAnswersByPollId } from "@/shared/request-util";
import { useStateBeforeUnMount } from "@/hooks/useStateBeforeUnMount";
import { unifyQuestionnaireWithAnswer } from "@/components/Questionnaire/data-util";
import { None } from "@/types";
import { QuestionnaireWithAnswer } from "@/components/Questionnaire/questionnaire";

import { statByTypename } from "./util";

const { Panel } = Collapse;
const { Meta } = Card;

const Statistic: React.FC = () => {

  const { pollId } = useParams();

  const [
    loading,
    setLoading
  ] = useStateBeforeUnMount(false);

  const [
    poll,
    setPoll
  ] = useStateBeforeUnMount<QuestionnaireWithAnswer | None>(null);

  async function loadQuestionnaire(id: string): Promise<void> {
    try {
      setLoading(true);
      const response = await getAnswersByPollId(id);
      if (response.ok) {
        const res: ResponseState<RQuestionnaireWithAnswer> = await response.json();
        setPoll(unifyQuestionnaireWithAnswer(res.data));
      }
      toastMessageByStatus(response.status);
    } catch {
      toastMessageByStatus(500);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    pollId && loadQuestionnaire(pollId);
  }, []);

  return (
    <Card
      loading={loading}
      title={
        <Meta
          title={poll?.title}
          description={poll?.description}
        />
      }>
      <Collapse>
        {
          poll?.content.map((item, i) => (
            <Panel header={item.label} key={i}>
              {statByTypename(
                item.typename, {
                  item,
                  answers: poll.pollAnswers
                }
              )}
            </Panel>
          ))
        }
      </Collapse>
    </Card>
  );
};

export default Statistic;
