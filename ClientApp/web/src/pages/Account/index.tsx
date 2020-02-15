import React, { Suspense } from "react";
import { Switch } from "react-router";
import { Spin } from "antd";

import AccountLayout from "@/layouts/AccountFormLayout";
import AccountRoutes from "@/routes/AccountRoutes";
import { renderRoutes } from "@/routes/utils";

const Account = () => (
  <AccountLayout
    content={
      <Suspense fallback={<Spin size="large" />}>
        <Switch>
          {renderRoutes(AccountRoutes)}
        </Switch>
      </Suspense>
    }
  />
);

export default Account;
