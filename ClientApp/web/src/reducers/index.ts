import { auth, AuthState } from "./auth";
import { context, ContextState } from "./context";
import { loadingBar } from "./loading-bar";

export type ApplicationState = {
  context: ContextState;
  auth: AuthState;
}

export default {
  context,
  auth,
  loadingBar,
};
