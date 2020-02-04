import React from "react";
import { Layout } from "antd";

import Content from "@/components/Content";
import HeaderComponent from "@/components/Header";
import FooterComponent from "@/layouts/Footer";
import TopOrSideMenu from "@/layouts/TopOrSideMenu";

interface SiderLeftLayoutReceivedProps {
  collapsed: boolean;
  header: React.ReactNode;
  content: React.ReactNode;
}

type SideMenuLayoutProps = SiderLeftLayoutReceivedProps;

const SiderLazy = React.lazy(() => import("@/components/Sider"));

const SideMenuLayout: React.FC<SideMenuLayoutProps> = (props: SideMenuLayoutProps) => (
  <Layout style={{ "minHeight": "100vh" }}>
    
    <SiderLazy theme="dark" collapsed={props.collapsed}>
      <TopOrSideMenu theme="dark" mode="inline" />
    </SiderLazy>

    <Layout>

      <HeaderComponent>
        {props.header}
      </HeaderComponent>
      
      <Content>
        {props.content}
      </Content>

      <FooterComponent />

    </Layout>

  </Layout>
);

export default SideMenuLayout;
