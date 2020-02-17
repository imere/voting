import React from "react";
import { Switch } from "react-router";

import AccountFormLayout from "@/layouts/AccountFormLayout";
import AccountRoutes from "@/routes/AccountRoutes";
import { renderRoutes } from "@/routes/utils";

const Account = () => (
  <AccountFormLayout>
    <Switch>
      {renderRoutes(AccountRoutes)}
    </Switch>
  </AccountFormLayout>
);

export default Account;
