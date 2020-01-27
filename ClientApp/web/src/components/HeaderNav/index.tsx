import "./HeaderNav.scss";

import UserDropdown from "@components/UserDropdown";
import React from "react";

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
