import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import { clampQuantity } from './clampQuantity';

describe('clampQuantity', () => {
  it('keeps a quantity that is within stock', () => {
    expect(clampQuantity(3, 5)).toBe(3);
  });

  it('lowers a quantity above stock to the stock', () => {
    expect(clampQuantity(8, 5)).toBe(5);
  });

  it('raises a quantity below one to one', () => {
    expect(clampQuantity(0, 5)).toBe(1);
  });

  it('never returns more than the stock or less than one', () => {
    fc.assert(
      fc.property(fc.integer({ min: -100, max: 100 }), fc.integer({ min: 1, max: 100 }), (quantity, stock) => {
        const clamped = clampQuantity(quantity, stock);
        expect(clamped).toBeGreaterThanOrEqual(1);
        expect(clamped).toBeLessThanOrEqual(stock);
      }),
    );
  });
});
