import { ThemeActions } from '@/constants';

import { ThemeDarkAction, ThemeLightAction } from './action-theme';

const switchLight = (): ThemeLightAction => ({
  'type': ThemeActions.SWITCH_LIGHT,
});

const switchDark = (): ThemeDarkAction => ({
  'type': ThemeActions.SWITCH_DARK,
});

export default { switchLight, switchDark };
