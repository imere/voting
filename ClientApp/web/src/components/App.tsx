import React, { Suspense } from "react";
import { Icon } from "antd";
import { Route, Switch } from "react-router";

import useSessionState from "@/hooks/useSessionState";
import SideMenuLayout from "@/layouts/SideMenuLayout";
import { Routes } from "@/constants";

import Fallback from "./Fallback";
import HeaderNavComponent from "./HeaderNav";

const AccountCenterLazy = React.lazy(() => import("./AccountCenter"));

const AccountSettingsLazy = React.lazy(() => import("./AccountSettings"));

export default function App() {
  const [
    collapsed,
    toggleCollapsed
  ] = useSessionState("siderCollapse", String(true));

  return (
    <SideMenuLayout
      collapsed={collapsed}
      header={
        <>
          <Icon
            className="header_sider-trigger"
            type={collapsed ? "menu-unfold" : "menu-fold"}
            onClick={() => toggleCollapsed(!collapsed)}
          />
          <HeaderNavComponent />
        </>
      }
      content={
        <>
          <Suspense fallback={<Fallback />}>
            <Switch>
              <Route path={Routes.ACCOUNT_CENTER} component={AccountCenterLazy}></Route>
              <Route path={Routes.ACCOUNT_SETTINGS} component={AccountSettingsLazy}></Route>
            </Switch>
          </Suspense>
        </>
      }
    />
  );
}
