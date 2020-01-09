import React from 'react';
import { Breadcrumb, Layout } from 'antd';

const { Content } = Layout;

export const ContentComponent = (props: { children?: React.ReactNode }) => (
  <Content style={{ margin: '0 16px' }}>
    <Breadcrumb style={{ margin: '16px 0' }}>
      <Breadcrumb.Item>User</Breadcrumb.Item>
      <Breadcrumb.Item>Bill</Breadcrumb.Item>
    </Breadcrumb>
    {props.children}
  </Content>
);
