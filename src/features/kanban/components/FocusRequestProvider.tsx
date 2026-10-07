import { useMemo, useState, type ReactNode } from 'react';
import { focusRequestContext, type FocusRequest } from '../hooks/focusRequestContext';

export function FocusRequestProvider({ children }: { children: ReactNode }) {
  const [latestRequest, setLatestRequest] = useState<FocusRequest>();
  const focusRequests = useMemo(
    () => ({ latestRequest, requestFocus: (targetKey: string) => setLatestRequest({ targetKey }) }),
    [latestRequest],
  );

  return <focusRequestContext.Provider value={focusRequests}>{children}</focusRequestContext.Provider>;
}
