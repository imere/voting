import React from "react";
import { Layout } from "antd";

import FooterComponent from "@/layouts/Footer";

const { Content } = Layout;

interface AccountLayoutReceivedProps {
  content: React.ReactNode;
}

type AccountLayoutProps = AccountLayoutReceivedProps;

const AccountLayout: React.FC<AccountLayoutProps> = ({ content }: AccountLayoutProps) => (
  <Layout style={{ "minHeight": "100vh" }}>

    <Content style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      {content}
    </Content>

    <FooterComponent />

  </Layout>
);

export default AccountLayout;
