import { describe, expect, it } from 'vitest';
import { addProduct } from './addProduct';
import type { CartItems } from './CartItem';
import { handCream, lipBalm } from './testProducts';

function quantityOf(items: CartItems, productId: number) {
  return items.find((item) => item.product.id === productId)?.quantity;
}

describe('addProduct', () => {
  it('puts a new product in the cart with quantity 1', () => {
    expect(addProduct([], lipBalm)).toEqual([{ product: lipBalm, quantity: 1 }]);
  });

  it('increases the quantity when the product is already in the cart', () => {
    const cart = addProduct(addProduct([], lipBalm), lipBalm);

    expect(quantityOf(cart, lipBalm.id)).toBe(2);
  });

  it('never raises the quantity above the stock', () => {
    const cart = [1, 2, 3].reduce<CartItems>((items) => addProduct(items, handCream), []);

    expect(quantityOf(cart, handCream.id)).toBe(handCream.stock);
  });

  it('keeps products in the order they were first added', () => {
    const cart = addProduct(addProduct(addProduct([], handCream), lipBalm), handCream);

    expect(cart.map((item) => item.product.id)).toEqual([handCream.id, lipBalm.id]);
  });
});
