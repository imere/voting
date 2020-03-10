import React from "react";
import { Dropdown, Menu } from "antd";
import { User } from "oidc-client";
import { Link } from "react-router-dom";

import ContextAuthConsumer from "@/components/ContextAuthConsumer";
import ContextAuthProvider from "@/components/ContextAuthProvider";
import { None } from "@/types";

import styles from "./HeaderUserDropdown.module.scss";
import { authItems, normalItems } from "./items";

interface HeaderUserDropdownReceivedProps {
  children?: React.ReactNode;
  user: User | None;
}

export type HeaderUserDropdownProps = HeaderUserDropdownReceivedProps;

const HeaderUserDropdownComponent = ({ children, user }: HeaderUserDropdownProps) => (
  <ContextAuthProvider>
    <ContextAuthConsumer>
      {
        ({ logout }) => (
          <Dropdown
            overlay={
              <Menu>
                {(user
                  ? authItems(logout) : normalItems()).map((item, i) => item ? (
                  <Menu.Item key={i} onClick={item.onClick}>
                    {item.icon}
                    <Link className={styles["item-link"]} to={item.link || "#"} rel="noopener noreferrer">{item.content}</Link>
                  </Menu.Item>
                )
                  : (
                    <Menu.Divider key={i} />
                  )
                )}
              </Menu>
            }
          >
            {children}
          </Dropdown>
        )
      }
    </ContextAuthConsumer>
  </ContextAuthProvider>
);

export default HeaderUserDropdownComponent;
