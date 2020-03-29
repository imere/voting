import { Reducer } from 'redux';

import { AuthActions } from '@/constants/index';
import { AuthAction } from '@/actions/action-auth';

import { AuthState } from './state';

export const auth: Reducer<AuthState, AuthAction> = (state = {}, action): AuthState => {
  switch (action.type) {
  case AuthActions.REGISTER:
    return {
      ...state,
      'pending': true,
    };

  case AuthActions.REGISTER_SUC:
    return {
      ...state,
      'pending': false,
    };

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
      'user': undefined
    };

  case AuthActions.LOGOUT_COMPLETE:
    return {
      ...state,
      'pending': false,
      'user': undefined
    };

  default:
    return state;
  }
};
