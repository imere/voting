import React from "react";

import { Routes } from "@/constants";

import { RouteArrayType } from "./routes";

const AccountRegisterFormLazy = React.lazy(() => import("@/components/AccountRegisterForm"));

const AccountLoginFormLazy = React.lazy(() => import("@/components/AccountLoginForm"));

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
