import { createContext } from "react";

import { QuestionnaireContentType } from "@/components/Questionnaire/questionnaire";

export interface QuestionnaireContextType {
  items: Array<QuestionnaireContentType>
  getItem: (name: string) => QuestionnaireContentType | undefined
  addItem: (arg: QuestionnaireContentType) => void
  removeItem: (name: string) => void
  updateItem: (arg: QuestionnaireContentType) => QuestionnaireContentType | void
  forceRender: () => void
}

const QuestionnaireContext = createContext<QuestionnaireContextType>({
  items: [],
  getItem() {
    throw "getItem not implemented";
  },
  addItem() {
    throw "addItem not implemented";
  },
  removeItem() {
    throw "removeItem not implemented";
  },
  updateItem() {
    throw "updateItem not implemented";
  },
  forceRender() {
    throw "forceRender not implemented";
  }
});

export default QuestionnaireContext;
