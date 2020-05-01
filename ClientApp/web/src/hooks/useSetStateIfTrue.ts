import { useState } from 'react';

function useSetStateIfTrue<T = any>(value: T, isTrueRef: React.MutableRefObject<boolean>): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [
    state,
    setState
  ] = useState(value);

  const set = function (value: any) {
    if (!isTrueRef.current) {
      return;
    }
    setState(value);
  };

  return [
    state,
    set,
  ];
}

export { useSetStateIfTrue };
