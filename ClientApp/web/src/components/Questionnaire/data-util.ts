import dayjs from 'dayjs';
import { MD5 } from 'object-hash';
import { RuleObject } from 'rc-field-form/es/interface';
import { message } from 'antd';

import { Answer, QuestionnaireContentType, QuestionnaireWithAnswer } from '@/components/Questionnaire/questionnaire';
import { RQuestionnaireResponse, RQuestionnaireWithAnswer } from '@/typings/response';

export function hashItemId(id: string, salt = '') {
  return MD5(id + salt).slice(0, 7);
}

/**
 * Returns hashed string
 *
 * @export
 * @param {string} id
 * @returns
 */
export function hashName(id: string) {
  return '_' + hashItemId(id, Math.random().toFixed(15));
}

export function isRequired(rules: RuleObject[]): boolean {
  return rules.some((rule) => rule.required);
}

export function getLengthObject(rules: RuleObject[]): RuleObject | undefined {
  const lengthObject = rules.find((rule) => typeof rule.max !== 'undefined' || typeof rule.min !== 'undefined');
  if (!lengthObject) {
    return;
  }
  return lengthObject;
}

export function stripRulesLengthMessage(rules: RuleObject[]): RuleObject[] {
  for (const rule of rules) {
    if (typeof rule.min !== 'undefined' || typeof rule.max !== 'undefined') {
      delete rule.message;
      break;
    }
  }
  return rules;
}

export function stripItemsLengthMessage(items: QuestionnaireContentType[]): QuestionnaireContentType[] {
  for (const item of items) {
    stripRulesLengthMessage(item.rules);
  }
  return items;
}

export function getLengthMessageByType(typename: QuestionnaireContentType['typename']) {
  switch (typename) {
  case 'checkboxgroup':
    return '选项数';
  case 'number':
    return '数字';
  default:
    return '长度';
  }
}

export function setRuleLengthMessage(rule: RuleObject, name: string): RuleObject | undefined {
  if (typeof rule.min === 'undefined' && typeof rule.max === 'undefined') {
    return;
  }
  if (typeof rule.min === 'undefined') {
    rule.message = `${name}不能大于${rule.max}`;
    return rule;
  }
  if (typeof rule.max === 'undefined') {
    rule.message = `${name}不能小于${rule.min}`;
    return rule;
  }
  if (rule.max === rule.min) {
    rule.message = `${name}应为${rule.min}`;
  } else {
    rule.message = `${name}应为${rule.min} ~ ${rule.max}`;
  }
  return rule;
}

export function setRulesLengthMessage(rules: RuleObject[], name: string): RuleObject[] {
  for (const rule of rules) {
    if (setRuleLengthMessage(rule, name)) {
      break;
    }
  }
  return rules;
}

export function setItemsLengthMessage(items: QuestionnaireContentType[]): QuestionnaireContentType[] {
  for (const item of items) {
    setRulesLengthMessage(item.rules, getLengthMessageByType(item.typename));
  }
  return items;
}

export function setRequiredMessage(rules: RuleObject[], message = '必填项'): RuleObject[] {
  for (const rule of rules) {
    if (rule.required) {
      rule.message = message;
      break;
    }
    continue;
  }
  return rules;
}

export function toggleRequired(rules: RuleObject[]): RuleObject[] {
  const hasRequireSet = rules.some((rule) => {
    if (typeof rule.required === 'undefined') {
      return false;
    }
    rule.required = !rule.required;
    return true;
  });
  if (!hasRequireSet) {
    rules.unshift({
      required: true,
      message: '必填项',
    });
  }
  return rules;
}

export function getRegExpFromString(reg?: string | RegExp): RegExp | undefined {
  if (typeof reg === 'string' && reg.startsWith('/') && reg.endsWith('/')) {
    reg = reg.slice(1, reg.length - 1);
  }
  return reg ? RegExp(reg) : undefined;
}

export function addHour(d: string, hour: number): string {
  return dayjs(d).
    add(hour, 'h').
    toDate().
    toLocaleString();
}

/**
 * Use when server may response without deserializing `content`
 */
export function unifyQuestionnaire(questionnaire: RQuestionnaireResponse): RQuestionnaireResponse {
  try {
    questionnaire.content = typeof questionnaire.content === 'string'
      ? JSON.parse(questionnaire.content)
      : questionnaire.content;

    questionnaire.createdAt = typeof questionnaire.createdAt === 'string'
      ? addHour(questionnaire.createdAt, 8)
      : questionnaire.createdAt;

    for (const item of (questionnaire.content || [])) {
      const msg = getLengthMessageByType(item.typename);
      for (const rule of item.rules) {
        setRuleLengthMessage(rule, msg);
        if (rule.pattern && typeof rule.pattern === 'string') {
          rule.pattern = getRegExpFromString(rule.pattern);
        }
      }
    }
  } catch {
    message.error('问卷错误', 3);
    questionnaire.content = [];
  }
  return questionnaire;
}

export function unifyQuestionnaireWithAnswer(questionnaire: RQuestionnaireWithAnswer): QuestionnaireWithAnswer {
  unifyQuestionnaire(questionnaire);
  if (!questionnaire.content.length) {
    return questionnaire as any;
  }
  for (const pollAnswer of questionnaire.pollAnswers) {
    const { answer } = pollAnswer;
    if (typeof answer === 'string') {
      try {
        pollAnswer.answer = JSON.parse(answer);
      } catch {
        pollAnswer.answer = {} as any;
      }
    }
  }
  return questionnaire as any;
}

/**
 * Helper to get `items` values ready for antd `Form` values
 */
export function getItemsValues(items: Array<QuestionnaireContentType>) {
  const ret: Answer = {};
  for (const { name, value } of items) {
    Reflect.defineProperty(ret, name, {
      enumerable: true,
      value,
    });
  }
  return ret;
}
