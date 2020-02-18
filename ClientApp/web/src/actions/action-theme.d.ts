import { Action } from "redux";

import { ThemeActions } from "@/constants";
import { ActionSwitchDark, ActionSwitchLight } from "@/constants/ThemeActions";

declare interface ThemeLightAction extends Action<ActionSwitchLight> { }

declare interface ThemeDarkAction extends Action<ActionSwitchDark> { }

declare type ThemeAction = ThemeLightAction | ThemeDarkAction
