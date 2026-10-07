import { http, HttpResponse } from 'msw';
import type { PostDetail } from '../domain/PostDetail';
import { POSTS_URL } from './postsUrl';

export const MOCK_POSTS_TOTAL = 25;

function mockPost(id: number): PostDetail {
  return {
    id,
    title: `Post ${id}`,
    body: `Body of post ${id}`,
    tags: ['mock'],
    views: id * 10,
    reactions: { likes: id, dislikes: 0 },
  };
}

export const feedHandlers = [
  http.get(POSTS_URL, ({ request }) => {
    const searchParams = new URL(request.url).searchParams;
    const limit = Number(searchParams.get('limit'));
    const skip = Number(searchParams.get('skip'));
    const pageLength = Math.max(0, Math.min(limit, MOCK_POSTS_TOTAL - skip));
    const posts = Array.from({ length: pageLength }, (_, index) => mockPost(skip + index + 1));
    return HttpResponse.json({ posts, total: MOCK_POSTS_TOTAL, skip, limit });
  }),
  http.get(`${POSTS_URL}/:postId`, ({ params }) => HttpResponse.json(mockPost(Number(params.postId)))),
];
