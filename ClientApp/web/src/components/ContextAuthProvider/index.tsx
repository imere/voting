import React from "react";
import { connect } from "react-redux";

import { AuthContextType, Provider } from "@/contexts/auth";
import { Disp } from "@/types";
import { ApplicationState } from "@/reducers";
import { AuthAction } from "@/actions/auth";
import { iu } from "@/actions";

type ContextAuthProviderDispatch = Disp<ApplicationState, null, AuthAction>

interface ContextAuthProviderReceivedProps {
  children: React.ReactNode
}

interface ContextAuthProviderOwnDispatchProps extends AuthContextType{}

type ContextAuthProviderProps =
  ContextAuthProviderOwnDispatchProps
  & ContextAuthProviderReceivedProps;

const ContextAuthProvider: React.FC<ContextAuthProviderProps> = (props: ContextAuthProviderProps) => (
  <Provider value={{ login: props.login, logout: props.logout }}>
    {props.children}
  </Provider>
);

const mapDispatchToProps = (dispatch: ContextAuthProviderDispatch): ContextAuthProviderOwnDispatchProps => ({
  login: (user) => dispatch(iu.login(user)),
  logout: () => dispatch(iu.logout()),
});

export default connect(null, mapDispatchToProps)(ContextAuthProvider);
