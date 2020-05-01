import { hashItemId } from './data-util';

let source: number[];
let salt: string;

beforeAll(() => {
  source = [...Array(1000).keys()];
  salt = Math.random().toString();
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

afterAll(() => {
  source = null as any;
  salt = null as any;
});