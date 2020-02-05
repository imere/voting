import { useState } from "react";

import storage from "@/shared/storage";

const keySet = new Set();

function useSessionState (key: string, value: any) {
  const { sget, sset, sremove } = storage;
  let inital;
  try {
    inital = JSON.parse(sget(key) as string);
    
    if (null !== inital && typeof inital !== typeof value) {
      if (keySet.has(key)) {
        console.error(`Inconsistent session: ${key}`);
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
    null !== inital
      ? inital
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
