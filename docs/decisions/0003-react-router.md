# 0003 React Router (data router)

- **Status:** accepted
- **Dictated by PDF:** each question on its own page or route; the router is our choice.

## Decision
React Router with `createBrowserRouter` and `<ScrollRestoration>` in the layout.

## Why
Q2 requires returning to the same scroll position after Back; `<ScrollRestoration>` does this out of the box but only
with the data router. Widely known, small API.

## Alternatives
- TanStack Router: strong typing and built-in scroll restoration, but less familiar and more setup.
- Hand-rolled scroll restore with `sessionStorage`: more code to explain, more edge cases.
