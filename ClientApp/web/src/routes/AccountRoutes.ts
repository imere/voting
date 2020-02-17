import Loadable from "@loadable/component";

import { Routes } from "@/constants";
import { defaultLoadableOption } from "@/shared/conf";

import { RouteArrayType } from "./routes";

const AccountRegisterFormLazy = Loadable(
  () => import("@/components/AccountRegisterForm"),
  defaultLoadableOption
);

const AccountLoginFormLazy = Loadable(
  () => import("@/components/AccountLoginForm"),
  defaultLoadableOption
);

export default [
  {
    path: Routes.USER_REGISTER,
    component: AccountRegisterFormLazy,
  },
  {
    path: Routes.USER_LOGIN,
    component: AccountLoginFormLazy,
  },
  {
    redirect: true,
    to: Routes.POLL_LIST,
  },
] as RouteArrayType;
