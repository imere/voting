import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router";
import { Spin } from "antd";

import AccountLayout from "@/layouts/AccountLayout";
import { Routes } from "@/constants";

const AccountRegisterFormLazy = React.lazy(() => import("@/components/AccountRegisterForm"));
const AccountLoginFormLazy = React.lazy(() => import("@/components/AccountLoginForm"));

const Account = () => (
  <AccountLayout
    content={
      <Suspense fallback={<Spin size="large" />}>
        <Switch>
          <Route path={Routes.USER_REGISTER} component={AccountRegisterFormLazy}></Route>
          <Route path={Routes.USER_LOGIN} component={AccountLoginFormLazy}></Route>
          <Redirect to={Routes.POLL_LIST} />
        </Switch>
      </Suspense>
    }
  />
);

export default Account;
