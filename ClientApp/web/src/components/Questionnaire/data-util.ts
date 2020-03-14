import { MD5 } from "object-hash";
import { RuleObject } from "rc-field-form/es/interface";
import { message } from "antd";

import { QuestionnaireContentType } from "@/components/Questionnaire/questionnaire";
import { QuestionnaireExtended } from "@/data-types";

export function hashItemId(id: string, salt = "") {
  return MD5(id + salt).slice(0, 7);
}

export function hashName(id: string) {
  return hashItemId(id, Math.random().toFixed(15));
}

export function isRequired(rules: RuleObject[]): boolean {
  return rules.some((rule) => rule.required);
}

export function getLengthObject(rules: RuleObject[]): RuleObject | undefined {
  const lengthObject = rules.find((rule) => typeof rule.max !== "undefined" || typeof rule.min !== "undefined");
  if (!lengthObject) {
    return;
  }
  return lengthObject;
}

export function setRuleLengthMessage(rule: RuleObject, name = "长度"): RuleObject | undefined {
  if (typeof rule.min === "undefined" && typeof rule.max === "undefined") {
    return;
  }
  if (typeof rule.min === "undefined") {
    rule.message = `${name}不能大于${rule.max}`;
    return rule;
  }
  if (typeof rule.max === "undefined") {
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

export function setRulesLengthMessage(rules: RuleObject[], name = "长度"): RuleObject[] {
  for (const rule of rules) {
    if (setRuleLengthMessage(rule, name)) {
      break;
    }
  }
  return rules;
}

export function setItemsLengthMessage(items: QuestionnaireContentType[]): void {
  const map: {
    [K in QuestionnaireContentType["typename"]]?: string
  } = {
    checkboxgroup: "选项数",
  };
  for (const item of items) {
    setRulesLengthMessage(item.rules, map[item.typename]);
  }
}

export function stripRulesLengthMessage(rules: RuleObject[]): RuleObject[] {
  for (const rule of rules) {
    if (typeof rule.min !== "undefined" || typeof rule.max !== "undefined") {
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

export function setRequiredMessage(rules: RuleObject[], message = "必填项"): RuleObject[] {
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
    if (typeof rule.required === "undefined") {
      return false;
    }
    rule.required = !rule.required;
    return true;
  });
  if (!hasRequireSet) {
    rules.unshift({
      required: true,
      message: "必填项",
    });
  }
  return rules;
}

export function checkQuestionnaireValid(content: Array<QuestionnaireContentType>): void {
  if (!Array.isArray(content)) {
    throw "Error";
  }
}

export function getRegExpFromString(regStr: string): RegExp {
  return RegExp(regStr);
}

/**
 * Use when server may response without deserializing `content`
 */
export function unifyDataSource(questionnaire: QuestionnaireExtended): QuestionnaireExtended {
  try {
    questionnaire.content = typeof questionnaire.content === "string"
      ? JSON.parse(questionnaire.content)
      : questionnaire.content;
    checkQuestionnaireValid(questionnaire.content);
    for (const item of questionnaire.content) {
      for (const rule of item.rules) {
        setRuleLengthMessage(rule);
        if (rule.pattern && typeof rule.pattern === "string") {
          rule.pattern = getRegExpFromString(rule.pattern);
        }
      }
    }
  } catch {
    message.error("问卷错误", 3);
    questionnaire.content = [];
  }
  return questionnaire;
}

/**
 * Helper to get `items` values ready for antd `Form` values
 */
export function getItemsValues(items: Array<QuestionnaireContentType>) {
  const ret = {};
  items.forEach(({ name, value }) => {
    Reflect.defineProperty(ret, name, {
      enumerable: true,
      value,
    });
  });
  return ret;
}
