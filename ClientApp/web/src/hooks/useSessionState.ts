import { useState } from 'react';

import { sget, sremove, sset } from '@/shared/storage';

const keySet = new Set();

function checkConsistent(key: string, oldValue: any, newValue: any) {
  if (null !== oldValue && typeof oldValue !== typeof newValue) {
    if (keySet.has(key)) {
      console.warn(`Inconsistent session: ${key} from ${typeof oldValue} to ${typeof newValue}`);
    } else {
      keySet.add(key);
    }
  }
}

/**
 * store state to session storage
 */
function useSessionState<T = any>(key: string, value: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  let initial;

  try {
    initial = JSON.parse(sget(key) as string);
    checkConsistent(key, initial, value);
  } catch {
    sremove(key);
  }

  const [
    state,
    setState
  ] = useState(
    null !== initial
      ? initial
      : value
  );

  const set: React.Dispatch<React.SetStateAction<any>> = function (value) {
    let v = value;
    if (typeof value === 'function') {
      setState((prev: any) => v = value(prev));
    } else {
      setState(value);
    }
    sset(key, JSON.stringify(v));
  };

  return [
    state,
    set,
  ];
}

export { useSessionState };
