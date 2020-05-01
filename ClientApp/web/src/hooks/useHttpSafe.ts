import { useEffect } from 'react';

import { Http } from '@/framework/shared';

function useHttpSafe(input: RequestInfo, init?: RequestInit | undefined): Promise<Response> {
  useEffect(() => {
    if (!init) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
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
