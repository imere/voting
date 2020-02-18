import { ApplicationState } from "./states";

export const initialState: ApplicationState = {
  context: {
    theme: "dark",
  },
  auth: {
    user: null,
    pending: false,
  },
};
