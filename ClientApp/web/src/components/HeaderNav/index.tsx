import './HeaderNav.scss';

import React from 'react';
import { connect } from 'react-redux';

import UserDropdown from '../UserDropdown';
import { UserAuthentication } from '../../actions/log';
import { login } from '../../actions';
import { LogAction } from '../../actions/log';
import { Disp } from '../../types';
import { ApplicationState } from '../../reducers';

type HeaderNavDispatch = Disp<ApplicationState, undefined, LogAction>;

interface HeaderNavOwnProps {
  login: (user: UserAuthentication) => void;
}

interface HeaderNavState {}

class HeaderNavComponent extends React.Component<
  HeaderNavOwnProps,
  HeaderNavState
> {
  render = () => {
    this.props.login({ username: 'usernames', password: '' });
    return (
      <div className="header-nav">
        <UserDropdown />
      </div>
    );
  };
}

const mapDispatchToProps = (dispatch: HeaderNavDispatch): HeaderNavOwnProps => {
  return {
    login: (user: UserAuthentication) => dispatch(login(user)),
  };
};

export default connect(null, mapDispatchToProps)(HeaderNavComponent);
