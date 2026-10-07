import type { Post } from './Post';

export type PostsPage = {
  posts: Post[];
  skip: number;
  limit: number;
  total: number;
};
