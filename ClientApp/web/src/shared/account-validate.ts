import { ValidationRule } from "antd/lib/form";

import { None } from "@/types";

export function lengthGt(s: string | None, len: number): boolean {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return !!RegExp(`^.{${len + 1},}$`).exec(s!);
}

export function lengthLt(s: string | None, len: number): boolean {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return !!RegExp(`^.{0,${len - 1}}$`).exec(s!);
}

export const usernameRules: ValidationRule[] = [
  {
    min: 5,
    max: 15,
    message: "应为5~15位非中文字符",
  },
  {
    pattern: /^[a-zA-Z0-9]+$/,
    message: "只能包含字母数字",
  }
];

export const passwordRules: ValidationRule[] = [
  {
    min: 6,
    max: 16,
    message: "应为6~16位非中文字符",
  },
  {
    pattern: /^[a-zA-Z0-9]+$/,
    message: "只能包含字母数字",
  }
];

export function validateUsername(username: string) {
  return lengthGt(username, 4) && lengthLt(username, 26);
}

export function validatePassword(password: string) {
  return lengthGt(password, 5) && lengthLt(password, 17);
}

export function validateDisplayName(username: string) {
  return lengthGt(username, 2) && lengthLt(username, 11);
}
