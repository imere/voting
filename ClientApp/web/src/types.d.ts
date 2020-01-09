import { ApplicationState } from './reducers'

// declare module "redux-fixed" {
//   export type ThunkAction<R, S, E> = (dispatch: Dispatch<S>, getState: () => S, extraArgument: E) => R;

//   export interface Dispatch<S> {
//     <R, E>(asyncAction: ThunkAction<R, S, E>): R;
//   }
//   export interface Dispatch<S> {
//     <A>(action: A & { type: any }): A & { type: any };
//   }

//   //compiler compiles correctly, but IDEA shows error if original Dispatch from redux bundle is used:
//   /* Original:
//    export interface Dispatch<S> {
//        <A extends Action>(action: A): A;
//    }
//    */
// }

export interface AppThunkAction<TAction> {
  (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}

export interface Dispatch<S> {
  <R, E>(asyncAction: ThunkAction<R, S, E>): R;
}

export interface Dispatch<S> {
  <A>(action: A & { type: any }): A & { type: any };
}

export type ThunkAction<R, S, E> = (dispatch: Dispatch<S>, getState: () => S, extraArgument: E) => R;

export type None = null | undefined

export type Blank = ''

export type Empty = Blank | None

export type Maybe<T> = T | None

export type ValueOf<T> = T[keyof T]
