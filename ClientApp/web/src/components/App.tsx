import React, { useState } from "react";
import { Layout } from "antd";

import ContentComponent from "./Content";
import FooterComponent from "./Footer";
import HeaderComponent from "./Header";
import SiderComponent from "./Sider";
import { Switch, Route } from "react-router";

export default function App ()  {
  const [
    collapsed,
    toggleTrigger
  ] = useState(false);

  return (
    <Layout style={{ "minHeight": "100vh" }}>
      <SiderComponent collapsed={collapsed} />
      <Layout>
        <HeaderComponent
          collapsed={collapsed}
          toggleTrigger={() => toggleTrigger(!collapsed)}
        />
        <ContentComponent>
          <Switch>
            <Route></Route>
          </Switch>
        </ContentComponent>
        <FooterComponent />
      </Layout>
    </Layout>
  );
}
