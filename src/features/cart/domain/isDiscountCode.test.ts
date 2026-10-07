import { describe, expect, it } from 'vitest';
import { isDiscountCode } from './isDiscountCode';

describe('isDiscountCode', () => {
  it('accepts a known code', () => {
    expect(isDiscountCode('SAVE20')).toBe(true);
  });

  it('rejects an unknown code', () => {
    expect(isDiscountCode('FREE')).toBe(false);
  });

  it('rejects names inherited from plain objects', () => {
    expect(isDiscountCode('toString')).toBe(false);
  });
});
