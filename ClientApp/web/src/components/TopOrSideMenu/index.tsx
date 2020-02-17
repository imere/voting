import React from "react";
import { Menu } from "antd";
import { TableOutlined, UserOutlined } from "@ant-design/icons";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { MenuTheme } from "antd/es/menu/MenuContext";
import { connect } from "react-redux";
import { MenuMode } from "antd/es/menu";
import { User } from "oidc-client";

import Logo from "@/layouts/Logo";
import { Routes } from "@/constants";
import { ApplicationState } from "@/reducers";
import { None } from "@/types";

const { SubMenu } = Menu;

interface TopOrSideMenuReceivedProps {
  mode: MenuMode;
}

interface TopOrSideMenuOwnStateProps {
  theme: MenuTheme
  user?: User | None
}

type TopOrSideMenuProps =
  RouteComponentProps &
  TopOrSideMenuOwnStateProps &
  TopOrSideMenuReceivedProps;

const TopOrSideMenu: React.FC<TopOrSideMenuProps> = ({ mode, theme, location, user }: TopOrSideMenuProps) => {
  mode = mode.startsWith("vertical") ? "inline" : mode;
  import(`./${mode}.scss`);

  return (
    <>
      <Logo mode={mode} theme={theme} />
      <Menu theme={theme} defaultSelectedKeys={[location.pathname]} selectedKeys={[location.pathname]} mode={mode}>
        <Menu.Item key={Routes.POLL_LIST}>
          <Link to={Routes.POLL_LIST}>
            <TableOutlined />
            <span>问卷列表</span>
          </Link>
        </Menu.Item>
        {
          user
            ? (
              <SubMenu
                key="sub1"
                title={
                  <span>
                    <UserOutlined />
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
            )
            : ""
        }
      </Menu>
    </>
  );
};

const mapStateToProps = (state: ApplicationState): TopOrSideMenuOwnStateProps => ({
  theme: state.context.theme,
  user: state.auth.user,
});

export default withRouter(connect(mapStateToProps)(TopOrSideMenu));
