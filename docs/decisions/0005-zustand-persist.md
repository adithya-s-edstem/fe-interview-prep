# 0005 Zustand + persist for client state

- **Status:** accepted
- **Dictated by PDF:** no (persistence across refresh is).

## Decision
Zustand stores with the `persist` middleware (localStorage) for the cart (Q1), board (Q3) and widget visibility (Q4).
Keys `fe-interview-prep:<feature>`, with a `version` for migrations.

## Why
Persistence is one line per store; selectors keep re-renders narrow; stores are plain functions, easy to test outside
React.

## Alternatives
- `useReducer` + Context + a `useEffect` writing localStorage: re-renders every consumer on any change; more code.
- Redux Toolkit + redux-persist: heavier for three small stores.
- Jotai: fine, but atom-per-field is less natural for a board or cart.
