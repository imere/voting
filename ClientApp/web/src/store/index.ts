import thunk from 'redux-thunk';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { History } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';

import reducers from '@/store/reducers';
import { ApplicationState } from '@/store/state';

export function configureStore(history: History, initialState: ApplicationState) {
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
    initialState,
    compose(applyMiddleware(...middlewares), ...enhancers)
  );
}
