import React from "react";
import { ClickParam } from "antd/es/menu";
import { LinkOutlined, PoweroffOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";

import { Routes } from "@/constants";

import { HeaderUserDropdownProps } from "./index";

type MenuItem =
  | {
    content: string
    link?: string
    icon?: React.ReactNode
    onClick?: (param: ClickParam) => void
  }
  | undefined;

export function normalItems(): MenuItem[] {
  return [
    {
      icon: <LinkOutlined />,
      content: "用户登录",
      link: Routes.USER_LOGIN,
    }
  ];
}

export function authItems(logout: HeaderUserDropdownProps["logout"]): MenuItem[] {
  return [
    {
      icon: <UserOutlined />,
      "content": "用户中心",
      link: Routes.ACCOUNT_CENTER,
    },
    {
      icon: <SettingOutlined />,
      "content": "用户设置",
      link: Routes.ACCOUNT_SETTINGS,
    },
    undefined,
    {
      icon: <PoweroffOutlined />,
      "content": "退出登录",
      "onClick": () => logout(),
    },
  ];
}
