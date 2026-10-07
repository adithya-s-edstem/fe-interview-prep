# Stack

## Mandated

- React and TypeScript with `"strict": true`.
  ([requirements/foundation.md#stack-constraints](../requirements/foundation.md#stack-constraints))
- A linter and a test runner on `main` before Q1.
- No UI library that does the core work of a question.

Everything else below is a choice; each links to its decision record.

## Runtime and tooling

| Concern | Choice | Decision |
|---|---|---|
| Language | TypeScript 5.x, `strict`, `noUncheckedIndexedAccess` | [0001](../decisions/0001-vite-react-ts.md) |
| UI | React 19 | [0001](../decisions/0001-vite-react-ts.md) |
| Build / dev server | Vite (`react-ts` template) | [0001](../decisions/0001-vite-react-ts.md) |
| Package manager | npm (lockfile committed), Node 22 LTS | [0001](../decisions/0001-vite-react-ts.md) |
| Lint / format | ESLint flat config + `typescript-eslint` + `eslint-plugin-react-hooks` + `eslint-plugin-jsx-a11y`; Prettier | [0002](../decisions/0002-lint-format.md) |

## Libraries

| Concern | Library | Used by | Decision |
|---|---|---|---|
| Routing | React Router (data router: `createBrowserRouter`, `<ScrollRestoration>`) | all, Q2 | [0003](../decisions/0003-react-router.md) |
| Server state / fetching | TanStack Query v5 | Q1, Q2, Q4, Q5 | [0004](../decisions/0004-tanstack-query.md) |
| Client state + persistence | Zustand with `persist` middleware (localStorage) | Q1, Q3, Q4 | [0005](../decisions/0005-zustand-persist.md) |
| Mock APIs | MSW (service worker in browser, node server in tests) | Q4, Q5, tests | [0006](../decisions/0006-msw-mocks.md) |
| Schemas / validation | Zod (API responses, form input) | all | [0007](../decisions/0007-zod-react-hook-form.md) |
| Forms | React Hook Form + `@hookform/resolvers/zod` | Q3, Q5 | [0007](../decisions/0007-zod-react-hook-form.md) |
| Scroll trigger | `react-intersection-observer` | Q2 | [0008](../decisions/0008-intersection-observer.md) |
| Drag and drop | `@dnd-kit/core` + `@dnd-kit/sortable` (pointer + keyboard sensors) | Q3 | [0009](../decisions/0009-dnd-kit.md) |
| Charts | Recharts | Q4 | [0010](../decisions/0010-recharts.md) |
| Offline mutation queue | TanStack Query paused mutations + `@tanstack/react-query-persist-client` | Q5 | [0011](../decisions/0011-offline-queue.md) |
| Money | Integer cents + `Intl.NumberFormat` | Q1 | [0012](../decisions/0012-money-in-cents.md) |
| Styling | CSS Modules (no component library) | all | [0013](../decisions/0013-css-modules.md) |
| Testing | Vitest, React Testing Library, `@testing-library/user-event`, `jsdom` | all | [0014](../decisions/0014-vitest-rtl.md) |

None of these provides a finished cart, feed, board, dashboard or comment thread; they are primitives (fetching,
storage, drag sensors, chart drawing). How each question uses them is in [data-flow.md](data-flow.md).
