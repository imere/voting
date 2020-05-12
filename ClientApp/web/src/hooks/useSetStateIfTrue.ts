import { useState } from 'react';

function useSetStateIfTrue<T = any>(value: T, isTrueRef: React.MutableRefObject<boolean>): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [
    state,
    setState
  ] = useState(value);

  const set: React.Dispatch<React.SetStateAction<any>> = function (value: any) {
    if (!isTrueRef.current) {
      return;
    }
    if (typeof value === 'function') {
      setState((prev: any) => value(prev));
    } else {
      setState(value);
    }
  };

  return [
    state,
    set,
  ];
}

export { useSetStateIfTrue };
