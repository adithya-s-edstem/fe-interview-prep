import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import { calculateTotals } from './calculateTotals';
import { handCream, lipBalm } from './testProducts';

describe('calculateTotals', () => {
  it('adds 18% tax to the subtotal without floating-point drift', () => {
    const items = [
      { product: lipBalm, quantity: 1 },
      { product: handCream, quantity: 1 },
    ];

    expect(calculateTotals(items, 0)).toEqual({ discountCents: 0, subtotalCents: 30, taxCents: 5, totalCents: 35 });
  });

  it('multiplies each price by its quantity', () => {
    expect(calculateTotals([{ product: handCream, quantity: 2 }], 0).subtotalCents).toBe(40);
  });

  it('takes the discount off before tax', () => {
    const items = [{ product: { ...lipBalm, priceCents: 10_000 }, quantity: 1 }];

    expect(calculateTotals(items, 10)).toEqual({
      discountCents: 1000,
      subtotalCents: 9000,
      taxCents: 1620,
      totalCents: 10_620,
    });
  });

  it('returns zero for every amount of an empty cart', () => {
    expect(calculateTotals([], 0)).toEqual({ discountCents: 0, subtotalCents: 0, taxCents: 0, totalCents: 0 });
  });

  it('always makes the total equal the subtotal plus the tax, in whole cents', () => {
    const cartLine = fc.record({
      priceCents: fc.integer({ min: 1, max: 1_000_000 }),
      quantity: fc.integer({ min: 1, max: 100 }),
    });
    fc.assert(
      fc.property(fc.array(cartLine), fc.integer({ min: 0, max: 100 }), (lines, discountPercent) => {
        const items = lines.map(({ priceCents, quantity }) => ({ product: { ...lipBalm, priceCents }, quantity }));
        const totals = calculateTotals(items, discountPercent);
        expect(totals.totalCents).toBe(totals.subtotalCents + totals.taxCents);
        expect(Object.values(totals).every(Number.isInteger)).toBe(true);
      }),
    );
  });
});
