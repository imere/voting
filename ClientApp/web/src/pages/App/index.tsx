import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router";
import { Icon } from "antd";
import { SiderTheme } from "antd/lib/layout/Sider";
import { connect } from "react-redux";

import Fallback from "@/components/Fallback";
import HeaderNavComponent from "@/components/HeaderNav";
import SideMenuLayout from "@/layouts/SideMenuLayout";
import TopMenuLayout from "@/layouts/TopMenuLayout";
import { useSessionState } from "@/hooks/useSessionState";
import { Routes } from "@/constants";
import { ApplicationState } from "@/reducers";
import { classnames } from "@/shared/classnames";

import styles from "./App.module.scss";

const PollListLazy = React.lazy(() => import("@/components/PollList"));

const AccountCenterLazy = React.lazy(() => import("@/components/AccountCenter"));

const AccountSettingsLazy = React.lazy(() => import("@/components/AccountSettings"));

interface AppOwnStateProps {
  theme: SiderTheme
}

type AppProps = AppOwnStateProps;

function App({ theme }: AppProps) {
  const [
    collapsed,
    toggleCollapsed
  ] = useSessionState("siderCollapse", true);
  
  const [useTML] = useSessionState("topMenu", true);

  const content = (
    <>
      <Suspense fallback={<Fallback />}>
        <Switch>
          <Route path={Routes.POLL_LIST} component={PollListLazy}></Route>
          <Route path={Routes.ACCOUNT_CENTER} component={AccountCenterLazy}></Route>
          <Route path={Routes.ACCOUNT_SETTINGS} component={AccountSettingsLazy}></Route>
          <Redirect to={Routes.POLL_LIST} />
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
            className={classnames(
              styles["header-sider-trigger"],
              Reflect.get(styles, `header-sider-trigger-${theme}`),
            )}
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

const mapStateToProps = (state: ApplicationState): AppOwnStateProps => ({
  theme: state.context.theme,
});

export default connect(mapStateToProps)(App);
