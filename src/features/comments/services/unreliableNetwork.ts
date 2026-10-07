import { delay } from 'msw';
import type { NetworkConditions } from './createCommentsHandlers';

const shortestDelayMs = 1000;
const longestDelayMs = 2000;
const failureRate = 0.2;

export const unreliableNetwork: NetworkConditions = {
  waitBeforeResponding: () => delay(shortestDelayMs + Math.random() * (longestDelayMs - shortestDelayMs)),
  shouldFail: () => Math.random() < failureRate,
};
