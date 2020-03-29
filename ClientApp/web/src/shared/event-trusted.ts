import { FormEvent } from "react";

export function eventTrusted(ev: MouseEvent | FormEvent): boolean {
  if (typeof ev.isTrusted === "boolean") {
    return ev.isTrusted;
  }
  return true;
}
