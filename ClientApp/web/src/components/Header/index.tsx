import "./Header.scss";

import HeaderNav from "@components/HeaderNav";
import React from "react";
import { Icon, Layout } from "antd";

const { Header } = Layout;

interface HeaderReceivedProps {
  collapsed: boolean;
  toggleTrigger: React.MouseEventHandler;
}

const HeaderComponent: React.FC<HeaderReceivedProps> = (props: HeaderReceivedProps) => (
  <Header style={{ background: "#fff", padding: 0 }}>
    <Icon
      className="header_sider-trigger"
      type={props.collapsed ? "menu-unfold" : "menu-fold"}
      onClick={props.toggleTrigger}
    />
    <HeaderNav />
  </Header>
);

export default HeaderComponent;
