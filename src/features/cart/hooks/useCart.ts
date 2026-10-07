import { useState } from 'react';
import { useStore } from 'zustand';
import { calculateTotals } from '../domain/calculateTotals';
import { discountPercentFor } from '../domain/discountPercentFor';
import { createCartStore } from './createCartStore';

export function useCart() {
  const [cartStore] = useState(createCartStore);
  const { items, discountCode, add, setQuantity, remove, applyDiscountCode } = useStore(cartStore);
  const cartItems = Object.values(items);
  const totals = calculateTotals(cartItems, discountPercentFor(discountCode));
  return { cartItems, totals, discountCode, add, setQuantity, remove, applyDiscountCode };
}
