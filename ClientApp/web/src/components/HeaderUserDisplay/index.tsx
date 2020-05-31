import React from 'react';
import { Avatar, Spin } from 'antd';
import { connect } from 'react-redux';
import { SiderTheme } from 'antd/es/layout/Sider';
import { User } from 'oidc-client';
import { UserOutlined } from '@ant-design/icons';

import HeaderUserDropdown from '@/components/HeaderUserDropdown';
import { ApplicationState } from '@/store/state';
import { classnames } from '@/framework/shared/classnames';
import { None } from '@/typings/types';
import { lengthGt } from '@/shared/validate';

import styles from './HeaderUserDisplay.module.scss';

interface HeaderUserDisplayOwnStateProps {
  pending?: boolean
  user?: User | None
  theme: SiderTheme
}

type HeaderUserDisplayProps = HeaderUserDisplayOwnStateProps;

const HeaderUserDisplay = ({ pending, user, theme }: HeaderUserDisplayProps) => (
  <HeaderUserDropdown user={user}>
    <div className={classnames(
      styles['user-dropdown'],
      Reflect.get(styles, `user-dropdown-${theme}`),
    )}>
      <Spin spinning={pending}>
        <Avatar
          style={user ? { color: '#f56a00', backgroundColor: '#fde3cf' } : undefined}
          icon={user ? undefined : <UserOutlined />}
        >
          {user && (
            user.profile.name?.slice(0, 5)
          )}
        </Avatar>
        {user && (
          <span className={styles['user-display_username']}>{
            lengthGt(user.profile.name, 10)
              ? user.profile.name?.slice(0, 10).concat('...')
              : user.profile.name
          }</span>
        )}
      </Spin>
    </div>
  </HeaderUserDropdown>
);

const mapStateToProps = (state: ApplicationState): HeaderUserDisplayOwnStateProps => ({
  pending: state.auth.pending,
  user: state.auth.user,
  theme: state.context.theme,
});

export default connect(mapStateToProps)(HeaderUserDisplay);
