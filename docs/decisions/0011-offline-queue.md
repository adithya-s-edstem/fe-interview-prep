# 0011 Offline comment queue on TanStack Query paused mutations

- **Status:** accepted
- **Dictated by PDF:** queue while offline, send in order on reconnect, survive refresh, no duplicates. Mechanism is
  our choice.

## Decision
- Each comment gets a client-generated `clientId` (`crypto.randomUUID()`) at creation; the mock server treats it as an
  idempotency key and returns the existing comment for a repeated key.
- Mutations use `scope: { id: 'comments' }` (serial, creation order) and defaults registered with
  `setMutationDefaults` so they can be rehydrated after a reload.
- `PersistQueryClientProvider` + `createAsyncStoragePersister(localStorage)` persists unfinished mutations and the
  comments cache; the provider's `onSuccess` calls `resumePausedMutations()`. (`createSyncStoragePersister` is
  deprecated in TanStack Query v5.)
- The persister saves on every change (`throttleTime: 0`) so a comment posted just before a refresh is not lost, and
  it stores in-flight sends as paused, so a send interrupted by a refresh is resumed and the idempotency key keeps it
  to one copy.
- A comment is shown from two sources: the server list (`['comments']` query) for sent comments, and
  `useMutationState` for unsent ones, whose state gives the status (`queued` = paused, `sending`, `failed`). Status is
  never stored, so it stays correct after a reload.
- Editing a queued comment (Q5-O1) stores the new text by `clientId` in a small persisted Zustand store; the mutation
  function applies it when the send runs, so the queue keeps its order and the server receives the edited text.

## Why
Ordering, pausing while offline and resuming are built into the query client; persistence is a documented plugin.
Idempotency keys make retries safe however they happen (button, reconnect, reload mid-request).

## Alternatives
- Hand-written queue in a Zustand store + `online` listener: full control, but more race conditions to own.
- Service worker Background Sync: not supported in all browsers, hard to test, overkill.
- De-duplicating by comment text: rejects legitimate identical comments.
