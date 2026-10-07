import { describe, expect, it } from 'vitest';
import { addProduct } from './addProduct';
import type { CartItems } from './CartItem';
import { handCream, lipBalm } from './testProducts';

describe('addProduct', () => {
  it('puts a new product in the cart with quantity 1', () => {
    expect(addProduct({}, lipBalm)).toEqual({ [lipBalm.id]: { product: lipBalm, quantity: 1 } });
  });

  it('increases the quantity when the product is already in the cart', () => {
    const cart = addProduct(addProduct({}, lipBalm), lipBalm);

    expect(cart[lipBalm.id]?.quantity).toBe(2);
  });

  it('never raises the quantity above the stock', () => {
    const cart = [1, 2, 3].reduce<CartItems>((items) => addProduct(items, handCream), {});

    expect(cart[handCream.id]?.quantity).toBe(handCream.stock);
  });
});
