import type { CartItems } from './CartItem';
import { clampQuantity } from './clampQuantity';

export function changeQuantity(items: CartItems, productId: number, quantity: number): CartItems {
  const item = items[productId];
  if (!item) {
    return items;
  }
  return { ...items, [productId]: { ...item, quantity: clampQuantity(quantity, item.product.stock) } };
}
