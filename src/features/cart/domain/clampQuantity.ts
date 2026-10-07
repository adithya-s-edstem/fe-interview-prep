const MINIMUM_QUANTITY = 1;

export function clampQuantity(quantity: number, stock: number): number {
  return Math.min(Math.max(quantity, MINIMUM_QUANTITY), stock);
}
