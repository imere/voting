import { createContext } from "react";

import { QuestionnaireContentType } from "@/data-types";

export interface QuestionnaireContextType {
  getItem: (name: string) => QuestionnaireContentType | undefined
  addItem: (arg: QuestionnaireContentType) => void
  removeItem: (name: string) => void
  updateItem: (arg: QuestionnaireContentType) => QuestionnaireContentType | void
  forceRender: () => void
}

const QuestionnaireContext = createContext<QuestionnaireContextType>({
  getItem() {
    throw "getItem not implemented";
  },
  addItem() {
    throw "getItem not implemented";
  },
  removeItem() {
    throw "getItem not implemented";
  },
  updateItem() {
    throw "getItem not implemented";
  },
  forceRender() {
    throw "getItem not implemented";
  }
} as any);

export default QuestionnaireContext;
