import React from 'react';
import { Options } from '@loadable/component';

import Fallback from '@/components/Fallback';

export const defaultLoadableOption: Options<any> = {
  fallback: <Fallback />
};
