import { act, renderHook } from '@testing-library/react-hooks';
import { useHttpSafe } from './useHttpSafe';

test('hook: useHttpSafe works', () => {
  const notCalled = jest.fn(function () {
    // notCalled
  });
  const onAbort = jest.fn(function () {
    // abort
  });

  const { unmount } = renderHook(() => {
    useHttpSafe('https://baidu.com').
      then(notCalled).
      catch(onAbort);
  });

  act(() => {
    unmount();
  });

  expect(notCalled).not.toBeCalled();
  expect(onAbort).toBeCalled();
});
