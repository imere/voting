import { createContext } from "react";

import { QuestionnaireContentType } from "@/data-types";

export interface QuestionnaireContextType {
  getItem: (name: string) => QuestionnaireContentType | undefined
  addItem: (arg: QuestionnaireContentType) => void
  removeItem: (name: string) => void
  updateItem: (arg: QuestionnaireContentType) => QuestionnaireContentType | void
  forceRender: () => void
}

const QuestionnaireContext = createContext<QuestionnaireContextType>({} as any);

export default QuestionnaireContext;
