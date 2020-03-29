import React from 'react';
import { Layout } from 'antd';
import { MenuMode } from 'antd/es/menu';
import { SiderTheme } from 'antd/es/layout/Sider';
import { connect } from 'react-redux';

import { ApplicationState } from '@/reducers/state';
import { classnames } from '@/shared/classnames';

import styles from './Header.module.scss';

const { Header } = Layout;

interface HeaderReceivedProps {
  children?: React.ReactNode;
  mode: MenuMode
}

interface HeaderOwnStateProps {
  theme: SiderTheme
}

type HeaderProps =
  HeaderOwnStateProps &
  HeaderReceivedProps;

const HeaderComponent: React.FC<HeaderProps> = ({ children, mode, theme }: HeaderProps) => (
  <Header className={classnames(
    Reflect.get(styles, `header-${mode.startsWith('vertical') ? 'inline' : mode}`),
    Reflect.get(styles, `header-${theme}`),
  )}>
    {children}
  </Header>
);

const mapStateToProps = (state: ApplicationState): HeaderOwnStateProps => ({
  theme: state.context.theme
});

export default connect(mapStateToProps)(HeaderComponent);
