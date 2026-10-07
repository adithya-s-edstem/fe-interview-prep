# 0008 react-intersection-observer for infinite scroll

- **Status:** accepted
- **Dictated by PDF:** no.

## Decision
A sentinel at the end of the feed observed with `useInView` (`rootMargin` about 400px) triggers the next page.

## Why
No scroll listeners or throttling; fires once per crossing. Ships test utilities to mock intersections.

## Alternatives
- `scroll` event + throttle: fires constantly, easy to double-trigger.
- Raw `IntersectionObserver` in a custom hook: same behaviour, more code to own.
- A virtualised infinite-list library: would do the core work of Q2.
