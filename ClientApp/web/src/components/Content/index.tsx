import React from "react";
import { Layout } from "antd";

import styles from "./Content.module.scss";

const { Content } = Layout;

interface ContentReceivedProps {
  children?: React.ReactNode
}

const ContentComponent: React.FC<ContentReceivedProps> = ({ children }: ContentReceivedProps) => (
  <Content className={styles.content}>
    {children}
  </Content>
);

export default ContentComponent;
