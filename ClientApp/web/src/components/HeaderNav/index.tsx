import React from "react";
import { SiderTheme } from "antd/es/layout/Sider";
import { connect } from "react-redux";

import UserDisplay from "@/components/HeaderUserDisplay";
import { ApplicationState } from "@/reducers";
import { classnames } from "@/shared/classnames";

import styles from "./HeaderNav.module.scss";

interface HeaderNavOwnStateProps {
  theme: SiderTheme
}

type HeaderNavProps = HeaderNavOwnStateProps;

const HeaderNavComponent: React.FC<HeaderNavProps> = ({ theme }: HeaderNavProps) =>  (
  <div className={classnames(
    styles["header-nav"],
    `ant-menu-${theme}`,
  )}>
    <UserDisplay />
  </div>
);

const mapStateToProps = (state: ApplicationState): HeaderNavOwnStateProps => ({
  theme: state.context.theme,
});

export default connect(mapStateToProps)(HeaderNavComponent);
