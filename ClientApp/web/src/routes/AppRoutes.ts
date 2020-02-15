import React from "react";

import { Routes } from "@/constants";

import { RouteArrayType } from "./routes";

const PollListLazy = React.lazy(() => import("@/components/PollList"));

const QuestionnaireLazy = React.lazy(() => import("@/components/Questionnaire"));

const AccountCenterLazy = React.lazy(() => import("@/components/AccountCenter"));

const AccountSettingsLazy = React.lazy(() => import("@/components/AccountSettings"));

export default [
  {
    path: Routes.POLL_LIST,
    component: PollListLazy,
  },
  {
    path: Routes.POLL,
    component: QuestionnaireLazy,
  },
  {
    auth: true,
    path: Routes.POLL_NEW,
    component: QuestionnaireLazy,
  },
  {
    auth: true,
    path: Routes.ACCOUNT_CENTER,
    component: AccountCenterLazy,
  },
  {
    auth: true,
    path: Routes.ACCOUNT_SETTINGS,
    component: AccountSettingsLazy,
  },
  {
    redirect: true,
    to: Routes.POLL_LIST,
  },
] as RouteArrayType;
