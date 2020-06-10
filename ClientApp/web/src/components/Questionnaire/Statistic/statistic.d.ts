import { QuestionnaireContentType } from '@/components/Questionnaire/questionnaire';

export interface ChartReceivedProps {
  data: StatisticData[number];
}

export interface Info {
  typename: QuestionnaireContentType['typename'];
  label: QuestionnaireContentType['label'];
}

export type ObjectData = Record<string, Record<string, number>>;

export type StatisticData = Array<{
  info: Info;
  name: string;
  count: Record<string, number>;
}>;

export interface Margin {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

export interface Geometry {
  width: number;
  height: number;
  margin: Margin;
}
