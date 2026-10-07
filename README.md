# fe-interview-prep

Five frontend features built with React and TypeScript (strict mode), each on its own page and shipped as its own
pull request.

## Run the app

Requires Node 22 LTS and npm.

```bash
npm ci
npm run dev
```

Open http://localhost:5173. The menu at the top links to one page per question; `/` opens the Shopping Cart.

## Run the checks

| Task                | Command              |
| ------------------- | -------------------- |
| Tests               | `npm test`           |
| Tests in watch mode | `npm run test:watch` |
| Lint                | `npm run lint`       |
| Type-check          | `npm run typecheck`  |
| All three           | `npm run check`      |
| Production build    | `npm run build`      |
| Format              | `npm run format`     |

## Questions

| #   | Question                      | PR link                                                              |
| --- | ----------------------------- | -------------------------------------------------------------------- |
| 1   | Shopping Cart                 | [#20](https://github.com/adithya-s-edstem/fe-interview-prep/pull/20) |
| 2   | Infinite Feed                 | [#22](https://github.com/adithya-s-edstem/fe-interview-prep/pull/22) |
| 3   | Kanban Board                  | [#21](https://github.com/adithya-s-edstem/fe-interview-prep/pull/21) |
| 4   | Live Dashboard                | [#24](https://github.com/adithya-s-edstem/fe-interview-prep/pull/24) |
| 5   | Comments with Offline Support |                                                                      |

Requirements, architecture and decision records live in [docs/](docs/README.md).
