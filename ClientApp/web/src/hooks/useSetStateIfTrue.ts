import { useState } from "react";

function useSetStateIfTrue(value: any, isTrueRef: React.MutableRefObject<boolean>) {
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
