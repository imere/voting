import React from "react";
import { Layout } from "antd";

import("./Header.scss");

const { Header } = Layout;

interface HeaderReceivedProps {
  children?: React.ReactNode;
}

const HeaderComponent: React.FC<HeaderReceivedProps> = (props: HeaderReceivedProps) => (
  <Header style={{ "background": "#fff", "padding": 0 }}>
    {props.children}
  </Header>
);

export default HeaderComponent;
