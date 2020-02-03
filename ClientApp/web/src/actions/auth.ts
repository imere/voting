import { Action } from "redux";
import { User, UserManager, UserManagerSettings } from "oidc-client";

import { AuthActions } from "@/constants";
import {
  ActionLogin,
  ActionLoginErr,
  ActionLoginSuc,
  ActionLogout,
  ActionLogoutComplete,
} from "@/constants/AuthActions";
import { AppThunkAction, None } from "@/types";
import { API_ORIGIN, API_USER, Http } from "@/shared";

export interface UserAuthentication {
  username: string;
  password: string;
}

export interface RequestLoginAction extends Action<ActionLogin> { }
export interface RequestLoginSucAction extends Action<ActionLoginSuc> {
  user: User | None;
}
export interface RequestLoginErrAction extends Action<ActionLoginErr> { }
export type RequestLoginCompleteAction = RequestLoginSucAction | RequestLoginErrAction

export interface RequestLogoutAction extends Action<ActionLogout> { }
export interface RequestLogoutCompleteAction extends Action<ActionLogoutComplete> { }

export type AuthAction = RequestLoginAction | RequestLoginCompleteAction | RequestLogoutAction | RequestLogoutCompleteAction

class IdentityService {
  private _manager: UserManager;
  private CLIENT_SETTINGS: UserManagerSettings = {
    "authority": `${API_ORIGIN}`,
    "client_id": "js",
    "redirect_uri": "http://localhost:5000/auth-callback",
    "post_logout_redirect_uri": "http://localhost:5000",
    "response_type": "id_token token",
    "scope": "openid profile api1"
  };

  constructor() {
    this._manager = new UserManager(this.CLIENT_SETTINGS);
    this._manager.clearStaleState();
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

  login = (user: UserAuthentication): AppThunkAction<AuthAction> => async (dispatch) => {
    dispatch(this.requestLogin());
    try {
      await Http(`${API_USER}/login`, {
        "method": "POST",
        "headers": {
          "Content-Type": "application/json",
        },
        "body": JSON.stringify(user),
      });
      const result = await this._manager.getUser();
      await this._manager.signinRedirect();
      return dispatch(this.requestLoginSuc(result));
    } catch (ex) {
      console.error(ex);

      return dispatch(this.requestLoginErr());
    }
  }

  completeAuthentication = (cb?: Function): AppThunkAction<AuthAction> => async (dispatch) => {
    try {
      const user = await this._manager.signinRedirectCallback();
      cb && cb(user);
      return dispatch(this.requestLoginSuc(user));
    } catch (ex) {
      console.error(ex);
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

  logout = (): AppThunkAction<AuthAction> => async (dispatch) => {
    dispatch(this.requestLogout());
    try {
      await this._manager.signoutRedirect();
      return dispatch(this.requestLogoutComplete());
    } catch (ex) {
      console.error(ex);

      return dispatch(this.requestLogoutComplete());
    }
  }

  getUser = async () => await this._manager.getUser();
}

export default new IdentityService();
