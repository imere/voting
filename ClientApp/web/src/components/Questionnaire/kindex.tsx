import React from "react";

import { QuestionnaireExtended } from "@/data-types";

import New from "./New";

interface QuestionnaireReceivedProps {
  dataSource?: Array<QuestionnaireExtended>
}

type QuestionnaireProps = QuestionnaireReceivedProps

const QuestionnaireComponent: React.FC<QuestionnaireProps> = () => {
  // const { pathname } = location;

  // const isEditing = pathname.startsWith(Routes.POLL_EDIT);
  // const isNewForm = pathname.startsWith(Routes.POLL_NEW);

  function render() {
    return <New />;
  }

  return render();
};

export default QuestionnaireComponent;
