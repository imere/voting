import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { ApplicationState } from './reducers';

export interface AppThunkAction<TAction> {
  (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}

export interface Dispatch<S> {
  <R, E>(asyncAction: ThunkAction<R, S, E>): R;
}

export interface Dispatch<S> {
  <A>(action: A & { type: any }): A & { type: any };
}

export type Disp<S, E, A extends Action> = Dispatch<A> & ThunkDispatch<S, E, A>;

export type ThunkAction<R, S, E> = (dispatch: Dispatch<S>, getState: () => S, extraArgument: E) => R;

export type None = null | undefined

export type Empty = '' | None

export type Maybe<T> = T | None | void

export type ValueOf<T> = T[keyof T]
