import './UserDropdown.scss';

import React from 'react';
import { Avatar, Dropdown, Icon } from 'antd';
import { connect } from 'react-redux';

import UserDropdownMenu from '../UserDropdownMenu';
import { ApplicationState } from '../../reducers';
import { LogState } from '../../reducers/log';

interface UserDropdownOwnProps {
  log: LogState;
}

const UserDropdownComponent = (props: UserDropdownOwnProps) => {
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

const mapStateToProps = (state: ApplicationState): UserDropdownOwnProps => {
  return {
    log: state.log,
  };
};

export default connect(mapStateToProps)(UserDropdownComponent);
