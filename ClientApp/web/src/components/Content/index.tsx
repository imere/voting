import React from "react";
import { Layout } from "antd";

const { Content } = Layout;

interface ContentReceivedProps {
  children?: React.ReactNode
}

const ContentComponent: React.FC<ContentReceivedProps> = (props: ContentReceivedProps) => (
  <Content style={{ "margin": "40px 25px 0 25px" }}>
    {props.children}
  </Content>
);

export default ContentComponent;
