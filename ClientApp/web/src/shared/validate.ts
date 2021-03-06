import { RuleObject } from 'rc-field-form/es/interface';

import { None } from '@/typings/types';
import { setRulesLengthMessage, toggleRequired } from '@/components/Questionnaire/data-util';

export function lengthGt(s: string | None, len: number): boolean {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return !!RegExp(`^.{${len + 1},}$`).exec(s!);
}

export function lengthLt(s: string | None, len: number): boolean {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return !!RegExp(`^.{0,${len - 1}}$`).exec(s!);
}

export const BuiltInRules: {
  [key: string]: RuleObject
} = {
  NoSpace: {
    pattern: /^[^\s]+$/,
    message: '不能含空格',
  },
  NoEmptyString: {
    whitespace: true,
    message: '不能为空',
  },
  NoSpaceBothEnds: {
    pattern: /^[^\s]+.*[^\s]+$/,
    message: '两端不能为空',
  },
  AlphaNumOnly: {
    pattern: /^[a-zA-Z0-9]+$/,
    message: '只能包含字母数字',
  }
};


const commonAuthRules: RuleObject[] = [BuiltInRules.AlphaNumOnly];

export const usernameRules: RuleObject[] = [
  {
    required: true,
    message: '请输入用户名',
  },
  {
    min: 5,
    max: 15,
    message: '应为5~15位字符',
  },
  ...commonAuthRules,
];

export const passwordRules: RuleObject[] = [
  {
    required: true,
    message: '请输入密码',
  },
  {
    min: 6,
    max: 16,
    message: '应为6~16位字符',
  },
  ...commonAuthRules,
];


const commonQRules: RuleObject[] = [BuiltInRules.NoEmptyString];

export const titleRules: RuleObject[] = toggleRequired(
  setRulesLengthMessage([
    {
      max: 20,
    },
    ...commonQRules,
  ], '长度')
);

export const descriptionRules: RuleObject[] = setRulesLengthMessage([
  {
    max: 100,
  },
  ...commonQRules,
], '长度');
