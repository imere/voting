import { useEffect } from 'react';

import { Http } from '@/shared';

function useHttpSafe(input: RequestInfo, init?: RequestInit | undefined): Promise<Response> {
  useEffect(() => {
    if (!init) {
      init = {};
    }
    if (init.signal) {
      return;
    }
    const ctl = new AbortController();
    init.signal = ctl.signal;
    return () => {
      ctl.abort();
    };
  }, []);
  return Http(input, init);
}

export { useHttpSafe };
