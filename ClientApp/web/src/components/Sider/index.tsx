import logo from "@components/logo.svg";
import React from "react";
import { Icon, Layout, Menu } from "antd";
import { Link } from "react-router-dom";

import("./Sider.scss");

interface SiderReceivedProps {
  collapsed: boolean;
}

const { Sider } = Layout;
const { SubMenu } = Menu;

const SiderComponent: React.FC<SiderReceivedProps> = (props: SiderReceivedProps) => (
  <Sider className="sider" trigger={null} collapsible collapsed={props.collapsed}>
    <div className="sider_logo">
      <Link to="/">
        <img alt="logo" src={logo} className="sider_logo_image"></img>
        <span className="sider_logo_text">问卷系统</span>
      </Link>
    </div>
    <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
      <Menu.Item key="1">
        <Icon type="pie-chart" />
        <span>Option 1</span>
      </Menu.Item>
      <Menu.Item key="2">
        <Icon type="desktop" />
        <span>Option 2</span>
      </Menu.Item>
      <SubMenu
        key="sub1"
        title={
          <span>
            <Icon type="user" />
            <span>User</span>
          </span>
        }
      >
        <Menu.Item key="3">Tom</Menu.Item>
        <Menu.Item key="4">Bill</Menu.Item>
        <Menu.Item key="5">Alex</Menu.Item>
      </SubMenu>
      <SubMenu
        key="sub2"
        title={
          <span>
            <Icon type="team" />
            <span>Team</span>
          </span>
        }
      >
        <Menu.Item key="6">Team 1</Menu.Item>
        <Menu.Item key="8">Team 2</Menu.Item>
      </SubMenu>
      <Menu.Item key="9">
        <Icon type="file" />
        <span>File</span>
      </Menu.Item>
    </Menu>
  </Sider>
);

export default SiderComponent;
