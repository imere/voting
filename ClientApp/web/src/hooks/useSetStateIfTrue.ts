import { useState } from 'react';

function useSetStateIfTrue<T = any>(value: T, isTrueRef: React.MutableRefObject<boolean>): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [
    state,
    setState
  ] = useState(value);

  const set: React.Dispatch<React.SetStateAction<any>> = function (val) {
    if (!isTrueRef.current) {
      return;
    }
    if (typeof val === 'function') {
      setState((prev: any) => val(prev));
    } else {
      setState(val);
    }
  };

  return [
    state,
    set,
  ];
}

export { useSetStateIfTrue };
