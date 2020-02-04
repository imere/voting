import React from "react";
import { Icon, Menu } from "antd";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { MenuTheme } from "antd/lib/menu/MenuContext";
import { connect } from "react-redux";

import logo from "@/components/logo.svg";
import { Routes } from "@/constants";

const { SubMenu } = Menu;

type MenuMode = "vertical" | "vertical-left" | "vertical-right" | "horizontal" | "inline";

interface TopOrSideMenuReceivedProps {
  theme: MenuTheme;
  mode: MenuMode;
}

interface TopOrSideMenuOwnProps extends RouteComponentProps {}

type TopOrSideMenuProps =
  TopOrSideMenuOwnProps
  & TopOrSideMenuReceivedProps;

const TopOrSideMenu: React.FC<TopOrSideMenuProps> = (props: TopOrSideMenuProps) => (
  <>
    <div className={`sider_logo-${props.mode}`}>
      <Link to="/">
        <img alt="logo" src={logo} className="sider_logo_image"></img>
        <span className="sider_logo_text">问卷系统</span>
      </Link>
    </div>
    <Menu theme={props.theme} defaultSelectedKeys={[props.location.pathname]} selectedKeys={[props.location.pathname]} mode={props.mode}>
      <Menu.Item key="/">
        <Link to="/">
          <Icon type="table" />
          <span>问卷列表</span>
        </Link>
      </Menu.Item>
      <SubMenu
        key="sub1"
        title={
          <span>
            <Icon type="user" />
            <span>个人</span>
          </span>
        }
      >
        <Menu.Item key={Routes.ACCOUNT_CENTER}>
          <Link to={Routes.ACCOUNT_CENTER}>
            个人中心
          </Link>
        </Menu.Item>
        <Menu.Item key={Routes.ACCOUNT_SETTINGS}>
          <Link to={Routes.ACCOUNT_SETTINGS}>
            个人设置
          </Link>
        </Menu.Item>
      </SubMenu>
    </Menu>
  </>
);

const mapStateToProps = () => ({ });

export default withRouter(connect(mapStateToProps)(TopOrSideMenu));
