import React from "react";
import { Avatar, Icon, Spin } from "antd";
import { connect } from "react-redux";

import UserDropdownMenu from "@/components/HeaderUserDropdown";
import { ApplicationState } from "@/reducers";
import { AuthState } from "@/reducers/auth";

import styles from "./HeaderUserDisplay.module.scss";

interface HeaderUserDisplayOwnStateProps {
  auth: AuthState;
}

type HeaderUserDisplayProps = HeaderUserDisplayOwnStateProps;

const HeaderUserDisplay = ({ auth }: HeaderUserDisplayProps) => (
  <div className={Reflect.get(styles, "user-dropdown-light")}>
    <UserDropdownMenu user={auth.user}>
      <Spin spinning={auth.pending}>
        <Avatar icon={<Icon type="user" />} />
        {auth.user && (
          <span className={styles["user-display_username"]}>{auth.user.profile.sub}</span>
        )}
      </Spin>
    </UserDropdownMenu>
  </div>
);

const mapStateToProps = (state: ApplicationState): HeaderUserDisplayOwnStateProps => ({
  "auth": state.auth,
});

export default connect(mapStateToProps)(HeaderUserDisplay);
