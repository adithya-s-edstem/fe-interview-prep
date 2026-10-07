import { describe, expect, it } from 'vitest';
import { isRefreshPull, REFRESH_PULL_DISTANCE } from './isRefreshPull';

describe('isRefreshPull', () => {
  it('treats a pull of at least the refresh distance as a refresh', () => {
    expect(isRefreshPull(REFRESH_PULL_DISTANCE)).toBe(true);
  });

  it('ignores a shorter pull', () => {
    expect(isRefreshPull(REFRESH_PULL_DISTANCE - 1)).toBe(false);
  });

  it('ignores a push upwards', () => {
    expect(isRefreshPull(-REFRESH_PULL_DISTANCE)).toBe(false);
  });
});
