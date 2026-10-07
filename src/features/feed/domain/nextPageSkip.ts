import type { PostsPage } from './PostsPage';

export function nextPageSkip({ skip, limit, total }: PostsPage): number | undefined {
  const nextSkip = skip + limit;
  return nextSkip < total ? nextSkip : undefined;
}
