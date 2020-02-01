import React from "react";
import { Avatar, Icon } from "antd";
import { connect } from "react-redux";
import { ApplicationState } from "@reducers/index";

import UserDropdownMenu from "@/components/HeaderUserDropdown";
import { AuthState } from "@/reducers/auth";

import("./HeaderUserDisplay.scss");

interface UserDropdownOwnStateProps {
  auth: AuthState;
}

type UserDropdownProps = UserDropdownOwnStateProps;

const HeaderUserDisplay = (props: UserDropdownProps) => (
  <UserDropdownMenu user={props.auth.user}>
    <span>
      <Avatar icon={<Icon type="user" />} />
      {props.auth.user && (
        <span className="user-display_username">{props.auth.user.profile.sub}</span>
      )}
    </span>
  </UserDropdownMenu>
);

const mapStateToProps = (state: ApplicationState): UserDropdownOwnStateProps => ({
  "auth": state.auth,
});

export default connect(mapStateToProps)(HeaderUserDisplay);
