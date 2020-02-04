import { useState } from "react";

import storage from "@/shared/storage";

export default function (key: string, value?: string) {
  const { sget, sset } = storage;
  const inital = JSON.parse(sget(key) as string);
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
