import { type InfiniteData, useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { nextPageSkip } from '../domain/nextPageSkip';
import type { PostsPage } from '../domain/PostsPage';
import { toFeedStatus } from '../domain/toFeedStatus';
import { uniqueById } from '../domain/uniqueById';
import { fetchPostsPage } from '../services/fetchPostsPage';

const FEED_QUERY_KEY = ['posts'];
const FIRST_PAGE_SKIP = 0;

function allUniquePosts(feed: InfiniteData<PostsPage, number>) {
  return uniqueById(feed.pages.flatMap((page) => page.posts));
}

export function useFeed() {
  const queryClient = useQueryClient();
  const {
    data: posts = [],
    fetchNextPage,
    hasNextPage,
    isFetching,
    isError,
  } = useInfiniteQuery({
    queryKey: FEED_QUERY_KEY,
    queryFn: ({ pageParam }) => fetchPostsPage(pageParam),
    initialPageParam: FIRST_PAGE_SKIP,
    getNextPageParam: nextPageSkip,
    select: allUniquePosts,
    staleTime: Infinity,
  });
  const status = toFeedStatus({ isFetching, isError, hasNextPage });

  const retry = useCallback(() => void fetchNextPage({ cancelRefetch: false }), [fetchNextPage]);

  const loadNextPage = useCallback(() => {
    if (status === 'idle') retry();
  }, [status, retry]);

  const refresh = useCallback(() => void queryClient.resetQueries({ queryKey: FEED_QUERY_KEY }), [queryClient]);

  return { posts, status, loadNextPage, retry, refresh };
}
