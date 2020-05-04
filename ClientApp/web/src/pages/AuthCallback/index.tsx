import React from 'react';

import { Logger } from '@/framework/shared/logger';

const AuthCallback = () => {
  Logger.info('ac');
  import('@/framework/shared/identity-service').then(({ iservice }) => iservice.completeAuthentication());
  return <>正在验证</>;
};

export { AuthCallback };
