import { None } from "@/types";

export function classnames(...rest: (string | None)[]) {
  return [...rest].filter((name) => !!name).join(" ");
}
