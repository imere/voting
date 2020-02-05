import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router";
import { Icon } from "antd";

import SideMenuLayout from "@/layouts/SideMenuLayout";
import TopMenuLayout from "@/layouts/TopMenuLayout";
import { useSessionState } from "@/hooks/useSessionState";
import { Routes } from "@/constants";

import styles from "./App.module.scss";
import Fallback from "./Fallback";
import HeaderNavComponent from "./HeaderNav";

export default function App() {
  const [
    collapsed,
    toggleCollapsed
  ] = useSessionState("siderCollapse", true);
  
  const [useTML] = useSessionState("topMenu", true);

  const content = (
    <>
      <Suspense fallback={<Fallback />}>
        <Switch>
          <Route path={Routes.POLL_LIST} component={React.lazy(() => import("./PollList"))}></Route>
          <Route path={Routes.ACCOUNT_CENTER} component={React.lazy(() => import("./AccountCenter"))}></Route>
          <Route path={Routes.ACCOUNT_SETTINGS} component={React.lazy(() => import("./AccountSettings"))}></Route>
          <Redirect from="/" to={Routes.POLL_LIST} />
        </Switch>
      </Suspense>
    </>
  );

  const SML = (
    <SideMenuLayout
      collapsed={collapsed}
      header={
        <>
          <Icon
            className={styles["header_sider-trigger"]}
            type={collapsed ? "menu-unfold" : "menu-fold"}
            onClick={() => toggleCollapsed(!collapsed)}
          />
          <HeaderNavComponent />
        </>
      }
      content={content}
    />
  );

  const TML = (
    <TopMenuLayout
      header={
        <HeaderNavComponent />
      }
      content={content}/>
  );

  return useTML ? TML : SML;
}
