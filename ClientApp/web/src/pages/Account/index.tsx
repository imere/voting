import React from 'react';
import { Switch } from 'react-router';

import AccountFormLayout from '@/layouts/AccountFormLayout';
import AccountRoutes from '@/routes/account-routes';
import { renderRoutes } from '@/routes/util';

const Account = () => (
  <AccountFormLayout>
    <Switch>
      {renderRoutes(AccountRoutes)}
    </Switch>
  </AccountFormLayout>
);

export default Account;
