import { Reducer } from "redux";
import { SiderTheme } from "antd/lib/layout/Sider";

import { ThemeActions } from "@/constants";
import { ThemeAction } from "@/actions/theme";

import { initialState } from "./initialState";

export interface ContextState {
  theme: SiderTheme
}

export const context: Reducer<ContextState, ThemeAction> = (state = initialState.context, action): ContextState => {
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
