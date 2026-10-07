import { describe, expect, it } from 'vitest';
import { formatCents } from './formatCents';

describe('formatCents', () => {
  it('shows an amount in dollars with exactly two decimals', () => {
    expect(formatCents(30)).toBe('$0.30');
  });

  it('groups thousands', () => {
    expect(formatCents(123_456_700)).toBe('$1,234,567.00');
  });
});
