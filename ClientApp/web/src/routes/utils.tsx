import React from "react";
import { Redirect, Route } from "react-router";
import { LocationDescriptor } from "history";

import { Routes } from "@/constants";

import { RouteArrayType } from "./routes";

export function renderRoutes(routes: RouteArrayType) {
  return routes.map((route, i) =>
    route.redirect
      ? <Redirect key={i} to={route.to as LocationDescriptor<any>} {...route} />
      : <Route key={i} {...route} />
  );
}

export const RouteNameMap: {[key: string]: string} = new Proxy({
  "/": "首页",
  [Routes.ACCOUNT_CENTER]: "个人中心",
  [Routes.ACCOUNT_SETTINGS]: "个人设置",
  [Routes.POLL_LIST]: "问卷列表",
  [Routes.POLL_NEW]: "创建问卷",
}, {
  get(target, p, receiver) {
    const value = Reflect.get(target, p, receiver);
    if ("undefined" !== typeof value) {
      return value;
    }
    return p;
  }
});
