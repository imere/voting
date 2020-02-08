import { FormEvent } from "react";

export function eventTrusted(ev: MouseEvent | FormEvent): boolean {
  if ("boolean" === typeof ev.isTrusted) {
    return ev.isTrusted;
  }
  return true;
}
