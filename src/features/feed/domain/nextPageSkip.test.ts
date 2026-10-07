import { describe, expect, it } from 'vitest';
import { nextPageSkip } from './nextPageSkip';

describe('nextPageSkip', () => {
  it('returns the offset right after the current page when more posts remain', () => {
    expect(nextPageSkip({ posts: [], skip: 10, limit: 10, total: 251 })).toBe(20);
  });

  it('returns nothing when the current page reaches the last post', () => {
    expect(nextPageSkip({ posts: [], skip: 240, limit: 10, total: 250 })).toBeUndefined();
  });

  it('returns nothing when the current page holds the final few posts', () => {
    expect(nextPageSkip({ posts: [], skip: 250, limit: 10, total: 251 })).toBeUndefined();
  });
});
