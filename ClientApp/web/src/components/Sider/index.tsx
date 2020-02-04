import React from "react";
import { Layout } from "antd";
import { SiderTheme } from "antd/lib/layout/Sider";

import("./Sider.scss");

interface SiderReceivedProps {
  children?: React.ReactNode;
  theme: SiderTheme
  collapsed: boolean;
}

const { Sider } = Layout;

const SiderComponent: React.FC<SiderReceivedProps> = (props: SiderReceivedProps) => (
  <Sider theme={props.theme} className="sider" trigger={null} collapsible collapsed={props.collapsed}>
    {props.children}
  </Sider>
);

export default SiderComponent;
