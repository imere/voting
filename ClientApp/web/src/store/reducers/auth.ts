import { Reducer } from 'redux';

import { AuthActions } from '@/constants/index';
import { AuthAction } from '@/store/actions/action-auth';

import { AuthState } from '@/store/state';
import { initialState } from '@/store/initial-state';

export const auth: Reducer<AuthState, AuthAction> = (state = initialState.auth, action): AuthState => {
  switch (action.type) {
  case AuthActions.REGISTER:
    return {
      ...state,
      'pending': true,
    };

  case AuthActions.REGISTER_SUC:
  case AuthActions.REGISTER_ERR:
    return {
      ...state,
      'pending': false,
    };

  case AuthActions.LOGIN:
    return {
      ...state,
      'pending': true,
    };

  case AuthActions.LOGIN_SUC:
    return {
      ...state,
      'pending': false,
      'user': action.user,
    };

  case AuthActions.LOGIN_ERR:
    return {
      ...state,
      'pending': false,
    };

  case AuthActions.LOGOUT:
    return {
      ...state,
      'pending': true,
      'user': null
    };

  case AuthActions.LOGOUT_COMPLETE:
    return {
      ...state,
      'pending': false,
      'user': null
    };

  default:
    return state;
  }
};
