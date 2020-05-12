import { createElement } from 'react';

import { Answer, QuestionnaireContentType, QuestionnaireWithAnswer } from '@/components/Questionnaire/questionnaire';
import { Logger } from '@/framework/shared/logger';

import { BarChart } from './BarChart';
import { NoStat } from './NoStat';
import { ChartReceivedProps, Info, ObjectData, StatisticData } from './statistic';

function getInfoMap(items: QuestionnaireContentType[] = []): Map<string, Info> {
  const res = new Map<string, Info>();
  if (!Array.isArray(items)) {
    Logger.warn(`content type ${typeof items} received, but iterable expected`);
  }
  for (const item of items) {
    res.set(item.name, item);
  }
  return res;
}

/**
 * Extract answers to array
 *
 * In:
 * {
 *  pollAnswers: [{
 *    answer: {
 *      name1: value1 | Array<value>1
 *      name2: value2 | Array<value>2
 *    }
 *  }, {
 *    answer: {
 *      name1: value3 | Array<value>3
 *      name2: value4 | Array<value>4
 *    }
 *  }
 * }]
 *
 * Out:
 * [{
 *  name1: value1 | Array<value>1
 *  name2: value2 | Array<value>2
 * }, {
 *  name1: value3 | Array<value>3
 *  name2: value4 | Array<value>4
 * }]
 */
function extractAnswersToArray(questionnaire: QuestionnaireWithAnswer): Array<Answer> {
  const res: ReturnType<typeof extractAnswersToArray> = [];
  const { pollAnswers } = questionnaire;
  for (const { answer } of pollAnswers) {
    res.push(answer);
  }
  return res;
}

function transformer(name: string, valueOrS: Answer[keyof Answer], res: ObjectData): void {
  if (typeof res[name] === 'undefined') {
    res[name] = {};
  }

  const accumulator = res[name] as { [value: string]: number; };

  if (Array.isArray(valueOrS)) {
    for (const value of valueOrS) {
      if (typeof accumulator[value] === 'undefined') {
        accumulator[value] = 0;
      }
      accumulator[value]++;
    }
  } else if (typeof valueOrS !== 'undefined') {
    if (typeof accumulator[valueOrS] === 'undefined') {
      accumulator[valueOrS] = 0;
    }
    accumulator[valueOrS]++;
  }

}

/**
 * Count answers using object
 *
 * In:
 * [{
 *  name1: value1 | Array<value>1
 *  name2: value2 | Array<value>2
 * }, {
 *  name1: value3 | Array<value>3
 *  name2: value4 | Array<value>4
 * }]
 *
 * Out:
 * {
 *  name1: {value1: count, value3: count}
 *  name2: {value2: count, value4: count}
 * }
 */
function transformToObjectData(answerArr: ReturnType<typeof extractAnswersToArray>): ObjectData {
  const res: ReturnType<typeof transformToObjectData> = {};

  for (const answer of answerArr) {
    for (const [
      name,
      valueOrS
    ] of Object.entries(answer)) {
      transformer(name, valueOrS, res);
    }
  }

  return res;
}

/**
 * Get answers with corresponding original question information
 *
 * In:
 * {
 *  name1: {value1: count, value3: count}
 *  name2: {value2: count, value4: count}
 * }
 *
 * Out:
 * [{
 *  info: {question1 info}
 *  name: name1,
 *  count: {value1: count, value3: count}
 * }, {
 *  info: {question2 info}
 *  name: name2,
 *  count: {value2: count, value4: count}
 * }]
 */
function transformToStatisticData(data: ReturnType<typeof transformToObjectData>, map: ReturnType<typeof getInfoMap>): StatisticData {
  const res: ReturnType<typeof transformToStatisticData> = [];
  for (const [
    name,
    count
  ] of Object.entries(data)) {
    res.push({ info: map.get(name) as Info, name, count });
  }
  return res;
}

export function processQuestionnaireWithAnswer(questionnaire: QuestionnaireWithAnswer): ReturnType<typeof transformToStatisticData> {
  return transformToStatisticData(
    transformToObjectData(
      extractAnswersToArray(questionnaire)
    ),
    getInfoMap(questionnaire.content)
  );
}

/**
 * Returns a chart corresponding to the typename
 *
 * @export
 * @param {QuestionnaireContentType["typename"]} typename
 * @param {ChartReceivedProps} props
 * @returns
 */
export function statByTypename(typename: QuestionnaireContentType['typename'], props: ChartReceivedProps) {
  switch (typename) {
  case 'checkboxgroup':
  case 'number':
    return createElement(BarChart, props);
  default:
    return createElement(NoStat);
  }
}


/**
 * Parse each StatisticData from Object to Array for a single d3 chart to use easily
 *
 * @export
 * @param {StatisticData[number]} data
 * @returns
 */
export function parseFromStatisticData(data: StatisticData[number]) {
  const arr: Array<{ value: string; count: number; }> = [];
  for (const [
    value,
    count
  ] of Object.entries(data.count)) {
    arr.push({ value, count });
  }
  return arr;
}
