# Q5 — Comments with Offline Support

Build a comment thread that feels instant and keeps working without a network connection. Branch
`feature/q5-comments`. Suggested time: 40 minutes.

## Requirements

- **Q5-R1 Mock API** — Mock a comments API (any approach) that is slow (1–2 seconds) and fails about 20% of the time.
- **Q5-R2 Optimistic post** — A new comment appears immediately when posted, marked as "sending" until the server
  confirms it.
- **Q5-R3 Failure + retry** — If sending fails, the comment stays visible, marked as failed, with a retry button.
- **Q5-R4 Offline queue** — While offline, new comments are queued and sent automatically, in order, when the connection
  returns.
- **Q5-R5 Durable queue** — Queued comments survive a page refresh.
- **Q5-R6 Idempotent retries** — Retries must never create duplicate comments on the server.

## Acceptance criteria

- **Q5-AC1** Each mock request takes 1–2 seconds; across many calls roughly 20% fail.
- **Q5-AC2** A posted comment is visible immediately with a "sending" marker, which clears on server confirmation.
- **Q5-AC3** A failed comment stays visible with a "failed" marker and a retry button; retry re-sends it.
- **Q5-AC4** Going offline, posting 3 comments and coming back online sends all 3 in order, with no duplicates.
- **Q5-AC5** Comments queued while offline are still queued (and still shown) after a page refresh, and are sent when
  online.
- **Q5-AC6** Sending the same comment more than once (retry, reconnect, or refresh mid-request) results in exactly one
  comment on the server.
- **Q5-AC7** At least one automated test.

## Optional

Not required; only after all 5 core questions are done.

- **Q5-O1** Let users edit a comment while it's still queued.
