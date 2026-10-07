# 0011 Offline comment queue on TanStack Query paused mutations

- **Status:** accepted
- **Dictated by PDF:** queue while offline, send in order on reconnect, survive refresh, no duplicates. Mechanism is
  our choice.

## Decision
- Each comment gets a client-generated `clientId` (`crypto.randomUUID()`) at creation; the mock server treats it as an
  idempotency key and returns the existing comment for a repeated key.
- Mutations use `scope: { id: 'comments' }` (serial, creation order) and defaults registered with
  `setMutationDefaults` so they can be rehydrated after a reload.
- `PersistQueryClientProvider` + `createSyncStoragePersister(localStorage)` persists paused mutations and the comments
  cache; the provider's `onSuccess` calls `resumePausedMutations()`.

## Why
Ordering, pausing while offline and resuming are built into the query client; persistence is a documented plugin.
Idempotency keys make retries safe however they happen (button, reconnect, reload mid-request).

## Alternatives
- Hand-written queue in a Zustand store + `online` listener: full control, but more race conditions to own.
- Service worker Background Sync: not supported in all browsers, hard to test, overkill.
- De-duplicating by comment text: rejects legitimate identical comments.
