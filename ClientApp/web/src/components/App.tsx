import React, { Suspense, useState } from "react";
import { Layout } from "antd";
import { Route, Switch } from "react-router";

import { Routes } from "@/constants";

import Fallback from "./Fallback";
import FooterComponent from "./Footer";
import HeaderComponent from "./Header";

const SiderLazy = React.lazy(() => import("./Sider"));

const ContentLazy = React.lazy(() => import("./Content"));

const AccountSettingsLazy = React.lazy(() => import("./AccountSettings"));

export default function App() {
  const [
    collapsed,
    toggleTrigger
  ] = useState(true);

  return (
    <Suspense fallback={<Fallback />}>
      <Layout style={{ "minHeight": "100vh" }}>
        <SiderLazy collapsed={collapsed} />

        <Layout>
          <HeaderComponent
            collapsed={collapsed}
            toggleTrigger={() => toggleTrigger(!collapsed)}
          />

          <ContentLazy>
            <Switch>
              <Route path={Routes.ACCOUNT_SETTINGS} component={AccountSettingsLazy}></Route>
            </Switch>
          </ContentLazy>

          <FooterComponent />

        </Layout>
      </Layout>
    </Suspense>
  );
}
