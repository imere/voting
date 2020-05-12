import { AuthActions } from '.';

test('No duplicate auth actions', () => {
  const actions = Object.values(AuthActions);
  expect(
    actions.length
  ).toEqual(
    [...new Set(actions)].length
  );
});
