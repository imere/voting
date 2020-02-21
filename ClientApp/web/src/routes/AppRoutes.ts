import Loadable from "@loadable/component";

import { Routes } from "@/constants";
import { defaultLoadableOption } from "@/shared/conf";

import { RouteArrayType } from "./routes";

const PollListLazy = Loadable(
  () => import("@/components/PollList"),
  defaultLoadableOption
);

const QuestionnaireLazy = Loadable(
  () => import("@/components/Questionnaire"),
  defaultLoadableOption
);

const AccountCenterLazy = Loadable(
  () => import("@/components/AccountCenter"),
  defaultLoadableOption
);

const AccountSettingsLazy = Loadable(
  () => import("@/components/AccountSettings"),
  defaultLoadableOption
);

export default [
  {
    exact: true,
    path: Routes.POLL_LIST,
    component: PollListLazy,
  },
  {
    exact: true,
    path: Routes.POLL,
    component: QuestionnaireLazy,
  },
  {
    exact: true,
    auth: true,
    path: Routes.POLL_NEW,
    component: QuestionnaireLazy,
  },
  {
    exact: true,
    auth: true,
    path: Routes.ACCOUNT_CENTER,
    component: AccountCenterLazy,
  },
  {
    exact: true,
    auth: true,
    path: Routes.ACCOUNT_SETTINGS,
    component: AccountSettingsLazy,
  },
  {
    redirect: true,
    to: Routes.POLL_LIST,
  },
] as RouteArrayType;
