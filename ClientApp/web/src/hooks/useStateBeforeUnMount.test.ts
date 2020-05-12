import { act, renderHook } from '@testing-library/react-hooks';

import { useStateBeforeUnMount } from './useStateBeforeUnMount';

test('hook: useSetStateIfTrue works', () => {
  const value = 'value';

  const { result, unmount } = renderHook(() => useStateBeforeUnMount(value));

  act(() => {
    result.current[1](value);
  });

  expect(result.current[0]).toBe(value);

  act(() => {
    unmount();
    result.current[1]('another value?');
  });

  expect(result.current[0]).toBe(value);

});
