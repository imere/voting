import React from "react";
import { Menu } from "antd";
import { ClickParam } from "antd/lib/menu";
import { connect } from "react-redux";
import { ApplicationState } from "@reducers/index";
import { login, logout } from "@actions/index";
import { LogAction, UserAuthentication } from "@actions/log";

import { Disp, None } from "@/types";

type UserDropdownMenuDispatch = Disp<ApplicationState, undefined, LogAction>;

interface UserDropdownMenuReceivedProps {
  username: string | None;
}
interface UserDropdownMenuOwnProps {
  login: (user: UserAuthentication) => void;
  logout: () => void;
}
type UserDropdownMenuProps = UserDropdownMenuOwnProps &
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
      "onClick": () => props.login({ "username": "asdlkj", "password": "" }),
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
      {(props.username ? loggedItems : normalItems).map((item, i) => item ? (
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
): UserDropdownMenuOwnProps => ({
  "login": (user: UserAuthentication) => dispatch(login(user)),
  "logout": () => dispatch(logout()),
});

export default connect(null, mapDispatchToState)(UserDropdownMenuComponent);
