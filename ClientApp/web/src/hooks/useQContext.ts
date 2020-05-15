import { SetStateAction, useContext, useEffect } from 'react';

import { QuestionnaireContext } from '@/contexts/questionnaire';
import { QEventBus } from '@/components/Questionnaire/QEventBus';

interface Param {
  refreshers?: Array<React.Dispatch<SetStateAction<boolean>>>
  listeners?: Array<Function>
}

export function useQContext({ refreshers = [], listeners = [] }: Param, deps: Array<any> | undefined): QEventBus {
  const ctx = useContext(QuestionnaireContext);

  useEffect(() => {
    for (const refresher of refreshers) {
      ctx.addRefresher(refresher);
    }
    for (const listener of listeners) {
      ctx.subscribe(listener);
    }
    return () => {
      for (const refresher of refreshers) {
        ctx.removeRefresher(refresher);
      }
      for (const listener of listeners) {
        ctx.unsubscribe(listener);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ctx;
}
