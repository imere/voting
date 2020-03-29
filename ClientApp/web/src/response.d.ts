import { Questionnaire } from "@/components/Questionnaire/questionnaire";

export interface BuiltinResponse {
  username?: string[]
  password?: string[]
}
export interface CustomResponse<T> {
  code: number
  text: string
  data: T
}
export type ResponseState<T = any> = CustomResponse<T> & BuiltinResponse;

export interface RQuestionnaireResponse extends Questionnaire {
  id: number
  createdAt: string
}

export interface RQuestionnaireAnswer {
  id: number
  answer: string
  pollId: number
  userId: number
  createdAt: string
}

export interface RQuestionnaireWithAnswer extends RQuestionnaireResponse {
  pollAnswers: Array<RQuestionnaireAnswer>
}
