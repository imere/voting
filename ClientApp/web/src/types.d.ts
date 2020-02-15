import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";

import { ApplicationState } from "./reducers";

declare type None = null | undefined

declare interface AnyType {
  [key: string]: any
  [key: number]: any
}

declare interface AppThunkAction<TAction> {
  (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}

interface Dispatch<S> {
  <R, E>(asyncAction: ThunkAction<R, S, E>): R;
}

interface Dispatch<S> {
  <A>(action: A & { type: any }): A & { type: any };
}

declare type Disp<S, E, A extends Action> = Dispatch<A> & ThunkDispatch<S, E, A>;

declare type ThunkAction<R, S, E> = (dispatch: Dispatch<S>, getState: () => S, extraArgument: E) => R;

declare const ValidateStatuses: ["success", "warning", "error", "validating", ""];
declare type ValidateStatus = typeof ValidateStatuses[number]
