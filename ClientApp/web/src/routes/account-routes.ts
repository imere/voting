import Loadable from '@loadable/component';

import { Routes } from '@/constants';
import { defaultLoadableOption } from '@/shared/loadable-conf';

import { RouteArrayType } from './routes';

const AccountRegisterFormLazy = Loadable(
  () => import('@/components/AccountRegisterForm'),
  defaultLoadableOption
);

const AccountLoginFormLazy = Loadable(
  () => import('@/components/AccountLoginForm'),
  defaultLoadableOption
);

const r: RouteArrayType = [
  {
    exact: true,
    path: Routes.USER_REGISTER,
    component: AccountRegisterFormLazy,
  },
  {
    exact: true,
    path: Routes.USER_LOGIN,
    component: AccountLoginFormLazy,
  },
  {
    redirect: true,
    to: Routes.POLL_LIST,
  },
];

export default r;
