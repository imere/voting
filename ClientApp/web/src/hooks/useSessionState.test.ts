import { act, renderHook } from '@testing-library/react-hooks';

import { useSessionState } from './useSessionState';

afterEach(() => {
  sessionStorage.clear();
});

test('hook: useSessionState works', () => {
  const key = 'key';
  const value = 'false';

  const { result: { current } } = renderHook(() => useSessionState(key, value));

  const [, setState] = current;

  // value not stored yet
  expect(sessionStorage.getItem(key)).toBe(null);

  act(() => {
    setState((prev) => {
      expect(prev).toBe(value);
      return !prev as any;
    });
  });

  // JSON.stringify(value) stored after setState
  expect(sessionStorage.getItem(key)).toBe(JSON.stringify(false));

});
