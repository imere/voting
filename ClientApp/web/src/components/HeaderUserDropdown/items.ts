import { ClickParam } from "antd/lib/menu";

import { Routes } from "@/constants";

import { HeaderUserDropdownProps } from "./index";

type MenuItem =
  {
    content: string
    link?: string
    iconType?: string
    onClick?: (param: ClickParam) => void
  }
  | undefined;

export function normalItems(): MenuItem[] {
  return [
    {
      iconType: "link",
      content: "用户登录",
      link: Routes.USER_LOGIN,
    }
  ];
}

export function authItems(logout: HeaderUserDropdownProps["logout"]): MenuItem[] {
  return [
    {
      iconType: "user",
      "content": "用户中心",
      link: Routes.ACCOUNT_CENTER,
    },
    {
      iconType: "setting",
      "content": "用户设置",
      link: Routes.ACCOUNT_SETTINGS,
    },
    undefined,
    {
      iconType: "poweroff",
      "content": "退出登录",
      "onClick": () => logout(),
    },
  ];
}
