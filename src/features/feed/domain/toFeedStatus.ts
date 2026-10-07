import type { FeedStatus } from './FeedStatus';

type FeedQueryState = {
  isFetching: boolean;
  isError: boolean;
  hasNextPage: boolean;
};

export function toFeedStatus({ isFetching, isError, hasNextPage }: FeedQueryState): FeedStatus {
  if (isFetching) return 'loading';
  if (isError) return 'error';
  if (!hasNextPage) return 'end';
  return 'idle';
}
