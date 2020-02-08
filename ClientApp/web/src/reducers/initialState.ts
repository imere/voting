import { ApplicationState } from ".";

export const initialState: ApplicationState = {
  context: {
    theme: "dark",
  },
  "auth": {
    user: null,
    pending: false,
  },
};
