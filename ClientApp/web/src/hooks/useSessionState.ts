import { useState, useEffect } from 'react';

import { sget, sremove, sset } from '@/framework/shared/storage';
import { Logger } from '@/framework/shared/logger';

const keySet = new Set();

function checkConsistent(key: string, oldValue: any, newValue: any) {
  if (null !== oldValue && typeof oldValue !== typeof newValue) {
    if (keySet.has(key)) {
      Logger.warn(`Inconsistent session: ${key} from ${typeof oldValue} to ${typeof newValue}`);
    } else {
      keySet.add(key);
    }
  }
}

/**
 * Store state to session storage
 *
 * @template T
 * @param {string} key
 * @param {T} value
 * @returns {[T, React.Dispatch<React.SetStateAction<T>>]}
 */
function useSessionState<T = any>(key: string, value: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  let initial;

  try {
    initial = JSON.parse(sget(key) as string);
    checkConsistent(key, initial, value);
  } catch {
    sremove(key);
  }

  useEffect(() => () => keySet.clear(), []);

  const [
    state,
    setState
  ] = useState(
    null !== initial
      ? initial
      : value
  );

  const set: React.Dispatch<React.SetStateAction<any>> = function (val) {
    let v = val;
    if (typeof val === 'function') {
      setState((prev: any) => v = val(prev));
    } else {
      setState(val);
    }
    sset(key, JSON.stringify(v));
  };

  return [
    state,
    set,
  ];
}

export { useSessionState };
