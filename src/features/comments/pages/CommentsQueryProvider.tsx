import type { QueryClient } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import type { ReactNode } from 'react';
import { commentsPersistOptions } from '../services/commentsPersistOptions';

type CommentsQueryProviderProps = {
  client: QueryClient;
  children: ReactNode;
};

export function CommentsQueryProvider({ client, children }: CommentsQueryProviderProps) {
  return (
    <PersistQueryClientProvider
      client={client}
      persistOptions={commentsPersistOptions}
      onSuccess={() => client.resumePausedMutations()}
    >
      {children}
    </PersistQueryClientProvider>
  );
}
