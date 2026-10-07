import { z } from 'zod';
import type { PostDetail } from '../domain/PostDetail';
import { postSchema } from './postSchema';

export const postDetailSchema = postSchema.extend({
  views: z.number(),
  reactions: z.object({ likes: z.number(), dislikes: z.number() }),
}) satisfies z.ZodType<PostDetail>;
