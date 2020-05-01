import { lset } from '@/framework/shared/storage';
import { QItemDefaultData } from '@/components/Questionnaire/util';
import { RQuestionnaireResponse, RQuestionnaireWithAnswer } from '@/typings/response';

export function setUser() {
  lset(
    'oidc.user:http://localhost:61598:js',
    JSON.stringify({
      'id_token':
        'eyJhbGciOiJSUzI1NiIsImtpZCI6ImI4M2EyOWYwM2Q3YWJjMzAyYTM3M2Q1OWI0ODNmMGFhIiwidHlwIjoiSldUIn0.eyJuYmYiOjE1ODIxODMxOTgsImV4cCI6MTU4MjE4MzQ5OCwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo2MTU5OCIsImF1ZCI6ImpzIiwibm9uY2UiOiI0Y2E1YzUwZmRkNTY0MmQzOWQwYjE5NjBlYmE5ODhkOCIsImlhdCI6MTU4MjE4MzE5OCwiYXRfaGFzaCI6InJXeWJPbE9rVUJOeVBVUDN4aDVpZ1EiLCJzaWQiOiJmYzE0MjVkOWNlOGM4N2Q0MDJmMDNkNGVjMDM5YzI4NyIsInN1YiI6IjE4IiwiYXV0aF90aW1lIjoxNTgyMTgzMTk3LCJpZHAiOiJsb2NhbCIsImFtciI6WyJwd2QiXX0.xq-p6kiHceHwZgJ6L0J56JdM0O86KHa8WQcbJLyegwj-REVlgls8DXqJz3tFhvpZ1nDCQoQXWZVb-B1_ovQ_xPFZmBNOZAf81T6xfUNYnOfGv08h0oPIAg3rkZ6bCu7tJXMS_-2_rN0C7oSbsEU2o-sxvoJty8odYInzp5BEKav4gYAZr8sejXR7alIJ_a4rYXBjtynme5D0bEZ-mcv1peZeS7Yaie24Ex-_CemPbAEIl8ybxhk40Lms_hUa0T6CTqfrFJ9eHPowHGjbeq_M8S_blLLbqcqAn_oKNgOjWovEX01C3T9IsFvBPSaGET7wN5SGa4P9jugvM5lz6FVEjQ',
      'session_state':
        '13fB6qhqTgMfy-Z_skPIs4U099S4I9UWzpha9u0DpO4.3dcd3f5663cf5cda4eff44f74ba8e623',
      'access_token':
        'eyJhbGciOiJSUzI1NiIsImtpZCI6ImI4M2EyOWYwM2Q3YWJjMzAyYTM3M2Q1OWI0ODNmMGFhIiwidHlwIjoiSldUIn0.eyJuYmYiOjE1ODIxODMxOTgsImV4cCI6MTU4MjE4Njc5OCwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo2MTU5OCIsImF1ZCI6WyJodHRwOi8vbG9jYWxob3N0OjYxNTk4L3Jlc291cmNlcyIsImFwaTEiXSwiY2xpZW50X2lkIjoianMiLCJzdWIiOiIxOCIsImF1dGhfdGltZSI6MTU4MjE4MzE5NywiaWRwIjoibG9jYWwiLCJuYW1lIjoiMTIzMTIzIiwic2NvcGUiOlsib3BlbmlkIiwicHJvZmlsZSIsImFwaTEiXSwiYW1yIjpbInB3ZCJdfQ.uzOZikp_ySXvNjNl95Ii2Nwigtag6gw0gJGPGSztKanr2ubrvHc-GyYH_DOH0Za49WKbIeLDrxi6otgrZFSRi9kjf9s67izy19ofTMEX2Qb5d87ojEVwgZQVR9I5c8M6pN0DYFcSAfSuQXKHG56jl7ECRYL2MURD5u-r9FMu_TgQYhkFIjEhtmVoTLre8xfHTfSfKwxSKIvfIcY4HW_BpiUrI37voYCcdBQSslYckyCdpt2s4CI6wzpcN2PP1B85PNiqi_YuA2BiSiuU_iupSo0Oizioq1SJTEpPIQyHiBlJqj0gePylVoUpN-iAeqFARBqZNu-BrFdxHqFkbY_r9Q',
      'token_type': 'Bearer',
      scope: 'openid profile myapi',
      profile: {
        sid: 'fc1425d9ce8c87d402f03d4ec039c287',
        sub: '1',
        'auth_time': Date.now() / 1000,
        idp: 'local',
        amr: ['pwd'],
        name: '1234567890',
      },
      'expires_at': Date.now() / 1000 + 1 * 60 * 60,
    })
  );
}

function getQuestionnaire(s: any): RQuestionnaireResponse {
  const title = s + Math.random().toFixed(15);
  const description = title;
  return {
    id: Math.floor(Math.random() * 10 ** 6),
    title,
    description,
    content: [
      QItemDefaultData.input(),
      QItemDefaultData.checkboxgroup(),
      QItemDefaultData.input(),
      QItemDefaultData.checkboxgroup(),
      QItemDefaultData.input(),
      QItemDefaultData.checkboxgroup(),
      QItemDefaultData.checkboxgroup(),
      QItemDefaultData.input(),
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
            '{"6a54e3c":["lkj","f","k"],"de6db8a":["AAAAAA"],"173e3df":["AAAAAA","7","8","9","-",";","."],"1431ac6":"6546132131"}',
        createdAt: '2020-03-10T07:31:03.2306263',
        pollId: 5,
        userId: 2,
      },
      {
        id: 3,
        answer:
            '{"6a54e3c":["lkj","h","k"],"de6db8a":["AAAAAA"],"173e3df":["AAAAAA","3","4","\'",";","."],"1431ac6":"234234234qwr w a  "}',
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
          'lkj',
          'a',
          'd',
          'f',
          'g',
          'h',
          'j',
          'k'
        ],
        value: [
          'lkj',
          'f'
        ],
      },
      {
        typename: 'checkboxgroup',
        label: '1',
        name: 'de6db8a',
        rules: [{ required: false, message: '必填项' }],
        value: [],
        options: ['AAAAAA'],
      },
      {
        typename: 'checkboxgroup',
        label: '7867876767678222245376786',
        name: '173e3df',
        rules: [{ required: true, message: '必填项' }],
        options: [
          'AAAAAA',
          '2',
          '3',
          '4',
          '5',
          '6',
          '7',
          '8',
          '9',
          '0',
          '-',
          '=',
          ']',
          '[',
          '\'',
          ';',
          '.',
          '/',
        ],
        value: [
          'AAAAAA',
          '\'',
          ';',
          '.',
          '9',
          '8'
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
