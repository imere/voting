import { ThemeActions } from ".";

test("No duplicate AuthActions", () => {
  const actions = Object.values(ThemeActions);
  expect(
    actions.length
  ).toEqual(
    [...new Set(actions)].length
  );
});
