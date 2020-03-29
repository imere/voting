export const REGISTER = 'REGISTER';
export type ActionRegister = typeof REGISTER;

export const REGISTER_SUC = 'REGISTER_SUC';
export type ActionRegisterSuc = typeof REGISTER_SUC;

export const REGISTER_ERR = 'REGISTER_ERR';
export type ActionRegisterErr = typeof REGISTER_ERR;

export type ActionRegisterComplete = ActionRegisterSuc | ActionRegisterErr;


export const LOGIN = 'LOGIN';
export type ActionLogin = typeof LOGIN;

export const LOGIN_SUC = 'LOGIN_SUC';
export type ActionLoginSuc = typeof LOGIN_SUC;

export const LOGIN_ERR = 'LOGIN_ERR';
export type ActionLoginErr = typeof LOGIN_ERR;

export type ActionLoginComplete = ActionLoginSuc | ActionLoginErr;


export const LOGOUT = 'LOGOUT';
export type ActionLogout = typeof LOGOUT;

export const LOGOUT_COMPLETE = 'LOGOUT_COMPLETE';
export type ActionLogoutComplete = typeof LOGOUT_COMPLETE;
