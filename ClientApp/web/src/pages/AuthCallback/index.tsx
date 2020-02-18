import React from "react";
import { connect } from "react-redux";

import { ApplicationState } from "@/reducers/states";
import { Disp } from "@/types";
import { AuthAction, CompleteAuthenticationCallback } from "@/actions/action-auth";

type CallbackDispatch = Disp<ApplicationState, undefined, AuthAction>;

interface CallbackOwnDispatchProps {
  completeAuthentication: (cb?: CompleteAuthenticationCallback) => void;
}

type CallbackProps = CallbackOwnDispatchProps;

interface CallbackOwnState {}

class AuthCallback extends React.PureComponent<CallbackProps, CallbackOwnState> {
  componentDidMount() {
    console.log("complete");
    this.props.completeAuthentication();
  }

  render = () => "正在验证";
}

const mapDispatchToProps = (
  dispatch: CallbackDispatch
): CallbackOwnDispatchProps => ({
  "completeAuthentication": (cb) => import("@/actions").then(({ iu }) => dispatch(iu.completeAuthentication(cb)))
});

export default connect(null, mapDispatchToProps)(AuthCallback);
