import React from "react";
import { Button } from "antd";
import { connect } from "react-redux";

import { Http } from "@/shared";
import { API_V1_USER } from "@/shared/conf";
import { toastMessageByStatus } from "@/shared/toast-message";
import { Disp } from "@/types";
import { ApplicationState } from "@/reducers/states";
import { AuthAction } from "@/actions/action-auth";

type AccountSettingsDispatch = Disp<ApplicationState, null, AuthAction>

interface AccountSettingsOwnDispatchProps {
  logout: () => void
}

interface AccountSettingsState {
  loading: boolean
}

type AccountSettingsProps = AccountSettingsOwnDispatchProps

class AccountSettings extends React.PureComponent<AccountSettingsProps, AccountSettingsState> {
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

const mapDispatchToProps = (dispatch: AccountSettingsDispatch): AccountSettingsOwnDispatchProps => ({
  logout: () => import("@/actions").then(({ iu }) => dispatch(iu.logout())),
});

export default connect(null, mapDispatchToProps)(AccountSettings);
