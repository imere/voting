import { lengthGt, lengthLt } from './validate';

test('length greater than', () => {
  expect(lengthGt('123456', 5)).toBe(true);

  expect(lengthGt('123456', 6)).toBe(false);
});

test('length less than', () => {
  expect(lengthLt('123456', 7)).toBe(true);

  expect(lengthLt('123456', 6)).toBe(false);
});
