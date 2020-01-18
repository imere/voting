import "./index.scss";

import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";

import * as serviceWorker from "./serviceWorker";
import App from "./components/App";
import { configureStore } from "./store";
import { initialState } from "./reducers/initialState";

const baseUrl = document.
  getElementsByTagName("base")[0].
  getAttribute("href") as string;
const history = createBrowserHistory({ "basename": baseUrl });

const store = configureStore(history, initialState);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
