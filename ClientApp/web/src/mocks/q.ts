import { RQuestionnaireResponse, RQuestionnaireWithAnswer } from '@/typings/response';

export function getQuestionnaire(s: any): RQuestionnaireResponse {
  const title = s + Math.random().toFixed(15);
  const description = title;
  return {
    id: Math.floor(Math.random() * 10 ** 6),
    title,
    description,
    content: [
      {
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
        ],
      },
      {
        typename: 'checkboxgroup',
        label: '1',
        name: 'de6db8a',
        rules: [{ required: false, message: '必填项' }],
        value: [],
        options: ['a'],
      },
      {
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
        ],
      },
      {
        typename: 'input',
        label: 'o ij 9  奥地利静安寺的',
        name: 'd5c6530',
        rules: [
          { required: true, message: '必填项' },
          { whitespace: true, message: '不能为空' },
          { min: 3, max: 3 },
        ],
        value: '65466',
      },
    ],
    createdAt: new Date().toUTCString(),
  };
}

export function getQuestionnaires(): RQuestionnaireResponse[] {
  return [...Array(10).keys()].map((v) => getQuestionnaire(v));
}

export function getQuestionnaireWithAnswer(): RQuestionnaireWithAnswer {
  return {
    pollAnswers: [
      {
        id: 2,
        answer:
            '{"6a54e3c":["a","b","c"],"de6db8a":[],"173e3df":["0","1","3"],"1431ac6":"6546132131"}',
        createdAt: '2020-03-10T07:31:03.2306263',
        pollId: 5,
        userId: 2,
      },
      {
        id: 3,
        answer:
            '{"6a54e3c":["b","c"],"de6db8a":["a"],"173e3df":["0","2","3"],"1431ac6":"234234234qwr w a  "}',
        createdAt: '2020-03-10T07:31:23.278712',
        pollId: 5,
        userId: 2,
      },
    ],
    id: 5,
    createdAt: '2020-03-10T07:29:06.1456285',
    title: 'asldja',
    description: 'asldkjalsdasdj',
    isPublic: true,
    content: [
      {
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
        ],
      },
      {
        typename: 'checkboxgroup',
        label: '1',
        name: 'de6db8a',
        rules: [{ required: false, message: '必填项' }],
        value: [],
        options: ['a'],
      },
      {
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
        ],
      },
      {
        typename: 'input',
        label: 'o ij 9  奥地利静安寺的',
        name: 'd5c6530',
        rules: [
          { required: true, message: '必填项' },
          { whitespace: true, message: '不能为空' },
          { min: 3, max: 3 },
        ],
        value: '65466',
      },
    ],
  };
}
