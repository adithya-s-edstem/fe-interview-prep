import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import { changeQuantity } from './changeQuantity';
import { handCream } from './testProducts';

const cartWithHandCream = [{ product: handCream, quantity: 1 }];

describe('changeQuantity', () => {
  it('keeps the new quantity of an item', () => {
    expect(changeQuantity(cartWithHandCream, handCream.id, 2)[0]?.quantity).toBe(2);
  });

  it('never sets a quantity above the stock', () => {
    fc.assert(
      fc.property(fc.integer({ min: -50, max: 50 }), (quantity) => {
        const changed = changeQuantity(cartWithHandCream, handCream.id, quantity)[0]?.quantity;
        expect(changed).toBeLessThanOrEqual(handCream.stock);
      }),
    );
  });
});
