import { User } from "oidc-client";
import { SiderTheme } from "antd/es/layout/Sider";

import { None } from "@/types";

declare interface AuthState {
  pending?: boolean;
  user?: User | None;
  username?: string;
}

declare interface ContextState {
  theme: SiderTheme
}

declare type ApplicationState = {
  context: ContextState;
  auth: AuthState;
}
