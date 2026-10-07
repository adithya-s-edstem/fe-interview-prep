import type { CartItems } from './CartItem';

export function removeItem(items: CartItems, productId: number): CartItems {
  return Object.fromEntries(Object.entries(items).filter(([id]) => Number(id) !== productId));
}
