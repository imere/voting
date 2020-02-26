import { AuthActions } from ".";

test("No duplicate AuthActions", () => {
  const actions = Object.values(AuthActions);
  expect(
    actions.length
  ).toEqual(
    [...new Set(actions)].length
  );
});
