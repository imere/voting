import "./Header.scss";

import React from "react";
import { Icon, Layout } from "antd";

import { HeaderRight } from "../HeaderRight/HeaderRight";

const { Header } = Layout;

interface HeaderProps {
  collapsed: boolean;
  toggleTrigger: React.MouseEventHandler;
}

interface HeaderState {}

export class HeaderComponent extends React.Component<HeaderProps, HeaderState> {
  render = () => (
    <Header style={{ background: "#fff", padding: 0 }}>
      <Icon
        className="header_sider-trigger"
        type={this.props.collapsed ? "menu-unfold" : "menu-fold"}
        onClick={this.props.toggleTrigger}
      />
      <HeaderRight />
    </Header>
  );
}
