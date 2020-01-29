import React from "react";
import { Breadcrumb, Layout } from "antd";
import { useRouteMatch } from "react-router";

const { Content } = Layout;

interface ContentReceivedProps {
  children?: React.ReactNode
}

const ContentComponent: React.FC<ContentReceivedProps> = (props: ContentReceivedProps) => (
  <Content style={{ "margin": "0 16px" }}>
    <Breadcrumb style={{ "margin": "16px 0" }}>
      {
        useRouteMatch().path.
          split("/").filter((p) => p !== "").
          map((name) => (
            <Breadcrumb.Item key={name}>{name}</Breadcrumb.Item>
          ))
      }
    </Breadcrumb>
    {props.children}
  </Content>
);

export default ContentComponent;
