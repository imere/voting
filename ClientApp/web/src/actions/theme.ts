import { Action } from "redux";

import { ThemeActions } from "@/constants";
import { ActionSwitchDark, ActionSwitchLight } from "@/constants/ThemeActions";

export interface ThemeLightAction extends Action<ActionSwitchLight> { }

export interface ThemeDarkAction extends Action<ActionSwitchDark> { }

export type ThemeAction = ThemeLightAction | ThemeDarkAction

const switchLight = (): ThemeLightAction => ({
  "type": ThemeActions.SWITCH_LIGHT,
});

const switchDark = (): ThemeDarkAction => ({
  "type": ThemeActions.SWITCH_DARK,
});

export default { switchLight, switchDark };
