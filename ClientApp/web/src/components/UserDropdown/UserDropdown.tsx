import './UserDropdown.scss';

import React from 'react';
import { Avatar, Dropdown, Icon } from 'antd';
import { connect } from 'react-redux';

import { ApplicationState } from '../../reducers';
import { UserDropdownMenu } from '../UserDropdownMenu/UserDropdownMenu';
import { LogState } from '../../reducers';

interface UserDropdownProps {
  log: LogState;
}

export const UserDropdownComponent = (props: UserDropdownProps) => {
  return (
    <div className="user-dropdown">
      <Dropdown
        className="user-dropdown_dropdown"
        overlay={<UserDropdownMenu username={props.log.username} />}
      >
        <span>
          <Avatar icon={<Icon type="user" />} />
          {props.log.username && (
            <span className="username">{props.log.username}</span>
          )}
        </span>
      </Dropdown>
    </div>
  );
};

const mapStateToProps = (state: ApplicationState): UserDropdownProps => {
  return {
    log: state.log,
  };
};

export const UserDropdown = connect(mapStateToProps)(UserDropdownComponent);
