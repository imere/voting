import Loadable from "@loadable/component";
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";

import * as serviceWorker from "./serviceWorker";
import ErrorBoundary from "./components/ErrorBoundary";
import Protected from "./layouts/Protected";
import { configureStore } from "./store";
import { initialState } from "./reducers/initial-state";
import { iu } from "./actions";
import { Routes } from "./constants";
import { defaultLoadableOption } from "./shared/conf";

const AccountLazy = Loadable(
  () => import("./pages/Account"),
  defaultLoadableOption
);

const AuthCallbackLazy = Loadable(
  () => import("./pages/AuthCallback"),
  defaultLoadableOption
);

const AppLazy = Loadable(
  () => import("./pages/App"),
  defaultLoadableOption
);

import("./index.scss");

iu.getUser().then((user) => {
  const baseUrl = document.
    getElementsByTagName("base")[0].
    getAttribute("href") as string;
  const history = createBrowserHistory({ "basename": baseUrl });

  initialState.auth.user = user;
  const store = configureStore(history, initialState);

  ReactDOM.render(
    <ErrorBoundary>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <BrowserRouter>
            <Protected redirectTo={Routes.USER_LOGIN}>
              <Switch>
                <Route exact path={Routes.AUTH_CALLBACK} component={AuthCallbackLazy} />
                <Route path={Routes.USER} component={AccountLazy} />
                <Route path="/" component={AppLazy} />
              </Switch>
            </Protected>
          </BrowserRouter>
        </ConnectedRouter>
      </Provider>
    </ErrorBoundary>,
    document.getElementById("__root")
  );

  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: https://bit.ly/CRA-PWA
  serviceWorker.unregister();
});
