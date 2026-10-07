# Foundation

Rules and setup shared by every question. Source: assignment "Overview", "Submission workflow", "PR description
template" and "AI usage policy".

## Scope

Build 5 React + TypeScript features in one GitHub repository, each shipped as its own pull request.

## Stack constraints

- React and TypeScript in **strict mode**.
- Build tool, routing, forms, state, styling and testing libraries are the author's choice (see
  [architecture](../architecture/README.md) and [decisions](../decisions/README.md)).
- **No UI library that does the core work of a question.** (For example: no ready-made cart, infinite-feed, kanban
  board, dashboard or offline-comments component.)

## Repository

- Public GitHub repo named `fe-interview-prep`.
- `main` holds a React + TypeScript app with a **linter** and a **test runner** set up before Q1 starts.
- Each question lives on its own page or route.
- A `README.md` at the root (contents in [submission.md#readme](submission.md#readme)).

## Branches and PRs

Each question is one branch, one PR and one merge, in order Q1 → Q5.

| Question | Branch |
|---|---|
| Q1 | `feature/q1-cart` |
| Q2 | `feature/q2-feed` |
| Q3 | `feature/q3-kanban` |
| Q4 | `feature/q4-dashboard` |
| Q5 | `feature/q5-comments` |

- Create each branch from the latest `main`.
- Merge the PR, then pull `main` before starting the next branch.
- Review your own diff before merging.

## Commits

- Commit in small, meaningful steps, e.g. `Add cart quantity controls`, `Stop duplicate page loads`.
- No commits like `fix`, `changes` or `final`.

## PR description template

Every question PR into `main` uses exactly these sections and includes screenshots or a GIF of the UI:

```markdown
## Problem
What this PR solves (1–2 lines).
## Approach
How the components and state are organised.
## Decisions & trade-offs
What you chose, and why over the alternatives.
## Screenshots
UI before/after or a GIF.
## How to test
Page to open, steps, test files.
```

## Quality gates

- Tests, lint and type-check all pass on `main` after every merge.
- Every question has at least one automated test.

## What is assessed

Working UI; clean and typed components; tests; Git/PR discipline; and above all whether the author understands what
they built.

## AI usage policy

- AI tools are allowed; not understanding your own code is not. A question the author cannot explain counts as not done.
- The interviewer may ask, per PR:
  - Why does this component re-render? Could you prevent it?
  - Why is this value stored rather than calculated?
  - What happens if the network is slow, or the user leaves the page mid-request?
  - Why did you choose this library or approach? What alternatives did you consider?
  - Change this behaviour live.
- Consequence for this repo: every PR's "Decisions & trade-offs" section names the alternatives considered, and each
  non-dictated choice has a record in [decisions](../decisions/README.md).

## Acceptance criteria

- **F-AC1** `npm run lint`, `npm run typecheck` and `npm test` exist and pass on a fresh clone of `main`.
- **F-AC2** `tsconfig` has `"strict": true`.
- **F-AC3** The app shell has one route per question (5 routes) reachable from a navigation element.
- **F-AC4** No dependency provides a ready-made implementation of a question's core feature.
