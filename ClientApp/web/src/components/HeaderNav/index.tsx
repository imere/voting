import "./HeaderNav.scss";

import UserDropdown from "@components/UserDropdown";
import React from "react";
import { connect } from "react-redux";
import { login } from "@actions/index";
import { LogAction, UserAuthentication } from "@actions/log";
import { ApplicationState } from "@reducers/index";

import { Disp } from "@/types";

type HeaderNavDispatch = Disp<ApplicationState, undefined, LogAction>;

interface HeaderNavOwnProps {
  login: (user: UserAuthentication) => void;
}

interface HeaderNavState {}

class HeaderNavComponent extends React.Component<
  HeaderNavOwnProps,
  HeaderNavState
> {
  render = () => {
    this.props.login({ "username": "usernames", "password": "" });
    return (
      <div className="header-nav">
        <UserDropdown />
      </div>
    );
  };
}

const mapDispatchToProps = (dispatch: HeaderNavDispatch): HeaderNavOwnProps => ({
  "login": (user: UserAuthentication) => dispatch(login(user)),
});

export default connect(null, mapDispatchToProps)(HeaderNavComponent);
