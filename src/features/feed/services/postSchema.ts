import { z } from 'zod';
import type { Post } from '../domain/Post';

export const postSchema = z.object({
  id: z.number(),
  title: z.string(),
  body: z.string(),
  tags: z.array(z.string()),
}) satisfies z.ZodType<Post>;
