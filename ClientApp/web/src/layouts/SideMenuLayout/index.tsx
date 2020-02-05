import React from "react";
import { Layout } from "antd";

import Content from "@/components/Content";
import HeaderComponent from "@/components/Header";
import TopOrSideMenu from "@/components/TopOrSideMenu";
import FooterComponent from "@/layouts/Footer";

interface SideMenuLayoutReceivedProps {
  collapsed: boolean;
  header: React.ReactNode;
  content: React.ReactNode;
}

type SideMenuLayoutProps = SideMenuLayoutReceivedProps;

const SiderLazy = React.lazy(() => import("@/components/Sider"));

const SideMenuLayout: React.FC<SideMenuLayoutProps> = ({ collapsed, header, content }: SideMenuLayoutProps) => (
  <Layout style={{ "minHeight": "100vh" }}>
    
    <SiderLazy collapsed={collapsed}>
      <TopOrSideMenu mode="inline" />
    </SiderLazy>

    <Layout>

      <HeaderComponent mode="inline">
        {header}
      </HeaderComponent>
      
      <Content>
        {content}
      </Content>

      <FooterComponent />

    </Layout>

  </Layout>
);

export default SideMenuLayout;
