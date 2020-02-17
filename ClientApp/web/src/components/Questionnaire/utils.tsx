import loadable from "@loadable/component";
import React from "react";
import { MD5 } from "object-hash";
import { Rule, RuleObject } from "rc-field-form/lib/interface";

import QCheckBoxGroup from "@/components/Questionnaire/QCheckBoxGroup";
import QInput from "@/components/Questionnaire/QInput";
import WrapModify from "@/components/Questionnaire/WrapModify";
import WrapNormal from "@/components/Questionnaire/WrapNormal";
import { QuestionnaireContentType, TypeCheckBoxGroup, TypeInput } from "@/data-types";

export function hashItemId(id: string, salt = "") {
  return MD5(id + salt).slice(0, 7);
}

export function hashName(id: string) {
  return hashItemId(id, Math.random().toFixed(15));
}

export function isRequired(rules: Rule[]): boolean {
  return rules.some((rule) => (rule as RuleObject).required);
}

export function setRequiredMessage(rules: Rule[], message = "必填项"): Rule[] {
  (rules as RuleObject[]).some((rule) => {
    if (rule.required) {
      rule.message = message;
      return true;
    }
    return false;
  });
  return rules;
}

export function toggleRequired(rules: Rule[]): Rule[] {
  const req = (rules as RuleObject[]).some((rule) => {
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
    rules: toggleRequired([{ whitespace: true, message: "不能为空" }]),
  }),
  "checkboxgroup": () => ({
    typename: "checkboxgroup",
    label: "label",
    name: hashName("checkboxgroup"),
    value: [],
    options: [
      "A",
      "B"
    ],
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
  "input": loadable(
    () => import("@/components/Questionnaire/WrapModify/ButtonEdit/ButtonEditOptions/EditQInput")
  ),
  "checkboxgroup": loadable(
    () => import("@/components/Questionnaire/WrapModify/ButtonEdit/ButtonEditOptions/EditQCheckBoxGroup")
  ),
};
