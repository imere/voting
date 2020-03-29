import { useEffect, useRef } from "react";

import { useSetStateIfTrue } from "./useSetStateIfTrue";

/**
 * `setState` only take effect before unmount
 */
function useStateBeforeUnMount<T = any>(value: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const mountedRef = useRef(true);

  const [
    state,
    setState
  ] = useSetStateIfTrue(value, mountedRef);

  useEffect(() => () => (mountedRef.current = false) as any as undefined, []);

  return [
    state,
    setState,
  ];
}

export { useStateBeforeUnMount };
