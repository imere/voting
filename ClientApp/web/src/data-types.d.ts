import { Questionnaire } from "@/components/Questionnaire/questionnaire";

declare interface BuiltinResponse {
  username?: string[]
  password?: string[]
}
declare interface CustomResponse<T> {
  code: number
  text: string
  data: T
}
declare type ResponseState<T = any> = CustomResponse<T> & BuiltinResponse;

declare type QuestionnaireExtended = Questionnaire & {
  id: number
  createdAt: string
}
