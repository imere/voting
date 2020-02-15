import { Reducer } from "redux";
import { SiderTheme } from "antd/es/layout/Sider";

import { ThemeActions } from "@/constants";
import { ContextAction } from "@/actions/context";

import { initialState } from "./initial-state";

export interface ContextState {
  theme: SiderTheme
}

export const context: Reducer<ContextState, ContextAction> = (state = initialState.context, action): ContextState => {
  switch (action.type) {
  case ThemeActions.SWITCH_LIGHT:
    return {
      ...state,
      theme: "light",
    };

  case ThemeActions.SWITCH_DARK:
    return {
      ...state,
      theme: "dark",
    };

  default:
    return state;
  }
};
