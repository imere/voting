import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { ApplicationState } from '@/store/state';

export type None = null | undefined

export interface AppThunkAction<TAction> {
  (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}

interface Dispatch<S> {
  <R, E>(asyncAction: ThunkAction<R, S, E>): R;
}

interface Dispatch<S> {
  <A>(action: A & { type: any }): A & { type: any };
}

export type Disp<S, E, A extends Action> = Dispatch<A> & ThunkDispatch<S, E, A>;

type ThunkAction<R, S, E> = (dispatch: Dispatch<S>, getState: () => S, extraArgument: E) => R;

declare const HttpMethods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];
export type HttpMethod = typeof HttpMethods[number]

declare const ValidateStatuses: ['success', 'warning', 'error', 'validating', ''];
export type ValidateStatus = typeof ValidateStatuses[number]
