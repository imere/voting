import Loadable from '@loadable/component';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { FetchProviderProps, Provider as FetchProvider } from 'use-http';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import * as serviceWorker from '@/serviceWorker';
import ErrorBoundary from '@/components/ErrorBoundary';
import Protected from '@/components/Protected';
import { iu, requestLoginSuc } from '@/store/actions/auth';
import { Routes } from '@/constants';
import { defaultLoadableOption } from '@/shared/loadable-conf';
import {
  addAuthorization,
  addCredentials,
  shouldAddAuthorization,
  shouldAddCredentials,
} from '@/framework/shared/request';
import { polyfill } from '@/framework/shared/polyfill';
import { AuthCallback } from '@/pages/AuthCallback';
import { history, store } from '@/store';

const AccountLazy = Loadable(
  () => import('@/pages/Account'),
  defaultLoadableOption
);

const AppLazy = Loadable(
  () => import('@/pages/App'),
  defaultLoadableOption
);

import('./index.scss');

polyfill();

iu.getUser().then((user) => {
  store.dispatch(requestLoginSuc(user));

  const fetchProviderOptions: FetchProviderProps['options'] = {
    interceptors: {
      request: async (options, url) => {
        if (shouldAddCredentials(url)) {
          addCredentials(options);
        }
        if (shouldAddAuthorization(url)) {
          await addAuthorization(options);
        }
        return options;
      },
    },
  };

  const node = document.getElementById('__root');

  if (node) {
    ReactDOM.render(
      <ErrorBoundary>
        <ReduxProvider store={store}>
          <FetchProvider options={fetchProviderOptions}>
            <ConnectedRouter history={history}>
              <BrowserRouter>
                <Protected redirectTo={Routes.USER_LOGIN}>
                  <Switch>
                    <Route path={Routes.AUTH_CALLBACK} component={AuthCallback} />
                    <Route path={Routes.USER} component={AccountLazy} />
                    <Route path="/" component={AppLazy} />
                  </Switch>
                </Protected>
              </BrowserRouter>
            </ConnectedRouter>
          </FetchProvider>
        </ReduxProvider>
      </ErrorBoundary>,
      node
    );
  }

  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: https://bit.ly/CRA-PWA
  serviceWorker.unregister();
});
