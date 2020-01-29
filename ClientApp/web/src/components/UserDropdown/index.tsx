import "./UserDropdown.scss";

import UserDropdownMenu from "@components/UserDropdownMenu";
import React from "react";
import { Avatar, Dropdown, Icon } from "antd";
import { connect } from "react-redux";
import { ApplicationState } from "@reducers/index";

import { AuthState } from "@/reducers/auth";

interface UserDropdownOwnStateProps {
  auth: AuthState;
}

type UserDropdownProps = UserDropdownOwnStateProps;

const UserDropdownComponent = (props: UserDropdownProps) => (
  <Dropdown
    className="user-dropdown"
    overlay={<UserDropdownMenu user={props.auth.user} />}
  >
    <span>
      <Avatar icon={<Icon type="user" />} />
      {props.auth.user && (
        <span className="user-dropdown_username">{props.auth.user.profile.sub}</span>
      )}
    </span>
  </Dropdown>
);

const mapStateToProps = (state: ApplicationState): UserDropdownOwnStateProps => ({
  "auth": state.auth,
});

export default connect(mapStateToProps)(UserDropdownComponent);
