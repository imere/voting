import { Reducer } from 'redux';

import { ThemeActions } from '@/constants';
import { ContextAction } from '@/store/actions/action-context';
import { initialState } from '@/store/initial-state';
import { ContextState } from '@/store/state';

export const context: Reducer<ContextState, ContextAction> = (state = initialState.context, action): ContextState => {
  switch (action.type) {
  case ThemeActions.SWITCH_LIGHT:
    return {
      ...state,
      theme: 'light',
    };

  case ThemeActions.SWITCH_DARK:
    return {
      ...state,
      theme: 'dark',
    };

  default:
    return state;
  }
};
