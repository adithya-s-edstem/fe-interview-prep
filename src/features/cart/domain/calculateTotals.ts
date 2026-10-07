import type { CartItem } from './CartItem';
import type { CartTotals } from './CartTotals';

const TAX_PERCENT = 18;

function percentOf(amountCents: number, percent: number): number {
  return Math.round((amountCents * percent) / 100);
}

export function calculateTotals(items: readonly CartItem[], discountPercent: number): CartTotals {
  const itemsCents = items.reduce((sum, { product, quantity }) => sum + product.priceCents * quantity, 0);
  const discountCents = percentOf(itemsCents, discountPercent);
  const subtotalCents = itemsCents - discountCents;
  const taxCents = percentOf(subtotalCents, TAX_PERCENT);
  return { discountCents, subtotalCents, taxCents, totalCents: subtotalCents + taxCents };
}
