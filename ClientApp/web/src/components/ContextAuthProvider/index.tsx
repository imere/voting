import React from "react";
import { connect } from "react-redux";

import { AuthContextType, Provider } from "@/contexts/auth";
import { Disp } from "@/types";
import { ApplicationState } from "@/reducers";
import { AuthAction } from "@/actions/auth";

type ContextAuthProviderDispatch = Disp<ApplicationState, null, AuthAction>

interface ContextAuthProviderReceivedProps {
  children: React.ReactNode
}

interface ContextAuthProviderOwnDispatchProps extends AuthContextType { }

type ContextAuthProviderProps =
  ContextAuthProviderOwnDispatchProps
  & ContextAuthProviderReceivedProps;

const ContextAuthProvider: React.FC<ContextAuthProviderProps> = ({ children, register, login, logout }: ContextAuthProviderProps) => (
  <Provider value={{ register: register, login: login, logout: logout }}>
    {children}
  </Provider>
);

const mapDispatchToProps = (dispatch: ContextAuthProviderDispatch): ContextAuthProviderOwnDispatchProps => ({
  register: (user) => import("@/actions").then(({ iu }) => dispatch(iu.register(user))),
  login: (user) => import("@/actions").then(({ iu }) => dispatch(iu.login(user))),
  logout: () => import("@/actions").then(({ iu }) => dispatch(iu.logout())),
});

export default connect(null, mapDispatchToProps)(ContextAuthProvider);
