import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import type { Mutation } from '@tanstack/react-query';
import type { PersistQueryClientOptions } from '@tanstack/react-query-persist-client';
import { pauseInFlightSends } from './pauseInFlightSends';

const saveOnEveryChange = 0;
const unconfirmedStatuses: readonly Mutation['state']['status'][] = ['pending', 'error'];

export const commentsPersistOptions: Omit<PersistQueryClientOptions, 'queryClient'> = {
  persister: createAsyncStoragePersister({
    storage: window.localStorage,
    key: 'comments-query-cache',
    throttleTime: saveOnEveryChange,
    serialize: (client) => JSON.stringify(pauseInFlightSends(client)),
  }),
  dehydrateOptions: {
    shouldDehydrateMutation: (mutation: Mutation) => unconfirmedStatuses.includes(mutation.state.status),
  },
};
