# Requirements

Source: [Frontend Interview Prep Assignment — Set 2](../Frontend_Interview_Prep_Assignment_Set2%202.pdf).
One file per feature area. Acceptance criteria carry stable IDs (e.g. `Q1-AC3`) so tickets and tests can cite them.

| File | Feature area |
|---|---|
| [foundation.md](foundation.md) | Repo, app shell, tooling, Git/PR workflow, rules that apply to every question |
| [shopping-cart.md](shopping-cart.md) | Q1 — Shopping Cart |
| [infinite-feed.md](infinite-feed.md) | Q2 — Infinite Feed |
| [kanban-board.md](kanban-board.md) | Q3 — Kanban Board |
| [live-dashboard.md](live-dashboard.md) | Q4 — Live Dashboard |
| [comments-offline.md](comments-offline.md) | Q5 — Comments with Offline Support |
| [submission.md](submission.md) | README, video, time limits, final checklist |

## Proposed milestones

The assignment mandates merging Q1 to Q5 in order, each from the latest `main`, so the milestones are strictly
sequential.

| # | Milestone | Covers | Depends on |
|---|---|---|---|
| M0 | Foundation | [foundation.md](foundation.md) | — |
| M1 | Q1 Shopping Cart | [shopping-cart.md](shopping-cart.md) | M0 |
| M2 | Q2 Infinite Feed | [infinite-feed.md](infinite-feed.md) | M1 |
| M3 | Q3 Kanban Board | [kanban-board.md](kanban-board.md) | M2 |
| M4 | Q4 Live Dashboard | [live-dashboard.md](live-dashboard.md) | M3 |
| M5 | Q5 Comments Offline | [comments-offline.md](comments-offline.md) | M4 |
| M6 | Submission | [submission.md](submission.md) | M5 |

## Tickets per milestone

- M0 has exactly one ticket: the setup ticket (app, lint, type-check, test, router, README with the PR table). It lands
  on `main` through a setup PR, not a question PR.
- Each of M1–M5 has exactly **one** ticket, which lands as **one** branch and **one** PR named as in
  [foundation.md#branches-and-prs](foundation.md#branches-and-prs).
- M6 has no ticket and no PR: it is the manual
  [submission checklist](submission.md#submission-checklist), done after the Q5 PR merges (README links, video).

"If you finish early" items are listed under **Optional** in each file. They are out of core scope and get no
milestone until all of M1–M5 are merged.
