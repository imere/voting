import { useState } from "react";

import storage from "@/shared/storage";

const keySet = new Set();

function useSessionState(key: string, value: any) {
  const { sget, sset, sremove } = storage;
  let initial;
  try {
    initial = JSON.parse(sget(key) as string);

    if (null !== initial && typeof initial !== typeof value) {
      if (keySet.has(key)) {
        console.error(`Inconsistent session: ${key} (from ${typeof initial} to ${typeof value})`);
      } else {
        keySet.add(key);
      }
    }

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
