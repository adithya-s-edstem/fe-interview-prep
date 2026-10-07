# Docs

Source of truth for what is built and how. Tickets link here instead of repeating content.

- `requirements/` — what the product must do, one file per feature area
- `architecture/` — how it is built: layers, boundaries, data flow, chosen plugins and libraries
- `decisions/` — short records of choices made and why

Use stable headings: tickets link to `docs/<file>.md#<heading>`.

## Source

- [Frontend_Interview_Prep_Assignment_Set2 2.pdf](Frontend_Interview_Prep_Assignment_Set2%202.pdf) — the assignment.
  If the docs and the PDF disagree, the PDF wins; fix the docs.

## Index

### Requirements — [requirements/README.md](requirements/README.md) (milestones and order)

- [foundation.md](requirements/foundation.md) — repo, app shell, tooling, branches/PRs, commits, PR template, AI policy
- [shopping-cart.md](requirements/shopping-cart.md) — Q1 Shopping Cart
- [infinite-feed.md](requirements/infinite-feed.md) — Q2 Infinite Feed
- [kanban-board.md](requirements/kanban-board.md) — Q3 Kanban Board
- [live-dashboard.md](requirements/live-dashboard.md) — Q4 Live Dashboard
- [comments-offline.md](requirements/comments-offline.md) — Q5 Comments with Offline Support
- [submission.md](requirements/submission.md) — time limits, README, video, submission checklist

### Architecture — [architecture/README.md](architecture/README.md)

- [stack.md](architecture/stack.md) — mandated stack, tooling, libraries
- [layering.md](architecture/layering.md) — layers and dependency rules
- [folder-structure.md](architecture/folder-structure.md) — directory layout and conventions
- [data-flow.md](architecture/data-flow.md) — data flow overall and per question
- [testing.md](architecture/testing.md) — test tooling and strategy
- [commands.md](architecture/commands.md) — install, run, build, lint, type-check, test

### Decisions — [decisions/README.md](decisions/README.md)

- 0001–0014: one record per choice not dictated by the PDF.
