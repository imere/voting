import { createContext } from 'react';

import { UserAuthentication } from '@/actions/action-auth';

export interface AuthContextType {
  register: (user: UserAuthentication) => void
  login: (user: UserAuthentication) => void
  logout: () => void
}

const { Provider, Consumer } = createContext<AuthContextType>({
  register: () => {
    throw 'register not implemented';
  },
  login: () => {
    throw 'login not implemented';
  },
  logout: () => {
    throw 'logout not implemented';
  },
});

export { Provider, Consumer };
