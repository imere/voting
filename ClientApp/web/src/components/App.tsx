import React, { useState } from "react";
import { Layout } from "antd";

import ContentComponent from "./Content";
import FooterComponent from "./Footer";
import HeaderComponent from "./Header";
import SiderComponent from "./Sider";

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
