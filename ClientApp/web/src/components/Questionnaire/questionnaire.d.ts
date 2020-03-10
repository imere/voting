import { CascaderOptionType } from "antd/es/cascader";
import { RuleObject } from "rc-field-form/es/interface";
import { CheckboxOptionType } from "antd/es/checkbox";
import { RadioGroupButtonStyle } from "antd/es/radio";
import { OptionCoreData } from "rc-select/es/interface";

declare type Status = "show" | "new" | "edit" | "ans"

export interface BaseType {
  label: string
  name: string
  extra?: string
  rules: RuleObject[]
}

export interface TypeNumber extends BaseType {
  typename: "number"
  value?: number
  min?: number
  max?: number
}

export interface TypeInput extends BaseType {
  typename: "input"
  value?: string
}

export interface TypeTextArea extends BaseType {
  typename: "textarea"
  value?: string
}

export interface TypeSwitch extends BaseType {
  typename: "switch"
  value?: boolean
}

type SliderMarkType = {
  [key: number]: string
}
export interface TypeSlider extends BaseType {
  typename: "slider"
  value?: number
  options: SliderMarkType[]
}

export interface TypeRadio extends BaseType {
  typename: "radio"
  type?: "button" | RadioGroupButtonStyle
  value?: string
  options: CheckboxOptionType[]
}

export interface TypeCheckBox extends BaseType {
  typename: "checkbox"
  value?: boolean
}

export interface TypeCheckBoxGroup extends BaseType {
  typename: "checkboxgroup"
  value: string[]
  options: (CheckboxOptionType | string)[]
}

export interface TypeRate extends BaseType {
  typename: "rate"
  value?: number
}

type SelectOptionType = {
  label: OptionCoreData["label"]
  value: OptionCoreData["value"]
}
export interface TypeSelect extends BaseType {
  typename: "select"
  value?: string
  options: SelectOptionType[]
}

export interface TypeSelectMultiple extends BaseType {
  typename: "selectmultiple"
  value: string[]
  options: string[]
}

export interface TypeCascade extends BaseType {
  typename: "cascade"
  value: string[]
  options: CascaderOptionType[]
}

export interface TypeDate extends BaseType {
  typename: "date"
  value?: string
}

export interface TypeDateRange extends BaseType {
  typename: "daterange"
  value: string[]
}

export interface TypeTime extends BaseType {
  typename: "time"
  value?: string
}

export interface TypeTimeRange extends BaseType {
  typename: "timerange"
  value: string[]
}

export type QuestionnaireContentType =
  // TypeNumber |
  TypeInput |
  // TypeTextArea |
  // TypeSwitch |
  // TypeSlider |
  // TypeRadio |
  // TypeCheckBox |
  TypeCheckBoxGroup
  // TypeRate |
  // TypeSelect |
  // TypeSelectMultiple |
  // TypeCascade |
  // TypeDate |
  // TypeDateRange |
  // TypeTime |
  // TypeTimeRange

export interface Questionnaire {
  title: string
  description?: string
  isPublic?: boolean
  content: QuestionnaireContentType[]
}

export interface QuestionnaireUpdate extends Questionnaire {
  id: number
}

export interface QuestionnaireResponse extends Questionnaire {
  id: number
  createdAt: Date
}
