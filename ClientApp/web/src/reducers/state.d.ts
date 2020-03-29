import { User } from "oidc-client";
import { SiderTheme } from "antd/es/layout/Sider";

import { None } from "@/types";

export interface AuthState {
  pending?: boolean;
  user?: User | None;
}

export interface ContextState {
  theme: SiderTheme
}

export type ApplicationState = {
  context: ContextState;
  auth: AuthState;
}
