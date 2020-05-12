import { hashItemId, isRequired, getLengthObject, stripRulesLengthMessage, setRuleLengthMessage, setRequiredMessage, toggleRequired } from '@/components/Questionnaire/data-util';

let source: number[];
let salt: string;

beforeAll(() => {
  source = [...Array(1000).keys()];
  salt = Math.random().toString();
});

afterAll(() => {
  source = null as any;
  salt = null as any;
});

test('Function: hashItemId get same hash with same salt', () => {
  expect(
    source.length
  ).toEqual(
    [...new Set(source.map((s) => hashItemId(s as any)))].length
  );
});

test('Function: hashItemId get different hashes with different salt', () => {
  expect(
    source.every((s) => hashItemId(s as any) !== hashItemId(s as any, salt))
  ).toBe(true);
});

test('Function: isRequired works well', () => {
  expect(
    isRequired([
      {},
      { required: true }
    ])
  ).toBe(true);

  expect(
    isRequired([
      {},
      { required: false }
    ])
  ).toBe(false);

  expect(
    isRequired([{}])
  ).toBe(false);
});

test('Function: getLengthObject works well', () => {
  expect(
    getLengthObject([{ min: undefined , max: undefined, message: 'msg' }])
  ).toBe(undefined);

  expect(
    getLengthObject([
      { max: 4 },
      { min: 2 , max: 6 },
    ])
  ).toEqual({ max: 4 });

  expect(
    getLengthObject([
      { min: 2 },
      { max: 4 },
    ])
  ).toEqual({ min: 2 });
});

test('Function: stripRulesLengthMessage works well', () => {
  expect(
    stripRulesLengthMessage([{ min: undefined , max: undefined, message: 'msg' }])
  ).toEqual([{ min: undefined , max: undefined, message: 'msg' }]);

  expect(
    stripRulesLengthMessage([
      { max: 4, message: 'msg' },
      { min: 2 , max: 6, message: 'msg' },
    ])
  ).toEqual([
    { max: 4 },
    { min: 2 , max: 6, message: 'msg' },
  ]);
});

test('Function: setRuleLengthMessage works well', () => {
  const name = 'a name';

  expect(
    setRuleLengthMessage({ min: undefined , max: undefined, message: 'msg' }, name)
  ).toBe(undefined);

  expect(
    setRuleLengthMessage({ min: 8, message: 'msg' }, name)
  ).toEqual({ min: 8, message: `${name}不能小于8` });

  expect(
    setRuleLengthMessage({ max: 3, message: 'msg' }, name)
  ).toEqual({ max: 3, message: `${name}不能大于3` });

  expect(
    setRuleLengthMessage({ min: 8, max: 3, message: 'msg' }, name)
  ).toEqual({ min: 8 , max: 3, message: `${name}应为8 ~ 3` });

  expect(
    setRuleLengthMessage({ min: 5, max: 5, message: 'msg' }, name)
  ).toEqual({ min: 5 , max: 5, message: `${name}应为5` });
});

test('Function: setRequiredMessage works well', () => {
  const message = 'a message';

  expect(
    setRequiredMessage([
      {},
      { required: true }
    ], message)
  ).toEqual([
    {},
    { required: true, message }
  ]);

  expect(
    setRequiredMessage([{}], message)
  ).toEqual([{}]);
});

test('Function: toggleRequired works well', () => {
  const message = 'a message';

  expect(
    toggleRequired([
      {},
      { required: true, message }
    ])
  ).toEqual([
    {},
    { required: false, message }
  ]);

  expect(
    toggleRequired([
      {},
      { required: true, message },
      { required: false, message },
    ])
  ).toEqual([
    {},
    { required: false, message },
    { required: false, message },
  ]);

  expect(
    toggleRequired([{ message: 'msg' }])
  ).toEqual([
    { required: true, message: '必填项' },
    { message: 'msg' }
  ]);
});
