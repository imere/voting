import { auth, AuthState } from "./auth";

export type ApplicationState = {
  auth: AuthState;
}

export default {
  auth
};
