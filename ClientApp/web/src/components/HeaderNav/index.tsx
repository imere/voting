import React from "react";

import UserDisplay from "@/components/HeaderUserDisplay";

import("./HeaderNav.scss");

interface HeaderNavProps {}

interface HeaderNavState {}

class HeaderNavComponent extends React.Component<
  HeaderNavProps,
  HeaderNavState
> {
  render = () => (
    <div className="header-nav">
      <UserDisplay />
    </div>
  );
}

export default HeaderNavComponent;
