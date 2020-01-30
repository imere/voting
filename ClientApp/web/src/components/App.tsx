import React, { Suspense, useState } from "react";
import { Layout, Spin } from "antd";
import { Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";

import FooterComponent from "./Footer";
import HeaderComponent from "./Header";

const SiderComponentLazy = React.lazy(() => import("./Sider"));

const ContentComponentLazy = React.lazy(() => import("./Content"));

export default function App() {
  const [
    collapsed,
    toggleTrigger
  ] = useState(false);

  return (
    <Suspense fallback>
      <Layout style={{ "minHeight": "100vh" }}>
        <SiderComponentLazy collapsed={collapsed} />

        <Layout>
          <HeaderComponent
            collapsed={collapsed}
            toggleTrigger={() => toggleTrigger(!collapsed)}
          />

          <ContentComponentLazy>
            <Suspense fallback={<Spin />}>
              <BrowserRouter>
                <Switch>
                  <Route></Route>
                </Switch>
              </BrowserRouter>
            </Suspense>
          </ContentComponentLazy>

          <FooterComponent />

        </Layout>
      </Layout>
    </Suspense>
  );
}
