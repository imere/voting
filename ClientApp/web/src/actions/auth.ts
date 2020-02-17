import Oidc, { User, UserManager, UserManagerSettings } from "oidc-client";
import { Action } from "redux";

import { AuthActions, Routes } from "@/constants";
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
import { AppThunkAction, None } from "@/types";
import { Http } from "@/shared";
import { API_ORIGIN, API_USER } from "@/shared/conf";

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

class IdentityService {
  private _manager: UserManager;
  private CLIENT_SETTINGS: UserManagerSettings = {
    "authority": `${API_ORIGIN}`,
    "client_id": "js",
    "redirect_uri": "http://localhost:5000/auth-callback",
    "post_logout_redirect_uri": "http://localhost:5000",
    "response_type": "id_token token",
    "scope": "openid profile api1",
    userStore: new Oidc.WebStorageStateStore({
      store: window.localStorage
    })
  };

  constructor() {
    this._manager = new UserManager(this.CLIENT_SETTINGS);
    this._manager.clearStaleState();
  }

  requestRegister = (): RequestRegisterAction => ({
    "type": AuthActions.REGISTER,
  })

  requestRegisterSuc = (): RequestRegisterSucAction => ({
    "type": AuthActions.REGISTER_SUC,
  })

  requestRegisterErr = (): RequestRegisterErrAction => ({
    "type": AuthActions.REGISTER_ERR,
  })

  register = (user: UserAuthentication, cb?: RegisterCallback): AppThunkAction<AuthAction> => async (dispatch) => {
    dispatch(this.requestRegister());
    try {
      await Http(`${API_USER}`, {
        "method": "PUT",
        "body": new Blob([JSON.stringify(user)], {
          type: "application/json",
        }),
      }).
        then((res) => {
          if (res.status >= 400) {
            throw res;
          }
        });
      setTimeout(() => location.href = Routes.USER_LOGIN);
      return dispatch(this.requestRegisterSuc());
    } catch (ex) {
      ex instanceof Response
        // eslint-disable-next-line callback-return
        ? cb && cb(null, ex)
        // eslint-disable-next-line callback-return
        : cb && cb(ex);

      return dispatch(this.requestRegisterErr());
    }
  }

  requestLogin = (): RequestLoginAction => ({
    "type": AuthActions.LOGIN,
  })

  requestLoginSuc = (user: User | None): RequestLoginSucAction => ({
    "type": AuthActions.LOGIN_SUC,
    "user": user,
  })

  requestLoginErr = (): RequestLoginErrAction => ({
    "type": AuthActions.LOGIN_ERR,
  })

  login = (user: UserAuthentication, cb?: LoginCallback): AppThunkAction<AuthAction> => async (dispatch) => {
    dispatch(this.requestLogin());
    try {
      await Http(`${API_USER}/login`, {
        "method": "POST",
        "headers": {
          "Content-Type": "application/json",
        },
        "body": JSON.stringify(user),
      }).
        then((res) => {
          if (res.status >= 400) {
            throw res;
          }
        });
      const result = await this._manager.getUser();
      await this._manager.signinPopup().then(() => location.href = "/");
      return dispatch(this.requestLoginSuc(result));
    } catch (ex) {
      ex instanceof Response
        // eslint-disable-next-line callback-return
        ? cb && cb(null, ex)
        // eslint-disable-next-line callback-return
        : cb && cb(ex);

      return dispatch(this.requestLoginErr());
    }
  }

  completeAuthentication = (cb?: CompleteAuthenticationCallback): AppThunkAction<AuthAction> => async (dispatch) => {
    try {
      return await this._manager.signinPopupCallback().then((user) => {
        // eslint-disable-next-line callback-return
        cb && cb(null);
        dispatch(this.requestLoginSuc(user));
        location.href = "/";
      });
    } catch (ex) {
      cb && cb(ex);
      return dispatch(this.requestLoginErr());
    }
  }

  requestLogout = (): RequestLogoutAction => ({
    "type": AuthActions.LOGOUT
  })

  requestLogoutComplete = (): RequestLogoutCompleteAction => ({
    "type": AuthActions.LOGOUT_COMPLETE
  })

  logout = (cb?: LogoutCallback): AppThunkAction<AuthAction> => async (dispatch) => {
    dispatch(this.requestLogout());
    try {
      await this._manager.signoutRedirect().then(() => {
        cb && cb(null);
      });
      return dispatch(this.requestLogoutComplete());
    } catch (ex) {
      cb && cb(ex);

      return dispatch(this.requestLogoutComplete());
    }
  }

  getUser = async () => await this._manager.getUser();
}

export default new IdentityService();
