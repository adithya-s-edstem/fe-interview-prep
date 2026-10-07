import { persist } from 'zustand/middleware';
import { createStore } from 'zustand/vanilla';
import { addProduct } from '../domain/addProduct';
import type { CartItems } from '../domain/CartItem';
import { changeQuantity } from '../domain/changeQuantity';
import type { Product } from '../domain/Product';
import { removeItem } from '../domain/removeItem';

const CART_STORAGE_KEY = 'fe-interview-prep:cart';
const CART_STORAGE_VERSION = 2;

type SavedCart = {
  items: CartItems;
  discountCode: string | null;
};

const EMPTY_CART: SavedCart = { items: [], discountCode: null };

export type CartState = SavedCart & {
  add: (product: Product) => void;
  setQuantity: (productId: number, quantity: number) => void;
  remove: (productId: number) => void;
  applyDiscountCode: (code: string) => void;
};

export function createCartStore() {
  return createStore<CartState>()(
    persist(
      (set) => ({
        ...EMPTY_CART,
        add: (product) => set(({ items }) => ({ items: addProduct(items, product) })),
        setQuantity: (productId, quantity) =>
          set(({ items }) => ({ items: changeQuantity(items, productId, quantity) })),
        remove: (productId) => set(({ items }) => ({ items: removeItem(items, productId) })),
        applyDiscountCode: (code) => set({ discountCode: code }),
      }),
      {
        name: CART_STORAGE_KEY,
        version: CART_STORAGE_VERSION,
        partialize: ({ items, discountCode }): SavedCart => ({ items, discountCode }),
        migrate: () => EMPTY_CART,
      },
    ),
  );
}
