import { useEffect } from 'react';

import { Http } from '@/framework/shared';

function useHttpSafe(input: RequestInfo, init?: RequestInit | undefined): Promise<Response> {
  useEffect(() => {
    if (!init) {
      init = {};
    }

    let ctl: AbortController | undefined;
    if (!init.signal) {
      ctl = new AbortController();
      init.signal = ctl.signal;
    }

    return () => {
      ctl?.abort();
    };
  }, []);
  return Http(input, init);
}

export { useHttpSafe };
