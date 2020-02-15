import React, { Suspense } from "react";
import { Switch } from "react-router";
import { Icon } from "antd";
import { SiderTheme } from "antd/es/layout/Sider";
import { connect } from "react-redux";

import Fallback from "@/components/Fallback";
import HeaderNavComponent from "@/components/HeaderNav";
import SideMenuLayout from "@/layouts/SideMenuLayout";
import TopMenuLayout from "@/layouts/TopMenuLayout";
import AppRoutes from "@/routes/AppRoutes";
import { useSessionState } from "@/hooks/useSessionState";
import { ApplicationState } from "@/reducers";
import { classnames } from "@/shared/classnames";
import { renderRoutes } from "@/routes/utils";

import styles from "./App.module.scss";

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
          {renderRoutes(AppRoutes)}
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
