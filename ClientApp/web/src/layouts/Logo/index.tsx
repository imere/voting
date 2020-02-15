import logo from "@images/logo.svg";
import React from "react";
import { Link } from "react-router-dom";
import { MenuMode } from "antd/es/menu";
import { SiderTheme } from "antd/es/layout/Sider";

import { classnames } from "@/shared/classnames";

import styles from "./Logo.module.scss";

interface LogoReceivedProps {
  mode: MenuMode
  theme: SiderTheme
  style?: React.CSSProperties
}

type LogoProps = LogoReceivedProps;

const Logo: React.FC<LogoProps> = ({ mode, theme, style }: LogoProps) => (
  <div className={Reflect.get(styles, `sider-logo-${mode.startsWith("vertical") ? "inline": mode}`)} style={style}>
    <Link to="/" style={{ display: "contents" }}>

      <img alt="logo" src={logo} className={styles["sider-logo-image"]}></img>

      <span className={classnames(
        "inline" === mode ? "sider-logo-text" : undefined,
        styles["sider-logo-text"],
        Reflect.get(styles, `sider-logo-text-${theme}`)
      )}>
        问卷系统
      </span>

    </Link>
  </div>
);

export default Logo;
