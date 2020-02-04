import { ClickParam } from "antd/lib/menu";

import { Routes } from "@/constants";

import { HeaderUserDropdownProps } from "./index";

type MenuItem =
  | {
      content: string;
      link?: string;
      onClick?: (param: ClickParam) => void;
    }
  | undefined;

export function normalItems(): MenuItem[] {
  return [
    {
      content: "问卷列表",
      link: "/",
    }
  ];
}

export function authItems(props: HeaderUserDropdownProps): MenuItem[] {
  return [
    {
      "content": "用户中心",
      link: Routes.ACCOUNT_CENTER,
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
}
