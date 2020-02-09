import { CascaderOptionType } from "antd/lib/cascader";

import { ValidateStatus } from "./types";

export interface BuiltinResponse {
  username: string[]
  password: string[]
}
export interface CustomResponse {
  code: number
  text: string
  data: any
}
export type ResponseState = CustomResponse & BuiltinResponse;


export interface TypeTitle {
  title: string
  description?: string
}

export interface BaseType {
  label: string
  extra?: string
  rules: ValidateStatus[]
}

export interface TypeNumber extends BaseType {
  value: number
  min?: number
  max?: number
}

export interface TypeInput extends BaseType {
  value: number
  min?: number
  max?: number
}

export interface TypeTextArea extends BaseType {
  value?: string
}

export interface TypeSwitch extends BaseType {
  value?: boolean
}

type TypeSliderMark = {
  [key: number]: string
}
export interface TypeSlider extends BaseType {
  value?: number
  values: TypeSliderMark[]
}

export interface TypeRadio<T = any> extends BaseType {
  type: "group" | "button"
  value?: T
  values: T[]
}

export interface TypeCheckBox<T = any> extends BaseType {
  value?: T
  values: T[]
}

export interface TypeRate extends BaseType {
  value?: number
}

export interface TypeSelect<T = any> extends BaseType {
  value?: T
  values: T[]
}

export interface TypeSelectMultiple<T = any> extends BaseType {
  value?: T[]
  values: T[]
}

export interface TypeSelectCascade<T = any> extends BaseType {
  value?: T[]
  values: CascaderOptionType[]
}

export interface TypeDate extends BaseType {
  value?: string
}

export interface TypeDateRange extends BaseType {
  value?: string[]
}

export interface TypeTime extends BaseType {
  value?: string
}

export interface TypeTimeRange extends BaseType {
  value?: string[]
}
