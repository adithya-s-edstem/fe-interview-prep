import type { CartItems } from './CartItem';
import { changeQuantity } from './changeQuantity';
import { clampQuantity } from './clampQuantity';
import type { Product } from './Product';

export function addProduct(items: CartItems, product: Product): CartItems {
  const itemInCart = items.find((item) => item.product.id === product.id);
  if (itemInCart) {
    return changeQuantity(items, product.id, itemInCart.quantity + 1);
  }
  return [...items, { product, quantity: clampQuantity(1, product.stock) }];
}
