import type { Post } from './Post';

export type PostDetail = Post & {
  views: number;
  reactions: { likes: number; dislikes: number };
};
