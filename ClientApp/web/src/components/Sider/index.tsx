import React from "react";
import { Layout } from "antd";
import { SiderTheme } from "antd/es/layout/Sider";
import { connect } from "react-redux";

import { ApplicationState } from "@/reducers/state";

import styles from "./Sider.module.scss";

interface SiderComponentReceivedProps {
  children?: React.ReactNode;
  collapsed: boolean;
}

interface SiderComponentOwnStateProps {
  theme: SiderTheme;
}

type SiderComponentProps =
  SiderComponentOwnStateProps &
  SiderComponentReceivedProps

const { Sider } = Layout;

const SiderComponent: React.FC<SiderComponentProps> = ({ children, collapsed, theme }: SiderComponentProps) => (
  <Sider theme={theme} className={styles.sider} trigger={null} collapsible collapsed={collapsed}>
    {children}
  </Sider>
);

const mapStateToProps = (state: ApplicationState): SiderComponentOwnStateProps => ({
  theme: state.context.theme,
});

export default connect(mapStateToProps)(SiderComponent);
