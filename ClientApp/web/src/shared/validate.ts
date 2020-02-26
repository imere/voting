import { RuleObject } from "rc-field-form/es/interface";

import { None } from "@/types";
import { setLengthMessage, toggleRequired } from "@/components/Questionnaire/utils";

export function lengthGt(s: string | None, len: number): boolean {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return !!RegExp(`^.{${len + 1},}$`).exec(s!);
}

export function lengthLt(s: string | None, len: number): boolean {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return !!RegExp(`^.{0,${len - 1}}$`).exec(s!);
}

// export function validateUsername(username: string) {
//   return lengthGt(username, 4) && lengthLt(username, 26);
// }

// export function validatePassword(password: string) {
//   return lengthGt(password, 5) && lengthLt(password, 17);
// }

// export function validateDisplayName(username: string) {
//   return lengthGt(username, 2) && lengthLt(username, 11);
// }

export const BuiltinRules = {
  NoSpace: {
    pattern: /^[^\s]+$/,
    message: "不能含空格",
  },
  NoSpaceBothEnds: {
    pattern: /^[^\s]+.*[^\s]+$/,
    message: "两端不能为空",
  },
  AlphaNumOnly: {
    pattern: /^[a-zA-Z0-9]+$/,
    message: "只能包含字母数字",
  }
};


const commonAuthRules: RuleObject[] = [BuiltinRules.AlphaNumOnly];

export const usernameRules: RuleObject[] = [
  {
    required: true,
    message: "请输入用户名",
  },
  {
    min: 5,
    max: 15,
    message: "应为5~15位字符",
  },
  ...commonAuthRules,
];

export const passwordRules: RuleObject[] = [
  {
    required: true,
    message: "请输入密码",
  },
  {
    min: 6,
    max: 16,
    message: "应为6~16位字符",
  },
  ...commonAuthRules,
];


const commonQRules: RuleObject[] = [
  {
    whitespace: true,
    message: "不能为空",
  }
];

export const titleRules: RuleObject[] = toggleRequired(
  setLengthMessage([
    {
      max: 20,
    },
    ...commonQRules,
  ])
);

export const descriptionRules: RuleObject[] = setLengthMessage([
  {
    max: 100,
  },
  ...commonQRules,
]);
