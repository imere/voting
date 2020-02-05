import React from "react";
import { Spin } from "antd";

import styles from "./Fallback.module.scss";

const Fallback: React.FC = () =>
  <div className={styles.fallback}>
    <Spin size="large" />
  </div>;

export default Fallback;
