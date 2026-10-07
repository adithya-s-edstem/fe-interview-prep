import { createContext } from 'react';

export type FocusRequest = { targetKey: string };

export type FocusRequests = {
  latestRequest: FocusRequest | undefined;
  requestFocus: (targetKey: string) => void;
};

export const focusRequestContext = createContext<FocusRequests>({
  latestRequest: undefined,
  requestFocus: () => undefined,
});
