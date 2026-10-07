import { describe, expect, it } from 'vitest';
import { discountPercentFor } from './discountPercentFor';

describe('discountPercentFor', () => {
  it('returns the percentage of a known code', () => {
    expect(discountPercentFor('SAVE10')).toBe(10);
  });

  it('returns zero when no code is applied', () => {
    expect(discountPercentFor(null)).toBe(0);
  });
});
