import React from "react";
import { Avatar, Icon, Spin } from "antd";
import { connect } from "react-redux";

import UserDropdownMenu from "@/components/HeaderUserDropdown";
import { ApplicationState } from "@/reducers/index";
import { AuthState } from "@/reducers/auth";

import("./HeaderUserDisplay.scss");

interface HeaderUserDisplayOwnStateProps {
  auth: AuthState;
}

type HeaderUserDisplayProps = HeaderUserDisplayOwnStateProps;

const HeaderUserDisplay = (props: HeaderUserDisplayProps) => (
  <div className="user-dropdown">
    <UserDropdownMenu user={props.auth.user}>
      <Spin spinning={props.auth.pending}>
        <Avatar icon={<Icon type="user" />} />
        {props.auth.user && (
          <span className="user-display_username">{props.auth.user.profile.sub}</span>
        )}
      </Spin>
    </UserDropdownMenu>
  </div>
);

const mapStateToProps = (state: ApplicationState): HeaderUserDisplayOwnStateProps => ({
  "auth": state.auth,
});

export default connect(mapStateToProps)(HeaderUserDisplay);
