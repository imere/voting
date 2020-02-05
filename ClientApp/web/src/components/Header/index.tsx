import React from "react";
import { Layout } from "antd";
import { MenuMode } from "antd/lib/menu";

import styles from "./Header.module.scss";

const { Header } = Layout;

interface HeaderReceivedProps {
  children?: React.ReactNode;
  mode: MenuMode
}

const HeaderComponent: React.FC<HeaderReceivedProps> = ({ children, mode }: HeaderReceivedProps) => (
  <Header className={Reflect.get(styles, `header-${mode.startsWith("vertical") ? "inline" : mode}`)}>
    {children}
  </Header>
);

export default HeaderComponent;
