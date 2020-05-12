import { StatisticData } from '@/components/Questionnaire/Statistic/statistic';
import { QuestionnaireWithAnswer } from '@/components/Questionnaire/questionnaire';
import { unifyQuestionnaireWithAnswer } from '@/components/Questionnaire/data-util';
import { getQuestionnaireWithAnswer } from '@/mocks/q';
import { processQuestionnaireWithAnswer, parseFromStatisticData } from './util';

let qWithAnswer: QuestionnaireWithAnswer,
  data: StatisticData;

beforeAll(() => {
  qWithAnswer = unifyQuestionnaireWithAnswer(getQuestionnaireWithAnswer());
  data = processQuestionnaireWithAnswer(qWithAnswer);
});

afterAll(() => {
  qWithAnswer = null as any;
  data = null as any;
});

test('function processQuestionnaireWithAnswer works well', () => {
  expect(data).toEqual([
    {
      info: {
        typename: 'checkboxgroup',
        label: '0',
        name: '6a54e3c',
        rules: [{ required: true, message: '必填项' }],
        options: [
          'a',
          'b',
          'c',
        ],
        value: [
          'a',
          'b'
        ]
      },
      name: '6a54e3c',
      count: { a: 1, b: 2, c: 2 }
    },
    {
      info: {
        typename: 'checkboxgroup',
        label: '1',
        name: 'de6db8a',
        rules: [{ required: false, message: '必填项' }],
        value: [],
        options: ['a']
      },
      name: 'de6db8a',
      count: { a: 1 }
    },
    {
      info: {
        typename: 'checkboxgroup',
        label: '7867876767678222245376786',
        name: '173e3df',
        rules: [{ required: true, message: '必填项' }],
        options: [
          '0',
          '1',
          '2',
          '3',
        ],
        value: [
          '0',
          '1'
        ]
      },
      name: '173e3df',
      count: { '0': 2, '1': 1, '2': 1, '3': 2 }
    },
    {
      info: undefined,
      name: '1431ac6',
      count: { '6546132131': 1, '234234234qwr w a  ': 1 }
    }
  ]);
});

test('function parseFromStatisticData works well', () => {
  const parsed = [];
  for (const item of data) {
    parsed.push(parseFromStatisticData(item));
  }

  expect(parsed).toEqual([
    [
      { value: 'a', count: 1 },
      { value: 'b', count: 2 },
      { value: 'c', count: 2 }
    ],
    [ { value: 'a', count: 1 } ],
    [
      { value: '0', count: 2 },
      { value: '1', count: 1 },
      { value: '2', count: 1 },
      { value: '3', count: 2 }
    ],
    [
      { value: '6546132131', count: 1 },
      { value: '234234234qwr w a  ', count: 1 }
    ]
  ]);
});
