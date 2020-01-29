import React from "react";
import { iu } from "@actions/index";
import { connect } from "react-redux";

import { ApplicationState } from "@/reducers";
import { AuthState } from "@/reducers/auth";
import { Disp } from "@/types";
import { AuthAction } from "@/actions/auth";

type CallbackDispatch = Disp<ApplicationState, undefined, AuthAction>;

interface CallbackReceivedProps {}

interface CallbackOwnDispatchProps {
  completeAuthentication: (callback?: Function) => void;
}

interface CallbackOwnStateProps {
  "auth": AuthState;
}

type CallbackProps = CallbackOwnStateProps &
  CallbackOwnDispatchProps &
  CallbackReceivedProps;

interface CallbackOwnState {}

class AuthCallback extends React.PureComponent<CallbackProps, CallbackOwnState> {
  componentDidMount() {
    console.log("complete");
    this.props.completeAuthentication(() => setTimeout(() => location.href = "/"));
  }

  render = () => <>正在验话</>;
}

const mapStateToProps = (state: ApplicationState): CallbackOwnStateProps => ({
  "auth": state.auth
});

const mapDispatchToProps = (
  dispatch: CallbackDispatch
): CallbackOwnDispatchProps => ({
  "completeAuthentication": (cb?: Function) => dispatch(iu.completeAuthentication(cb))
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthCallback);
