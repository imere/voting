import Loadable from "@loadable/component";
import React from "react";
import { Layout } from "antd";

import ContentComponent from "@/components/Content";
import HeaderComponent from "@/components/Header";
import TopOrSideMenu from "@/components/TopOrSideMenu";
import FooterComponent from "@/layouts/Footer";
import { defaultLoadableOption } from "@/shared/conf";
import { SiderComponentReceivedProps } from "@/components/Sider";

interface SideMenuLayoutReceivedProps {
  collapsed: boolean;
  header: React.ReactNode;
  content: React.ReactNode;
}

type SideMenuLayoutProps = SideMenuLayoutReceivedProps;

const SiderLazy = Loadable<SiderComponentReceivedProps>(
  () => import("@/components/Sider"),
  defaultLoadableOption
);

const SideMenuLayout: React.FC<SideMenuLayoutProps> = ({ collapsed, header, content }: SideMenuLayoutProps) => (
  <Layout style={{ "minHeight": "100vh" }}>

    <SiderLazy collapsed={collapsed}>
      <TopOrSideMenu mode="inline" />
    </SiderLazy>

    <Layout>

      <HeaderComponent mode="inline">
        {header}
      </HeaderComponent>

      <ContentComponent>
        {content}
      </ContentComponent>

      <FooterComponent />

    </Layout>

  </Layout>
);

export default SideMenuLayout;
