import { createContext, Dispatch, SetStateAction } from "react";

import { QuestionnaireContentType } from "@/data-types";

export interface QuestionnaireContextType {
  addItem: (arg: QuestionnaireContentType) => void
  removeItem: (name: string) => void
  updateItem: (arg: QuestionnaireContentType) => QuestionnaireContentType | void
  forceRender: Dispatch<SetStateAction<boolean>>
}

const QuestionnaireContext = createContext<QuestionnaireContextType>({} as any);

export default QuestionnaireContext;
