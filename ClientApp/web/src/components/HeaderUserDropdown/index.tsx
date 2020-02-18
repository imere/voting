import React from "react";
import { Dropdown, Menu } from "antd";
import { connect } from "react-redux";
import { User } from "oidc-client";
import { Link } from "react-router-dom";

import { ApplicationState } from "@/reducers/states";
import { iu } from "@/actions";
import { Disp, None } from "@/types";
import { AuthAction } from "@/actions/action-auth";

import styles from "./HeaderUserDropdown.module.scss";
import { authItems, normalItems } from "./items";

type HeaderUserDropdownDispatch = Disp<ApplicationState, undefined, AuthAction>;

interface HeaderUserDropdownReceivedProps {
  children?: React.ReactNode;
  user: User | None;
}

interface HeaderUserDropdownOwnDispatchProps {
  logout: () => void;
}

export type HeaderUserDropdownProps =
  HeaderUserDropdownOwnDispatchProps &
  HeaderUserDropdownReceivedProps;

const HeaderUserDropdownComponent = ({ children, user, logout }: HeaderUserDropdownProps) => (
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
);

const mapDispatchToProps = (
  dispatch: HeaderUserDropdownDispatch
): HeaderUserDropdownOwnDispatchProps => ({
  "logout": () => dispatch(iu.logout()),
});

export default connect(null, mapDispatchToProps)(HeaderUserDropdownComponent);
