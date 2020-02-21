import React from "react";
import { MD5 } from "object-hash";
import { RuleObject } from "rc-field-form/lib/interface";

import QCheckBoxGroup from "@/components/Questionnaire/QCheckBoxGroup";
import QInput from "@/components/Questionnaire/QInput";
import WrapModify from "@/components/Questionnaire/WrapModify";
import WrapNormal from "@/components/Questionnaire/WrapNormal";
import { QuestionnaireContentType, TypeCheckBoxGroup, TypeInput } from "@/data-types";

import EditQCheckBoxGroup from "./WrapModify/ButtonEdit/ButtonEditOptions/EditQCheckBoxGroup";
import EditQInput from "./WrapModify/ButtonEdit/ButtonEditOptions/EditQInput";

export function hashItemId(id: string, salt = "") {
  return MD5(id + salt).slice(0, 7);
}

export function hashName(id: string) {
  return hashItemId(id, Math.random().toFixed(15));
}

export function isRequired(rules: RuleObject[]): boolean {
  return rules.some((rule) => rule.required);
}

export function getLength(rules: RuleObject[]): RuleObject | undefined {
  const length = rules.find((rule) => typeof rule.max !== "undefined" || typeof rule.min !== "undefined");
  if (!length) {
    return;
  }
  return length;
}

export function setLengthMessage(rules: RuleObject[], name = "长度"): RuleObject[] {
  rules.some((rule) => {
    if (typeof rule.min ==="undefined" && typeof rule.max ==="undefined") {
      return false;
    }
    if (typeof rule.min ==="undefined") {
      rule.message = `${name}不能大于${rule.max}`;
      return true;
    }
    if (typeof rule.max ==="undefined") {
      rule.message = `${name}不能小于${rule.min}`;
      return true;
    }
    rule.message = `${name}应为${rule.min} ~ ${rule.max}`;
    return true;
  });
  return rules;
}

export function setRequiredMessage(rules: RuleObject[], message = "必填项"): RuleObject[] {
  rules.some((rule) => {
    if (rule.required) {
      rule.message = message;
      return true;
    }
    return false;
  });
  return rules;
}

export function toggleRequired(rules: RuleObject[]): RuleObject[] {
  const req = rules.some((rule) => {
    if ("undefined" === typeof rule.required) {
      return false;
    }
    rule.required = !rule.required;
    return true;
  });
  if (!req) {
    rules.unshift({
      required: true,
      message: "必填项",
    });
  }
  return rules;
}

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

type QItemMapType = {
  [K in QuestionnaireContentType["typename"]]: React.ComponentType<any>;
};
export const QItemMap: QItemMapType = {
  "input": QInput,
  "checkboxgroup": QCheckBoxGroup,
};

export function renderQItems(edit: boolean, items: Array<QuestionnaireContentType>): any[] {
  if (edit) {
    return items.map((item, i) => (
      <WrapModify
        key={i}
        {...item}
      >
        {QItemMap[item.typename]}
      </WrapModify>
    ));
  }
  return items.map((item, i) => (
    <WrapNormal
      key={i}
      {...item}
    >
      {QItemMap[item.typename]}
    </WrapNormal>
  ));
}

type QItemDefaultDataType = {
  [K in QuestionnaireContentType["typename"]]: () => QuestionnaireContentType
}
export const QItemDefaultData: QItemDefaultDataType = {
  "input": () => ({
    typename: "input",
    label: "label",
    name: hashName("input"),
    rules: toggleRequired([
      { whitespace: true, message: "不能为空" },
      { min: 0, message: "长度不符合要求" },
    ]),
  }),
  "checkboxgroup": () => ({
    typename: "checkboxgroup",
    label: "label",
    name: hashName("checkboxgroup"),
    value: [],
    options: ["AAAAAA"],
    rules: toggleRequired([]),
  }),
};

// type QItemDataFactoryType = {
//   [K in QuestionnaireContentType["typename"]]: (prop: any) => any
// }
type QItemDataParam<T> = Omit<T, "typename" | "name"> & { name?: string }
export const QItemDataFactory = {
  "input": ({ label, ...rest }: QItemDataParam<TypeInput>): TypeInput => ({
    typename: "input",
    label,
    name: hashName(label),
    ...rest,
  }),
  "checkboxgroup": ({ label, ...rest }: QItemDataParam<TypeCheckBoxGroup>): TypeCheckBoxGroup => ({
    typename: "checkboxgroup",
    label,
    name: hashName(label),
    ...rest,
  }),
};

type ButtonEditContentType = QItemMapType
export const ButtonEditContentMap: ButtonEditContentType = {
  "input": EditQInput,
  "checkboxgroup": EditQCheckBoxGroup,
};
