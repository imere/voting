import React from "react";
import { Menu } from "antd";
import { ClickParam } from "antd/lib/menu";
import { connect } from "react-redux";
import { ApplicationState } from "@reducers/index";
import { iu } from "@actions/index";
import { AuthAction, UserAuthentication } from "@actions/auth";
import { User } from "oidc-client";

import { Disp, None } from "@/types";

type UserDropdownMenuDispatch = Disp<ApplicationState, undefined, AuthAction>;

interface UserDropdownMenuReceivedProps {
  user: User | None;
}
interface UserDropdownMenuOwnDispatchProps {
  login: (user: UserAuthentication) => void;
  logout: () => void;
}
type UserDropdownMenuProps = UserDropdownMenuOwnDispatchProps &
  UserDropdownMenuReceivedProps;

type UserDropdownMenuItem =
  | {
      content: string;
      link?: string;
      onClick?: (param: ClickParam) => void;
    }
  | undefined;

const UserDropdownMenuComponent = (props: UserDropdownMenuProps) => {
  const normalItems: UserDropdownMenuItem[] = [
    {
      "content": "登录",
      "onClick": () => props.login({ "username": "ausername", "password": "apassword" }),
    },
  ];
  const loggedItems: UserDropdownMenuItem[] = [
    {
      "content": "用户中心",
    },
    {
      "content": "用户设置",
    },
    undefined,
    {
      "content": "退出登录",
      "onClick": () => props.logout(),
    },
  ];
  return (
    <Menu>
      {(props.user ? loggedItems : normalItems).map((item, i) => item ? (
        <Menu.Item key={i} onClick={item.onClick}>
          <a rel="noopener noreferrer" href={item.link}>
            {item.content}
          </a>
        </Menu.Item>
      ) : (
        <Menu.Divider key={i} />
      ))}
    </Menu>
  );
};

const mapDispatchToState = (
  dispatch: UserDropdownMenuDispatch
): UserDropdownMenuOwnDispatchProps => ({
  "login": (user: UserAuthentication) => dispatch(iu.login(user)),
  "logout": () => dispatch(iu.logout()),
});

export default connect(null, mapDispatchToState)(UserDropdownMenuComponent);
