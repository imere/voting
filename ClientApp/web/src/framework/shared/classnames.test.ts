import { classnames } from './classnames';

test('clasnames', () => {
  const names = [
    '1',
    'q',
    '',
    undefined,
    '2',
    '3',
    null,
  ];
  expect(classnames(...names)).toBe('1 q 2 3');
});
