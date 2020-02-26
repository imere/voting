import Loadable from "@loadable/component";

import { Routes } from "@/constants";
import { defaultLoadableOption } from "@/shared/conf";

import { RouteArrayType } from "./routes";

const PollListLazy = Loadable(
  () => import("@/components/PollList"),
  defaultLoadableOption
);

const QuestionnaireNewLazy = Loadable(
  () => import("@/components/Questionnaire/New"),
  defaultLoadableOption
);

const QuestionnaireAnswerLazy = Loadable(
  () => import("@/components/Questionnaire/Answer"),
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

const r: RouteArrayType = [
  {
    exact: true,
    path: Routes.POLL_LIST,
    component: PollListLazy,
  },
  {
    exact: true,
    auth: true,
    path: Routes.POLL_NEW,
    component: QuestionnaireNewLazy,
  },
  {
    exact: true,
    auth: true,
    path: Routes.POLL_ANSWER,
    component: QuestionnaireAnswerLazy,
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
];

export default r;
