import { z } from 'zod';
import { isDiscountCode } from '../domain/isDiscountCode';

export const discountCodeFormSchema = z.object({
  code: z.string().trim().toUpperCase().refine(isDiscountCode, 'This discount code is not valid.'),
});
