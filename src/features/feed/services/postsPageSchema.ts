import { z } from 'zod';
import type { PostsPage } from '../domain/PostsPage';
import { postSchema } from './postSchema';

export const postsPageSchema = z.object({
  posts: z.array(postSchema),
  skip: z.number(),
  limit: z.number(),
  total: z.number(),
}) satisfies z.ZodType<PostsPage>;
