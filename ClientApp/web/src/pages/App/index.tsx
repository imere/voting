import React from 'react';
import { Switch } from 'react-router';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { SiderTheme } from 'antd/es/layout/Sider';
import { connect } from 'react-redux';

import HeaderNavComponent from '@/components/HeaderNav';
import SessionStates from '@/constants/session-states';
import SideMenuLayout from '@/layouts/SideMenuLayout';
import TopMenuLayout from '@/layouts/TopMenuLayout';
import AppRoutes from '@/routes/app-routes';
import { useSessionState } from '@/hooks/useSessionState';
import { ApplicationState } from '@/store/state';
import { classnames } from '@/shared/classnames';
import { renderRoutes } from '@/routes/util';

import styles from './App.module.scss';

interface AppOwnStateProps {
  theme: SiderTheme
}

type AppProps = AppOwnStateProps;

function App({ theme }: AppProps) {
  const [
    collapsed,
    toggleCollapsed
  ] = useSessionState(SessionStates.siderCollapse, true);

  const [useTML] = useSessionState(SessionStates.useTML, true);

  const content = (
    <Switch>
      {renderRoutes(AppRoutes)}
    </Switch>
  );

  const iconProps = {
    className: classnames(
      styles['header-sider-trigger'],
      Reflect.get(styles, `header-sider-trigger-${theme}`),
    ),
    onClick: () => toggleCollapsed((v) => !v)
  };
  const SML = (
    <SideMenuLayout
      collapsed={collapsed}
      header={
        <>
          {
            collapsed
              ? <MenuUnfoldOutlined {...iconProps} />
              : <MenuFoldOutlined {...iconProps} />
          }
          <HeaderNavComponent />
        </>
      }
      content={content}
    />
  );

  const TML = (
    <TopMenuLayout
      header={
        <HeaderNavComponent />
      }
      content={content}
    />
  );

  return useTML ? TML : SML;
}

const mapStateToProps = (state: ApplicationState): AppOwnStateProps => ({
  theme: state.context.theme,
});

export default connect(mapStateToProps)(App);
