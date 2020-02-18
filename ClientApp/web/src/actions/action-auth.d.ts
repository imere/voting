import { User } from "oidc-client";
import { Action } from "redux";

import {
  ActionLogin,
  ActionLoginErr,
  ActionLoginSuc,
  ActionLogout,
  ActionLogoutComplete,
  ActionRegister,
  ActionRegisterErr,
  ActionRegisterSuc,
} from "@/constants/AuthActions";
import { None } from "@/types";

declare interface UserAuthentication {
  username: string
  password: string
  persist?: boolean
}


declare interface RequestRegisterAction extends Action<ActionRegister> { }
declare interface RequestRegisterSucAction extends Action<ActionRegisterSuc> { }
declare interface RequestRegisterErrAction extends Action<ActionRegisterErr> { }
declare type RequestRegisterCompleteAction = RequestRegisterSucAction | RequestRegisterErrAction


declare interface RequestLoginAction extends Action<ActionLogin> { }
declare interface RequestLoginSucAction extends Action<ActionLoginSuc> {
  user: User | None;
}
declare interface RequestLoginErrAction extends Action<ActionLoginErr> { }
declare type RequestLoginCompleteAction = RequestLoginSucAction | RequestLoginErrAction


declare interface RequestLogoutAction extends Action<ActionLogout> { }
declare interface RequestLogoutCompleteAction extends Action<ActionLogoutComplete> { }


declare type AuthAction =
  RequestRegisterAction |
  RequestRegisterCompleteAction |
  RequestLoginAction |
  RequestLoginCompleteAction |
  RequestLogoutAction |
  RequestLogoutCompleteAction


declare type RegisterCallback = (err: Error | None, res?: Response | None) => any
declare type LoginCallback = RegisterCallback
declare type LogoutCallback = (arg: Error | None) => any
declare type CompleteAuthenticationCallback = (err: Error | None, arg?: User | None) => any
