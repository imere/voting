import thunk from 'redux-thunk';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { createBrowserHistory, History } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';

import reducers from '@/store/reducers';
import { initialState } from '@/store/initial-state';
import { ApplicationState } from '@/store/state';

export function configureStore(history: History, state: ApplicationState) {
  const middlewares = [
    thunk,
    routerMiddleware(history),
  ];

  const rootReducer = combineReducers({
    ...reducers,
    'router': connectRouter(history),
  });

  const enhancers = [];
  const windowIfDefined = typeof window === 'undefined' ? null : window as any;
  if (windowIfDefined && windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__) {
    enhancers.push(windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__());
  }

  return createStore(
    rootReducer,
    state,
    compose(applyMiddleware(...middlewares), ...enhancers)
  );
}

function getHistory() {
  const baseUrl = document.
    getElementsByTagName('base')[0]?.
    getAttribute('href') as string;
  return createBrowserHistory({ 'basename': baseUrl });
}

export const history = getHistory();
export const store = configureStore(history, initialState);
