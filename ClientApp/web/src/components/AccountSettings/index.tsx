import React from 'react';

import ChangeLayout from '@/components/AccountSettings/ChangeLayout';
import { Unregister } from '@/components/AccountSettings/Unregister';

const AccountSettings: React.FC = () => (
  <>
    <ChangeLayout />
    <Unregister />
  </>
);

export default AccountSettings;
