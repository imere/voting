import { createContext } from "react";

import { QEventBus } from "@/components/Questionnaire/QEventBus";

const QuestionnaireContext = createContext<QEventBus>(new QEventBus());

export { QuestionnaireContext };
