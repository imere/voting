import { Reducer } from "redux";
import { AuthActions } from "@constants/index";
import { User } from "oidc-client";

import { AuthAction } from "@/actions/auth";
import { None } from "@/types";

export interface AuthState {
  pending?: boolean;
  user?: User | None;
  token?: string;
}

export const log: Reducer<AuthState, AuthAction> = (state = {}, action): AuthState => {
  switch (action.type) {
  case AuthActions.LOGIN:
    return {
      ...state,
      "pending": true,
    };

  case AuthActions.LOGIN_SUC:
    return {
      ...state,
      "pending": false,
      "user": action.user,
    };

  case AuthActions.LOGIN_ERR:
    return {
      ...state,
      "pending": false,
      "user": undefined,
    };

  case AuthActions.LOGOUT:
    return {
      ...state,
      "pending": false,
      "user": undefined
    };

  case AuthActions.LOGOUT_COMPLETE:
    return {
      ...state,
      "pending": false,
      "user": undefined
    };

  default:
    return state;
  }
};
