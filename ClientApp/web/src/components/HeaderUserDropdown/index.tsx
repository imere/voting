import React from "react";
import { Dropdown, Menu } from "antd";
import { ClickParam } from "antd/lib/menu";
import { connect } from "react-redux";
import { User } from "oidc-client";
import { Link } from "react-router-dom";

import { ApplicationState } from "@/reducers/index";
import { iu } from "@/actions/index";
import { AuthAction } from "@/actions/auth";
import { Disp, None } from "@/types";
import { Routes } from "@/constants";

import("./HeaderUserDropdown.scss");

type HeaderUserDropdownDispatch = Disp<ApplicationState, undefined, AuthAction>;

interface HeaderUserDropdownReceivedProps {
  children?: React.ReactNode;
  user: User | None;
}
interface HeaderUserDropdownOwnDispatchProps {
  logout: () => void;
}
type HeaderUserDropdownProps = HeaderUserDropdownOwnDispatchProps &
  HeaderUserDropdownReceivedProps;

type HeaderUserDropdownMenuItem =
  | {
      content: string;
      link?: string;
      onClick?: (param: ClickParam) => void;
    }
  | undefined;

const HeaderUserDropdownComponent = (props: HeaderUserDropdownProps) => {
  const normalItems: HeaderUserDropdownMenuItem[] = [];
  const loggedItems: HeaderUserDropdownMenuItem[] = [
    {
      "content": "用户中心",
    },
    {
      "content": "用户设置",
      link: Routes.ACCOUNT_SETTINGS,
    },
    undefined,
    {
      "content": "退出登录",
      "onClick": () => props.logout(),
    },
  ];
  return (
    <Dropdown
      className="user-dropdown"
      overlay={
        <Menu>
          {(!props.user
            ? loggedItems : normalItems).map((item, i) => item ? (
            <Menu.Item key={i} onClick={item.onClick}>
              <Link to={item.link || "#"} rel="noopener noreferrer">{item.content}</Link>
            </Menu.Item>
          )
            : (
              <Menu.Divider key={i} />
            )
          )}
        </Menu>
      }
    >
      {props.children}
    </Dropdown>
  );
};

const mapDispatchToProps = (
  dispatch: HeaderUserDropdownDispatch
): HeaderUserDropdownOwnDispatchProps => ({
  "logout": () => dispatch(iu.logout()),
});

export default connect(null, mapDispatchToProps)(HeaderUserDropdownComponent);
