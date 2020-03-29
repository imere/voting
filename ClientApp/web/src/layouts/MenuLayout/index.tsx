import Loadable from "@loadable/component";
import React from "react";
import { Layout } from "antd";

import ContentComponent from "@/components/Content";
import HeaderComponent from "@/components/Header";
import TopOrSideMenu from "@/components/TopOrSideMenu";
import FooterComponent from "@/layouts/Footer";
import { defaultLoadableOption } from "@/shared/conf";

interface MenuLayoutReceivedProps {
  useTML: boolean
  collapsed: boolean;
  header: React.ReactNode;
  content: React.ReactNode;
}

type MenuLayoutProps = MenuLayoutReceivedProps;

const SiderLazy = Loadable(
  () => import("@/components/Sider"),
  defaultLoadableOption
);

const MenuLayout: React.FC<MenuLayoutProps> = ({ useTML, collapsed, header, content }: MenuLayoutProps) => (
  <Layout style={{ "minHeight": "100vh" }}>

    {
      useTML
        ? undefined
        : (
          <SiderLazy collapsed={collapsed}>
            <TopOrSideMenu mode="inline" />
          </SiderLazy>
        )
    }

    <Layout>

      <HeaderComponent mode="inline">
        {useTML ? <TopOrSideMenu mode="horizontal" /> : undefined}
        {header}
      </HeaderComponent>

      <ContentComponent>
        {content}
      </ContentComponent>

      <FooterComponent />

    </Layout>

  </Layout>
);

export { MenuLayout };
