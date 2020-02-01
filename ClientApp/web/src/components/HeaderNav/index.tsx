import React from "react";

import UserDropdown from "@/components/HeaderUserDisplay";

import("./HeaderNav.scss");

interface HeaderNavProps {}

interface HeaderNavState {}

class HeaderNavComponent extends React.Component<
  HeaderNavProps,
  HeaderNavState
> {
  render = () => (
    <div className="header-nav">
      <UserDropdown />
    </div>
  );
}
export default HeaderNavComponent;
