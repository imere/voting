import { ThemeActions } from '.';

test('No duplicate ThemeActions', () => {
  const actions = Object.values(ThemeActions);
  expect(
    actions.length
  ).toEqual(
    [...new Set(actions)].length
  );
});
