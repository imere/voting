import React, { useState } from "react";
import { Layout } from "antd";

import { SiderComponent } from "./Sider/Sider";
import { ContentComponent } from "./Content/Content";
import { HeaderComponent } from "./Header/Header";
import { FooterComponent } from "./Footer/Footer";

export default () => {
  const [collapsed, toggleTrigger] = useState(false);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SiderComponent collapsed={collapsed} />
      <Layout>
        <HeaderComponent
          collapsed={collapsed}
          toggleTrigger={() => toggleTrigger(!collapsed)}
        />
        <ContentComponent />
        <FooterComponent />
      </Layout>
    </Layout>
  );
};
