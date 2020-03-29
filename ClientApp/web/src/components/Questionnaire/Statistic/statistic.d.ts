import { QuestionnaireAnswer, QuestionnaireContentType } from '../questionnaire';

export interface ChartReceivedProps {
  item: QuestionnaireContentType
  answers: Array<QuestionnaireAnswer>
}

export type ObjectData = {
  [k: string]: number
}

export type ArrayData = Array<{ name: string, count: number }>

export interface Margin {
  top: number
  bottom: number
  left: number
  right: number
}

export interface Geometry {
  width: number
  height: number
  margin: Margin
}
