import React from "react";
import { Button } from "antd";
import { connect } from "react-redux";

import { Http } from "@/shared";
import { API_V1_USER } from "@/shared/conf";
import { toastMessageByStatus } from "@/shared/toast-message";
import { Disp } from "@/types";
import { ApplicationState } from "@/reducers/states";
import { AuthAction } from "@/actions/action-auth";

type UnregisterDispatch = Disp<ApplicationState, null, AuthAction>

interface UnregisterOwnDispatchProps {
  logout: () => void
}

interface UnregisterState {
  loading: boolean
}

type UnregisterProps = UnregisterOwnDispatchProps

class Unregister extends React.PureComponent<UnregisterProps, UnregisterState> {
  constructor(props: any) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  handleUnregisterClick = async () => {
    this.setState({ loading: true });
    const response = await Http(API_V1_USER, {
      method: "DELETE"
    }).
      catch((ex) => {
        toastMessageByStatus(500);
        return ex;
      });
    if (response.ok) {
      this.props.logout();
    } else {
      toastMessageByStatus(response.status);
    }
    this.setState({ loading: false });
  }

  render() {
    return (
      <Button
        danger
        loading={this.state.loading}
        onClick={() => this.handleUnregisterClick()}
      >
        注销
      </Button>
    );
  }
}

const mapDispatchToProps = (dispatch: UnregisterDispatch): UnregisterOwnDispatchProps => ({
  logout: () => import("@/actions").then(({ iu }) => dispatch(iu.logout())),
});

const UnregisterComponent = connect(null, mapDispatchToProps)(Unregister);

export {
  UnregisterComponent as Unregister,
};
