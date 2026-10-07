import { POSTS_PAGE_SIZE } from '../domain/postsPageSize';
import type { PostsPage } from '../domain/PostsPage';
import { fetchJson } from './fetchJson';
import { postsPageSchema } from './postsPageSchema';
import { POSTS_URL } from './postsUrl';

export async function fetchPostsPage(skip: number): Promise<PostsPage> {
  const searchParams = new URLSearchParams({ limit: String(POSTS_PAGE_SIZE), skip: String(skip) });
  return postsPageSchema.parse(await fetchJson(`${POSTS_URL}?${searchParams}`));
}
