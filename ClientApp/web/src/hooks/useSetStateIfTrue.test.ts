import { act, renderHook } from '@testing-library/react-hooks';
import { useRef } from 'react';

import { useSetStateIfTrue } from './useSetStateIfTrue';

test('hook: useSetStateIfTrue works', () => {
  let ref: React.MutableRefObject<boolean>;
  const value = 'value';

  const { result } = renderHook(() => {
    const r = useRef(true);
    ref = r;
    return useSetStateIfTrue(value, r);
  });

  act(() => {
    result.current[1](value);
  });

  expect(result.current[0]).toBe(value);

  act(() => {
    ref.current = false;
    result.current[1]('another value?');
  });

  expect(result.current[0]).toBe(value);

});
