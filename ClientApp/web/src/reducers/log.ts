import { Reducer } from "redux";
import { LoginActions } from "@constants/index";
import { LogAction } from "@actions/log";

export interface LogState {
  pending?: boolean
  username?: string,
  token?: string
}

export const log: Reducer<LogState, LogAction> = (state = {}, action): LogState => {
  switch (action.type) {
    case LoginActions.LOGIN:
      return {
        ...state,
        pending: true,
      };

    case LoginActions.LOGIN_SUC:
      return {
        ...state,
        pending: false,
        username: action.username,
      };

    case LoginActions.LOGIN_ERR:
      return {
        ...state,
        pending: false,
        username: undefined,
      };

    case LoginActions.LOGOUT:
      return {
        ...state,
        pending: false,
        username: undefined
      };

    case LoginActions.LOGOUT_COMPLETE:
      return {
        ...state,
        pending: false,
        username: undefined
      };

    default:
      return state;
  }
};
