import React from 'react';
import { User } from 'oidc-client';
import { connect } from 'react-redux';
import { Redirect, RouteComponentProps, withRouter } from 'react-router';

import AppRoutes from '@/routes/AppRoutes';
import { None } from '@/types';
import { ApplicationState } from '@/reducers/state';

interface ProtectedReceivedProps {
  children?: React.ReactNode
  redirectTo?: string
}

interface ProtectedOwnStateProps {
  user: User | None
}

type ProtectedProps =
  ProtectedReceivedProps &
  ProtectedOwnStateProps &
  RouteComponentProps

const PROTECTED = AppRoutes.filter((route) => route.auth);

const Protected = ({ user, children, redirectTo = '/', location: { pathname } }: ProtectedProps) => {
  if (user) {
    return <>{children}</>;
  }

  if (
    PROTECTED.some((route) => route.path && pathname.startsWith(route.path))
  ) {
    return <Redirect to={redirectTo} />;
  }

  return <>{children}</>;
};

const mapStateToProps = (state: ApplicationState): ProtectedOwnStateProps => ({
  user: state.auth.user
});

export default withRouter(connect(mapStateToProps)(Protected));
