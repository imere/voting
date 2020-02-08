import React from "react";
import { Avatar, Spin } from "antd";
import { connect } from "react-redux";
import { SiderTheme } from "antd/lib/layout/Sider";
import { User } from "oidc-client";

import HeaderUserDropdown from "@/components/HeaderUserDropdown";
import { ApplicationState } from "@/reducers";
import { classnames } from "@/shared/classnames";
import { None } from "@/types";
import { lengthGt } from "@/shared/validate-utils";

import styles from "./HeaderUserDisplay.module.scss";

interface HeaderUserDisplayOwnStateProps {
  pending?: boolean
  user?: User | None
  theme: SiderTheme
}

type HeaderUserDisplayProps = HeaderUserDisplayOwnStateProps;

const HeaderUserDisplay = ({ pending, user, theme }: HeaderUserDisplayProps) => (
  <HeaderUserDropdown user={user}>
    <div className={classnames(
      styles["user-dropdown"],
      Reflect.get(styles, `user-dropdown-${theme}`),
    )}>
      <Spin spinning={pending}>
        <Avatar
          style={user ? { color: "#f56a00", backgroundColor: "#fde3cf" } : {}}
          icon={user ? undefined : "user"}
        >
          {user && (
            user.profile.name
          )}
        </Avatar>
        {user && (
          <span className={styles["user-display_username"]}>{
            lengthGt(user.profile.name, 5)
              ? user.profile.name?.slice(0, 5).concat("...")
              : user.profile.name
          }</span>
        )}
      </Spin>
    </div>
  </HeaderUserDropdown>
);

const mapStateToProps = (state: ApplicationState): HeaderUserDisplayOwnStateProps => ({
  pending: state.auth.pending,
  user: state.auth.user,
  theme: state.context.theme,
});

export default connect(mapStateToProps)(HeaderUserDisplay);
