import type { CartItems } from './CartItem';
import { clampQuantity } from './clampQuantity';
import type { Product } from './Product';

export function addProduct(items: CartItems, product: Product): CartItems {
  const currentQuantity = items[product.id]?.quantity ?? 0;
  return { ...items, [product.id]: { product, quantity: clampQuantity(currentQuantity + 1, product.stock) } };
}
