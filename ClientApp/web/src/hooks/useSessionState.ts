import { useState } from "react";

import { sget, sremove, sset } from "@/shared/storage";

const keySet = new Set();

function useSessionState(key: string, value: any) {
  let initial;

  function checkConsistent(oldValue: any, newValue: any) {
    if (null !== oldValue && typeof oldValue !== typeof newValue) {
      if (keySet.has(key)) {
        console.error(`Inconsistent session: ${key} (from ${typeof value} to ${typeof value})`);
      } else {
        keySet.add(key);
      }
    }
  }

  try {
    initial = JSON.parse(sget(key) as string);
    checkConsistent(initial, value);
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

  const set = function (value: string) {
    sset(key, JSON.stringify(value));
    setState(value);
  };

  return [
    state,
    set,
  ];
}

export { useSessionState };
