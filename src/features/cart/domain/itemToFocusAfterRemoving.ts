import type { CartItem, CartItems } from './CartItem';

export function itemToFocusAfterRemoving(items: CartItems, productId: number): CartItem | undefined {
  const removedIndex = items.findIndex((item) => item.product.id === productId);
  return items[removedIndex + 1] ?? items[removedIndex - 1];
}
