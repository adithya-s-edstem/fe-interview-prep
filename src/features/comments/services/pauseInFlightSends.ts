import type { PersistedClient } from '@tanstack/react-query-persist-client';

export function pauseInFlightSends(client: PersistedClient): PersistedClient {
  const mutations = client.clientState.mutations.map((mutation) =>
    mutation.state.status === 'pending' ? { ...mutation, state: { ...mutation.state, isPaused: true } } : mutation,
  );
  return { ...client, clientState: { ...client.clientState, mutations } };
}
