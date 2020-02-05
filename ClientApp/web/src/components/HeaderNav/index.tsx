import React from "react";

import UserDisplay from "@/components/HeaderUserDisplay";

import styles from "./HeaderNav.module.scss";

interface HeaderNavProps {}

const HeaderNavComponent: React.FC<HeaderNavProps> = () =>  (
  <div className={`${styles["header-nav"]} ant-menu-light`}>
    <UserDisplay />
  </div>
);

export default HeaderNavComponent;
