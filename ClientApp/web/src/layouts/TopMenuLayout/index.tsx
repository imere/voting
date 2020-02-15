import React from "react";
import { Layout } from "antd";

import ContentComponent from "@/components/Content";
import HeaderComponent from "@/components/Header";
import TopOrSideMenu from "@/components/TopOrSideMenu";
import FooterComponent from "@/layouts/Footer";

interface TopMenuLayoutReceivedProps {
  header: React.ReactNode;
  content: React.ReactNode;
}

type TopMenuLayoutProps = TopMenuLayoutReceivedProps;

const TopMenuLayout: React.FC<TopMenuLayoutProps> = ({ header, content }: TopMenuLayoutProps) => (
  <Layout style={{ "minHeight": "100vh" }}>

    <HeaderComponent mode="horizontal">
      <TopOrSideMenu mode="horizontal" />
      {header}
    </HeaderComponent>

    <ContentComponent>
      {content}
    </ContentComponent>

    <FooterComponent />

  </Layout>
);

export default TopMenuLayout;
