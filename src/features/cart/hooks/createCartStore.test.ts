import { describe, expect, it } from 'vitest';
import { lipBalm } from '../domain/testProducts';
import { createCartStore } from './createCartStore';

describe('createCartStore', () => {
  it('starts with an empty cart and no discount code', () => {
    const { items, discountCode } = createCartStore().getState();

    expect({ items, discountCode }).toEqual({ items: [], discountCode: null });
  });

  it('gives a newly created store the items and discount code saved by an earlier one', () => {
    const firstVisit = createCartStore().getState();
    firstVisit.add(lipBalm);
    firstVisit.add(lipBalm);
    firstVisit.applyDiscountCode('SAVE10');

    const { items, discountCode } = createCartStore().getState();

    expect({ items, discountCode }).toEqual({
      items: [{ product: lipBalm, quantity: 2 }],
      discountCode: 'SAVE10',
    });
  });
});
