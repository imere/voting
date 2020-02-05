import React from "react";
import { Layout } from "antd";
import { SiderTheme } from "antd/lib/layout/Sider";
import { connect } from "react-redux";

import { ApplicationState } from "@/reducers";

import styles from "./Sider.module.scss";

interface SiderReceivedProps {
  children?: React.ReactNode;
  collapsed: boolean;
}

interface SiderOwnStateProps {
  theme: SiderTheme;
}

type SiderProps =
  SiderOwnStateProps
  & SiderReceivedProps

const { Sider } = Layout;

const SiderComponent: React.FC<SiderProps> = ({ children, collapsed, theme }: SiderProps) => (
  <Sider theme={theme} className={styles.sider} trigger={null} collapsible collapsed={collapsed}>
    {children}
  </Sider>
);

const mapStateToProps = (state: ApplicationState): SiderOwnStateProps => ({
  theme: state.context.theme,
});

export default connect(mapStateToProps)(SiderComponent);
