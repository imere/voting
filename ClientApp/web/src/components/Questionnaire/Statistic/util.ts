import { createElement } from "react";

import { holdOn } from "@/shared/holdOn";
import { QuestionnaireAnswer, QuestionnaireContentType } from "@/components/Questionnaire/questionnaire";

import { BarChart } from "./BarChart";
import { NoStat } from "./NoStat";
import { ObjectData, ArrayData, ChartReceivedProps } from "./statistic";

function extractor(typename: QuestionnaireContentType["typename"]): (item: QuestionnaireContentType, answers: Array<QuestionnaireAnswer>) => Array<any> {
  switch (typename) {
  case "checkboxgroup":
    return ({ name }, answers) => {
      const res: Array<string[]> = [];
      for (const { answer } of answers) {
        res.push(answer[name] as string[]);
      }
      return res;
    };
  default:
    return holdOn([]);
  }
}

export function extractAnswersToArray(item : QuestionnaireContentType, answers: Array<QuestionnaireAnswer>): Array<QuestionnaireContentType["value"]> {
  const { typename } = item;
  const fn = extractor(typename);
  const res = fn && fn(item, answers);
  return res;
}

export function transformToObjectData(values: Array<QuestionnaireContentType["value"]>): ObjectData {
  if (typeof values[0] === "string") {
    const res: ReturnType<typeof transformToObjectData> = {};
    for (const value of values as string[]) {
      if (typeof res[value] === "undefined") {
        res[value] = 0;
      }
      res[value]++;
    }
    return res;
  }

  if (Array.isArray(values[0])) {
    const res: ReturnType<typeof transformToObjectData> = {};
    for (const value of values as string[][]) {
      for (const inner of value) {
        if (typeof res[inner] === "undefined") {
          res[inner] = 0;
        }
        res[inner]++;
      }
    }
    return res;
  }

  return {};
}

export function transformObjectToArrayData(data: ReturnType<typeof transformToObjectData>): ArrayData {
  const res: ReturnType<typeof transformObjectToArrayData> = [];
  for (const k of Object.keys(data)) {
    res.push({ name: k, count: data[k] });
  }
  return res;
}

/**
 * Returns a chart corresponding to the typename
 *
 * @export
 * @param {QuestionnaireContentType["typename"]} typename
 * @param {ChartReceivedProps} props
 * @returns
 */
export function statByTypename(typename: QuestionnaireContentType["typename"], props: ChartReceivedProps) {
  switch (typename) {
  case "checkboxgroup":
    return createElement(BarChart, props);
  default:
    return createElement(NoStat);
  }
}
