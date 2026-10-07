import { describe, expect, it } from 'vitest';
import { toFeedStatus } from './toFeedStatus';

describe('toFeedStatus', () => {
  it('is loading while a page is in flight, even after an earlier failure', () => {
    expect(toFeedStatus({ isFetching: true, isError: true, hasNextPage: true })).toBe('loading');
  });

  it('is an error when the last page request failed', () => {
    expect(toFeedStatus({ isFetching: false, isError: true, hasNextPage: true })).toBe('error');
  });

  it('is the end when no page is left to load', () => {
    expect(toFeedStatus({ isFetching: false, isError: false, hasNextPage: false })).toBe('end');
  });

  it('is idle when another page can be loaded', () => {
    expect(toFeedStatus({ isFetching: false, isError: false, hasNextPage: true })).toBe('idle');
  });
});
