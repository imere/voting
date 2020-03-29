import { Action } from "redux";

import { ActionSwitchDark, ActionSwitchLight } from "@/constants/ThemeActions";

export interface ThemeLightAction extends Action<ActionSwitchLight> { }

export interface ThemeDarkAction extends Action<ActionSwitchDark> { }

export type ThemeAction = ThemeLightAction | ThemeDarkAction
