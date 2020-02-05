import { Action } from "redux";

import { ThemeActions } from "@/constants";
import { ActionDark, ActionLight } from "@/constants/ThemeActions";

export interface ThemeLightAction extends Action<ActionLight> { }

export interface ThemeDarkAction extends Action<ActionDark> { }

export type ThemeAction = ThemeLightAction | ThemeDarkAction

const switchLight = (): ThemeLightAction => ({
  "type": ThemeActions.SWITCH_LIGHT,
});

const switchDark = (): ThemeDarkAction => ({
  "type": ThemeActions.SWITCH_DARK,
});

export default { switchLight, switchDark };
