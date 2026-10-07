import { describe, expect, it } from 'vitest';
import { removeItem } from './removeItem';
import { handCream, lipBalm } from './testProducts';

describe('removeItem', () => {
  it('takes only the removed product out of the cart', () => {
    const cart = {
      [lipBalm.id]: { product: lipBalm, quantity: 1 },
      [handCream.id]: { product: handCream, quantity: 2 },
    };

    expect(removeItem(cart, lipBalm.id)).toEqual({ [handCream.id]: { product: handCream, quantity: 2 } });
  });
});
