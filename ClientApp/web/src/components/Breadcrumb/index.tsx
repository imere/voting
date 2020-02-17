import React from "react";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";

import { Routes } from "@/constants";

import styles from "./Breadcrumb.module.scss";

const RouteNameMap: {[key: string]: string} = new Proxy({
  "/": "首页",
  [Routes.ACCOUNT_CENTER]: "个人中心",
  [Routes.ACCOUNT_SETTINGS]: "个人设置",
  [Routes.POLL]: "问卷",
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

const BreadCrumbComponent = () => {
  const { pathname } = location;
  const paths = pathname.split("/").slice(1);
  return (
    <Breadcrumb className={styles.breadcrumb}>
      {
        [
          <Breadcrumb.Item key="/">
            <Link to="/">首页</Link>
          </Breadcrumb.Item>
        ].
          concat(
            paths.map((_, i) => {
              const route = `/${paths.slice(0, i + 1).join("/")}`;
              return (
                <Breadcrumb.Item key={i}>
                  {
                    Object.values(Routes).some((value) => route === value)
                      ? <Link to={route}>{RouteNameMap[route]}</Link>
                      : undefined
                  }
                </Breadcrumb.Item>
              );
            }).filter((r) => r)
          )
      }
    </Breadcrumb>
  );
};

export default BreadCrumbComponent;
