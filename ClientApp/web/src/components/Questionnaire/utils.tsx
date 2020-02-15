import React, { Dispatch, SetStateAction } from "react";
import { FormComponentProps, ValidationRule } from "antd/es/form";
import { sha1 } from "object-hash";

import { AnyType } from "@/types";
import { QuestionnaireContentType, TypeCheckBoxGroup, TypeInput } from "@/data-types";

import QCheckBoxGroup from "./QCheckBoxGroup";
import QInput from "./QInput";
import WrapEdit from "./WrapEdit";
import WrapNormal from "./WrapNormal";

export function hashItemId(id: string) {
  return sha1(id).slice(0, 7);
}

export function isRequired(rules: ValidationRule[]): boolean {
  return rules.some((rule) => rule.required);
}

export function setRequiredMessage(rules: ValidationRule[]): void {
  rules.some((rule) => {
    if (rule.required) {
      rule.message = "必填项";
      return true;
    }
    return false;
  });
}

export function toggleRequired(rules: ValidationRule[]): ValidationRule[] {
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

type QItemMapType = {
  "input": React.FC<any>;
  "checkboxgroup": React.FC<any>;
};
const QItemMap: QItemMapType & AnyType = {
  "input": QInput,
  "checkboxgroup": QCheckBoxGroup,
};

export type SetItemsDispatch = Dispatch<SetStateAction<(QuestionnaireContentType & AnyType)[]>>
export function renderQItems(form: FormComponentProps["form"], edit: boolean, items: AnyType[], setItems: SetItemsDispatch = () => undefined): any[] {
  if (edit) {
    return items.map((item, i) => (
      <WrapEdit
        key={i}
        items={items}
        form={form}
        setItems={setItems}
        {...item}
      >
        {QItemMap[item.typename]}
      </WrapEdit>
    ));
  }
  return items.map((item, i) => (
    <WrapNormal
      key={i}
      form={form}
      {...item}
    >
      {QItemMap[item.typename]}
    </WrapNormal>
  ));
}

type QItemDataFactoryType = {
  [K in keyof QItemMapType]: (prop: any) => any
}
export const QItemDataFactory: QItemDataFactoryType = {
  "input": ({ id, label, ...rest }: Pick<TypeInput, "id" | "label">): TypeInput => ({
    typename: "input",
    id,
    label,
    rules: toggleRequired([]),
    ...rest,
  }),
  "checkboxgroup": ({ id, label, ...rest }: Pick<TypeCheckBoxGroup, "id" | "label">): TypeCheckBoxGroup => ({
    typename: "checkboxgroup",
    id,
    label,
    value: [],
    options: [
      {
        label: "A",
        value: "A"
      },
      {
        label: "B",
        value: "B"
      },
    ],
    rules: toggleRequired([]),
    ...rest,
  }),
};
