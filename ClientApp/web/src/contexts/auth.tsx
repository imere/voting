import { createContext } from "react";

import { UserAuthentication } from "@/actions/auth";

export interface AuthContextType {
  login: (user: UserAuthentication) => void,
  logout: () => void,
}

const { Provider, Consumer } = createContext<AuthContextType>({} as any);

export { Provider, Consumer };
