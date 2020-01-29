import "./UserDropdown.scss";

import UserDropdownMenu from "@components/UserDropdownMenu";
import React from "react";
import { Avatar, Dropdown, Icon } from "antd";
import { connect } from "react-redux";
import { ApplicationState } from "@reducers/index";
import { AuthState } from "@/reducers/auth";

interface UserDropdownOwnStateProps {
  log: AuthState;
}

type UserDropdownProps = UserDropdownOwnStateProps;

const UserDropdownComponent = (props: UserDropdownProps) => (
  <div className="user-dropdown">
    <Dropdown
      className="user-dropdown_dropdown"
      overlay={<UserDropdownMenu user={props.log.user} />}
    >
      <span>
        <Avatar icon={<Icon type="user" />} />
        {props.log.user && (
          <span className="username">{props.log.user.profile.sub}</span>
        )}
      </span>
    </Dropdown>
  </div>
);

const mapStateToProps = (state: ApplicationState): UserDropdownOwnStateProps => ({
  "log": state.log,
});

export default connect(mapStateToProps)(UserDropdownComponent);
