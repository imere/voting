import React from "react";
import { Dropdown, Menu } from "antd";
import { connect } from "react-redux";
import { User } from "oidc-client";
import { Link } from "react-router-dom";

import { ApplicationState } from "@/reducers/index";
import { iu } from "@/actions/index";
import { AuthAction } from "@/actions/auth";
import { Disp, None } from "@/types";

import { authItems, normalItems } from "./items";

type HeaderUserDropdownDispatch = Disp<ApplicationState, undefined, AuthAction>;

interface HeaderUserDropdownReceivedProps {
  children?: React.ReactNode;
  user: User | None;
}
interface HeaderUserDropdownOwnDispatchProps {
  logout: () => void;
}
export type HeaderUserDropdownProps = HeaderUserDropdownOwnDispatchProps &
  HeaderUserDropdownReceivedProps;

const HeaderUserDropdownComponent = (props: HeaderUserDropdownProps) => (
  <Dropdown
    overlay={
      <Menu>
        {(props.user
          ? authItems(props) : normalItems()).map((item, i) => item ? (
          <Menu.Item key={i} onClick={item.onClick}>
            <Link to={item.link || "#"} rel="noopener noreferrer">{item.content}</Link>
          </Menu.Item>
        )
          : (
            <Menu.Divider key={i} />
          )
        )}
      </Menu>
    }
  >
    {props.children}
  </Dropdown>
);

const mapDispatchToProps = (
  dispatch: HeaderUserDropdownDispatch
): HeaderUserDropdownOwnDispatchProps => ({
  "logout": () => dispatch(iu.logout()),
});

export default connect(null, mapDispatchToProps)(HeaderUserDropdownComponent);
