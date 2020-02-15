import { useState } from "react";

import storage from "@/shared/storage";
import { None } from "@/types";

const keySet = new Set();

function useSessionState(key: string, value: any) {
  const { sget, sset, sremove } = storage;
  let initial;

  function checkConsistent(value: string | None) {
    if (null !== value && typeof value !== typeof value) {
      if (keySet.has(key)) {
        console.error(`Inconsistent session: ${key} (from ${typeof value} to ${typeof value})`);
      } else {
        keySet.add(key);
      }
    }
  }

  try {
    initial = JSON.parse(sget(key) as string);
    checkConsistent(initial);
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
