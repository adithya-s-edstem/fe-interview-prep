import { z } from 'zod';

export const cardInputSchema = z.object({
  title: z.string().trim().min(1, 'Enter a title'),
  description: z.string().trim(),
});

export type CardInput = z.infer<typeof cardInputSchema>;
