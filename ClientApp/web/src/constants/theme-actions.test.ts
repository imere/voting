import { ThemeActions } from '.';

test('No duplicate theme actions', () => {
  const actions = Object.values(ThemeActions);
  expect(
    actions.length
  ).toEqual(
    [...new Set(actions)].length
  );
});
