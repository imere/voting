import { User } from 'oidc-client';
import { Action } from 'redux';

import {
  ActionLogin,
  ActionLoginErr,
  ActionLoginSuc,
  ActionLogout,
  ActionLogoutComplete,
  ActionRegister,
  ActionRegisterErr,
  ActionRegisterSuc,
} from '@/constants/AuthActions';
import { None } from '@/types';

export interface UserAuthentication {
  username: string
  password: string
  persist?: boolean
}


export interface RequestRegisterAction extends Action<ActionRegister> { }
export interface RequestRegisterSucAction extends Action<ActionRegisterSuc> { }
export interface RequestRegisterErrAction extends Action<ActionRegisterErr> { }
export type RequestRegisterCompleteAction = RequestRegisterSucAction | RequestRegisterErrAction


export interface RequestLoginAction extends Action<ActionLogin> { }
export interface RequestLoginSucAction extends Action<ActionLoginSuc> {
  user: User | None;
}
export interface RequestLoginErrAction extends Action<ActionLoginErr> { }
export type RequestLoginCompleteAction = RequestLoginSucAction | RequestLoginErrAction


export interface RequestLogoutAction extends Action<ActionLogout> { }
export interface RequestLogoutCompleteAction extends Action<ActionLogoutComplete> { }


export type AuthAction =
  RequestRegisterAction |
  RequestRegisterCompleteAction |
  RequestLoginAction |
  RequestLoginCompleteAction |
  RequestLogoutAction |
  RequestLogoutCompleteAction


export type RegisterCallback = (err: Error | None, res?: Response | None) => any
export type LoginCallback = RegisterCallback
export type LogoutCallback = (arg: Error | None) => any
export type CompleteAuthenticationCallback = (err: Error | None, arg?: User | None) => any
