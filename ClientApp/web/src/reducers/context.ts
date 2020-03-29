import { Reducer } from 'redux';

import { ThemeActions } from '@/constants';
import { ContextAction } from '@/actions/action-context';

import { initialState } from './initial-state';
import { ContextState } from './state';

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
