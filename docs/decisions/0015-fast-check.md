# 0015 fast-check for invariant tests

- **Status:** accepted
- **Dictated by PDF:** no (correct totals and the stock limit are).

## Decision
Use `fast-check` property-based tests for domain invariants, starting with Q1: the quantity never leaves 1..stock, and
the total always equals subtotal + tax in whole cents.

## Why
A handful of hand-picked examples can miss the one price or quantity that breaks a rule; a property runs the rule over
hundreds of generated inputs and shrinks any failure to the smallest case. It is a dev dependency only.

## Alternatives
- Example tests only: simpler, but prove the rule for the chosen numbers, not in general.
- `@fast-check/vitest`: nicer `test.prop` syntax, but one more package for the same engine.
