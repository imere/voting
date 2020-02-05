import React from "react";
import { Icon, Menu } from "antd";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { MenuTheme } from "antd/lib/menu/MenuContext";
import { connect } from "react-redux";

import logo from "@/components/logo.svg";
import { Routes } from "@/constants";
import { ApplicationState } from "@/reducers";
import { AuthState } from "@/reducers/auth";

import styles from "./Common.module.scss";

const { SubMenu } = Menu;

type MenuMode = "vertical" | "vertical-left" | "vertical-right" | "horizontal" | "inline";

interface TopOrSideMenuReceivedProps {
  mode: MenuMode;
}

interface TopOrSideMenuOwnStateProps {
  theme: MenuTheme
  auth: AuthState
}

type TopOrSideMenuProps =
  RouteComponentProps
  & TopOrSideMenuOwnStateProps
  & TopOrSideMenuReceivedProps;

const TopOrSideMenu: React.FC<TopOrSideMenuProps> = ({ mode, theme, location, auth }: TopOrSideMenuProps) => {
  mode = mode.startsWith("vertical")
    ? "inline"
    : mode;
  import(`./${mode}.scss`);

  return (
    <>
      <div className={`sider_logo-${mode}`}>
        <Link to="/">
          <img alt="logo" src={logo} className={styles.sider_logo_image}></img>
          <span className={styles.sider_logo_text}>问卷系统</span>
        </Link>
      </div>
      <Menu theme={theme} defaultSelectedKeys={[location.pathname]} selectedKeys={[location.pathname]} mode={mode}>
        <Menu.Item key={Routes.POLL_LIST}>
          <Link to={Routes.POLL_LIST}>
            <Icon type="table" />
            <span>问卷列表</span>
          </Link>
        </Menu.Item>
        {
          auth.user
            ? (
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
            )
            : ""
        }
      </Menu>
    </>
  ); 
};

const mapStateToProps = (state: ApplicationState): TopOrSideMenuOwnStateProps => ({
  theme: state.context.theme,
  auth: state.auth,
});

export default withRouter(connect(mapStateToProps)(TopOrSideMenu));
