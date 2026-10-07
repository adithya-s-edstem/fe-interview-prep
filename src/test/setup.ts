import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { resetIntersectionMocking, setupIntersectionMocking } from 'react-intersection-observer/test-utils';
import { afterAll, afterEach, beforeAll, beforeEach, vi } from 'vitest';
import { server } from '@/mocks/server';
import { fakeScrollTo } from './fakeScrollTo';

window.scrollTo = fakeScrollTo;

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' });
});

beforeEach(() => setupIntersectionMocking(vi.fn));

afterEach(() => {
  cleanup();
  server.resetHandlers();
  server.events.removeAllListeners();
  resetIntersectionMocking();
  window.scrollTo(0, 0);
  localStorage.clear();
  sessionStorage.clear();
});

afterAll(() => {
  server.close();
});
