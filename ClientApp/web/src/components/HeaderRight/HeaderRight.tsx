import './HeaderRight.scss';

import React from 'react';
import { connect } from 'react-redux';

import { UserAuthentication } from '../../actions/log';
import { UserDropdown } from '../UserDropdown/UserDropdown';
import { LogAction, login, logout } from '../../actions';
import { Disp } from '../../index';
import { ApplicationState } from '../../reducers';

type HeaderRightDispatch = Disp<ApplicationState, undefined, LogAction>;

interface HeaderRightProps {
  login: (user: UserAuthentication) => void;
}

interface HeaderRightState {}

export class HeaderRightComponent extends React.Component<
  HeaderRightProps,
  HeaderRightState
> {
  render = () => {
    this.props.login({ username: 'usernames', password: '' });
    return (
      <div className="header-right">
        <UserDropdown />
      </div>
    );
  };
}

const mapDispatchToProps = (
  dispatch: HeaderRightDispatch
): HeaderRightProps => {
  return {
    login: (user: UserAuthentication) => dispatch(login(user)),
  };
};

export const HeaderRight = connect(
  null,
  mapDispatchToProps
)(HeaderRightComponent);
