import { createContext } from "react";

import { UserAuthentication } from "@/actions/action-auth";

export interface AuthContextType {
  register: (user: UserAuthentication) => void
  login: (user: UserAuthentication) => void
  logout: () => void
}

const { Provider, Consumer } = createContext<AuthContextType>({} as any);

export { Provider, Consumer };
