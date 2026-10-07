import { discountPercentByCode } from './discountPercentByCode';

export function isDiscountCode(code: string): boolean {
  return Object.hasOwn(discountPercentByCode, code);
}
