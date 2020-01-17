import "./Header.scss";

import HeaderNav from "@components/HeaderNav";
import React from "react";
import { Icon, Layout } from "antd";

const { Header } = Layout;

interface HeaderReceivedProps {
  collapsed: boolean;
  toggleTrigger: React.MouseEventHandler;
}

interface HeaderState {}

class HeaderComponent extends React.Component<
  HeaderReceivedProps,
  HeaderState
> {
  render = () => (
    <Header style={{ background: "#fff", padding: 0 }}>
      <Icon
        className="header_sider-trigger"
        type={this.props.collapsed ? "menu-unfold" : "menu-fold"}
        onClick={this.props.toggleTrigger}
      />
      <HeaderNav />
    </Header>
  );
}

export default HeaderComponent;
