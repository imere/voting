import { useEffect, useRef } from "react";

import { useSetStateIfTrue } from "./useSetStateIfTrue";

function useStateBeforeUnMount<T = any>(value: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const mountedRef = useRef(true);

  const [
    state,
    setState
  ] = useSetStateIfTrue(value, mountedRef);

  useEffect(() => () => (mountedRef.current = false, void 0), []);

  return [
    state,
    setState,
  ];
}

export { useStateBeforeUnMount };
