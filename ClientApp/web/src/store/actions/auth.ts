import { User } from 'oidc-client';

import { AuthActions, Routes } from '@/constants';
import { AppThunkAction, None } from '@/typings/types';
import { createUser, loginUser, logoutUser } from '@/framework/shared/request-util';
import { iservice } from '@/framework/shared/identity-service';

import {
  AuthAction,
  CompleteAuthenticationCallback,
  LoginCallback,
  LogoutCallback,
  RegisterCallback,
  RequestLoginAction,
  RequestLoginErrAction,
  RequestLoginSucAction,
  RequestLogoutAction,
  RequestLogoutCompleteAction,
  RequestRegisterAction,
  RequestRegisterErrAction,
  RequestRegisterSucAction,
  UserAuthentication,
} from './action-auth';

const requestRegister = (): RequestRegisterAction => ({
  'type': AuthActions.REGISTER,
});

const requestRegisterSuc = (): RequestRegisterSucAction => ({
  'type': AuthActions.REGISTER_SUC,
});

const requestRegisterErr = (): RequestRegisterErrAction => ({
  'type': AuthActions.REGISTER_ERR,
});


const requestLogin = (): RequestLoginAction => ({
  'type': AuthActions.LOGIN,
});

const requestLoginSuc = (user: User | None): RequestLoginSucAction => ({
  'type': AuthActions.LOGIN_SUC,
  'user': user,
});

const requestLoginErr = (): RequestLoginErrAction => ({
  'type': AuthActions.LOGIN_ERR,
});


const requestLogout = (): RequestLogoutAction => ({
  'type': AuthActions.LOGOUT
});

const requestLogoutComplete = (): RequestLogoutCompleteAction => ({
  'type': AuthActions.LOGOUT_COMPLETE
});

class IdentityService {

  register = (user: UserAuthentication, cb?: RegisterCallback): AppThunkAction<AuthAction> => async (dispatch) => {
    dispatch(requestRegister());
    try {
      await createUser(user);
      dispatch(requestRegisterSuc());
      return setTimeout(() => window.location.href = Routes.USER_LOGIN);
    } catch (ex) {
      ex instanceof Response
        // eslint-disable-next-line callback-return
        ? cb && cb(null, ex)
        // eslint-disable-next-line callback-return
        : cb && cb(ex);

      return dispatch(requestRegisterErr());
    }
  }

  login = (user: UserAuthentication, cb?: LoginCallback): AppThunkAction<AuthAction> => async (dispatch) => {
    dispatch(requestLogin());
    try {
      await loginUser(user);
      const result = await iservice.login();
      dispatch(requestLoginSuc(result));
      return setTimeout(() => window.location.href = '/');
    } catch (ex) {
      ex instanceof Response
        // eslint-disable-next-line callback-return
        ? cb && cb(null, ex)
        // eslint-disable-next-line callback-return
        : cb && cb(ex);

      return dispatch(requestLoginErr());
    }
  }

  completeAuthentication = (cb?: CompleteAuthenticationCallback): AppThunkAction<AuthAction> => async (dispatch) => {
    try {
      return await iservice.completeAuthentication().then((user) => {
        // eslint-disable-next-line callback-return
        cb && cb(null);
        dispatch(requestLoginSuc(user));
        location.href = '/';
      });
    } catch (ex) {
      cb && cb(ex);
      return dispatch(requestLoginErr());
    }
  }

  logout = (cb?: LogoutCallback): AppThunkAction<AuthAction> => async (dispatch) => {
    dispatch(requestLogout());
    try {
      logoutUser();
      await iservice.logout().then(() => {
        cb && cb(null);
      });
      return dispatch(requestLogoutComplete());
    } catch (ex) {
      cb && cb(ex);

      return dispatch(requestLogoutComplete());
    }
  }

  getUser = async () => await iservice.getUser();
}

export default new IdentityService();
