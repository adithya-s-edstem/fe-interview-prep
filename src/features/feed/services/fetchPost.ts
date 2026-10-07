import type { PostDetail } from '../domain/PostDetail';
import { fetchJson } from './fetchJson';
import { postDetailSchema } from './postDetailSchema';
import { POSTS_URL } from './postsUrl';

export async function fetchPost(postId: number): Promise<PostDetail> {
  return postDetailSchema.parse(await fetchJson(`${POSTS_URL}/${postId}`));
}
