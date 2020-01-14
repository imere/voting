import { Action } from 'redux';

import { AppThunkAction } from '../types';
import { LoginActions } from '../constants';
import { Http } from '../shared';
import {
  ActionLogin,
  ActionLoginErr,
  ActionLoginSuc,
  ActionLogout,
  ActionLogoutComplete,
} from '../constants/UserActions';

export interface UserAuthentication {
  username: string
  password: string
}

export interface RequestLoginAction extends Action<ActionLogin> { }
export interface RequestLoginSucAction extends Action<ActionLoginSuc> {
  username: string
}
export interface RequestLoginErrAction extends Action<ActionLoginErr> { }
export type RequestLoginCompleteAction = RequestLoginSucAction | RequestLoginErrAction

export interface RequestLogoutAction extends Action<ActionLogout> { }
export interface RequestLogoutCompleteAction extends Action<ActionLogoutComplete> { }

export type LogAction = RequestLoginAction | RequestLoginCompleteAction | RequestLogoutAction | RequestLogoutCompleteAction

export const login = (user: UserAuthentication): AppThunkAction<LogAction> => (dispatch) => {
  const requestLogin = (): RequestLoginAction => ({
    type: LoginActions.LOGIN,
  })
  const requestLoginSuc = (username: string): RequestLoginSucAction => ({
    type: LoginActions.LOGIN_SUC,
    username,
  })
  const requestLoginErr = (): RequestLoginErrAction => ({
    type: LoginActions.LOGIN_ERR,
  })

  dispatch(requestLogin())
  return Http.post(`https://www.reddit.com/r/.json`)
    .then(_ => dispatch(requestLoginSuc(user.username)))
    .catch(_ => dispatch(requestLoginErr()))
}

export const logout = (): AppThunkAction<LogAction> => (dispatch) => {
  const requestLogout = (): RequestLogoutAction => ({
    type: LoginActions.LOGOUT
  })

  const requestLogoutComplete = (): RequestLogoutCompleteAction => ({
    type: LoginActions.LOGOUT_COMPLETE
  })

  dispatch(requestLogout())
  return Http.post(`https://www.reddit.com/r/json`)
    .then(_ => dispatch(requestLogoutComplete()))
    .catch(_ => dispatch(requestLogoutComplete()))
}
