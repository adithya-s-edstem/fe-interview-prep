import type { CartItems } from './CartItem';
import { clampQuantity } from './clampQuantity';

export function changeQuantity(items: CartItems, productId: number, quantity: number): CartItems {
  return items.map((item) =>
    item.product.id === productId ? { ...item, quantity: clampQuantity(quantity, item.product.stock) } : item,
  );
}
