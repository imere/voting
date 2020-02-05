import { auth, AuthState } from "./auth";
import { context, ContextState } from "./context";

export type ApplicationState = {
  context: ContextState;
  auth: AuthState;
}

export default {
  context,
  auth,
};
