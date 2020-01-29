import "./index.scss";

import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";

import * as serviceWorker from "./serviceWorker";
import App from "./components/App";
import AuthCallback from "./components/AuthCallback";
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

  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact path="/auth-callback" render={() => <AuthCallback />} />
          <Route path="/" render={() => <App />} />
        </Switch>
      </ConnectedRouter>
    </Provider>,
    document.getElementById("root")
  );

  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: https://bit.ly/CRA-PWA
  serviceWorker.unregister();
});
