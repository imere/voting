import "./index.scss";

import ReactDOM from "react-dom";
import React, { Suspense } from "react";
import { createBrowserHistory } from "history";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { Spin } from "antd";

import * as serviceWorker from "./serviceWorker";
import ErrorBoundary from "./components/ErrorBoundary";
import { configureStore } from "./store";
import { initialState } from "./reducers/initialState";
import { iu } from "./actions";

iu.getUser().then((user) => {
  const baseUrl = document.
    getElementsByTagName("base")[0].
    getAttribute("href") as string;
  const history = createBrowserHistory({ "basename": baseUrl });

  initialState.auth.user = user;
  const store = configureStore(history, initialState);

  const fallback =
    <div style={{ width: "100%", paddingTop: "100px", textAlign: "center" }}>
      <Spin />
    </div>;

  ReactDOM.render(
    <ErrorBoundary>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Suspense fallback={fallback}>
            <BrowserRouter>
              <Switch>
                <Route exact path="/auth-callback" component={React.lazy(() => import("./components/AuthCallback"))} />
                <Route path="/" component={React.lazy(() => import("./components/App"))} />
              </Switch>
            </BrowserRouter>
          </Suspense>
        </ConnectedRouter>
      </Provider>
    </ErrorBoundary>,
    document.getElementById("root")
  );

  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: https://bit.ly/CRA-PWA
  serviceWorker.unregister();
});
