import { User } from "oidc-client";
import { SiderTheme } from "antd/es/layout/Sider";

import { None } from "@/types";

declare interface AuthState {
  pending?: boolean;
  user?: User | None;
}

declare interface ContextState {
  theme: SiderTheme
}

declare type ApplicationState = {
  context: ContextState;
  auth: AuthState;
}
