import type { CartItems } from './CartItem';

export function removeItem(items: CartItems, productId: number): CartItems {
  return items.filter((item) => item.product.id !== productId);
}
