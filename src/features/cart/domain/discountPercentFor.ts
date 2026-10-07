import { discountPercentByCode } from './discountPercentByCode';

export function discountPercentFor(code: string | null): number {
  return code === null ? 0 : (discountPercentByCode[code] ?? 0);
}
