import React, { useMemo } from "react";
import { connect } from "react-redux";

import { AuthContextType, Provider } from "@/contexts/auth";
import { Disp } from "@/types";
import { ApplicationState } from "@/reducers/states";
import { AuthAction } from "@/actions/action-auth";

type ContextAuthProviderDispatch = Disp<ApplicationState, null, AuthAction>

interface ContextAuthProviderReceivedProps {
  children: React.ReactNode
}

interface ContextAuthProviderOwnDispatchProps extends AuthContextType { }

type ContextAuthProviderProps =
  ContextAuthProviderOwnDispatchProps &
  ContextAuthProviderReceivedProps;

const ContextAuthProvider = ({ children, register, login, logout }: ContextAuthProviderProps) => {
  const value = useMemo(() => ({
    register,
    login,
    logout,
  }), [
    register,
    login,
    logout,
  ]);
  return (
    <Provider value={value}>
      {children}
    </Provider>
  );
};

const mapDispatchToProps = (dispatch: ContextAuthProviderDispatch): ContextAuthProviderOwnDispatchProps => ({
  register: (user) => import("@/actions").then(({ iu }) => dispatch(iu.register(user))),
  login: (user) => import("@/actions").then(({ iu }) => dispatch(iu.login(user))),
  logout: () => import("@/actions").then(({ iu }) => dispatch(iu.logout())),
});

export default connect(null, mapDispatchToProps)(ContextAuthProvider);
