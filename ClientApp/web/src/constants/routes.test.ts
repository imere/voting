import { Routes } from '.';

test('No duplicate routes', () => {
  const routes = Object.values(Routes);
  expect(
    routes.length
  ).toEqual(
    [...new Set(routes)].length
  );
});
