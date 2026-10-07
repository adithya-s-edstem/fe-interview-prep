import type { QueryClient } from '@tanstack/react-query';
import type { CommentContent } from '../domain/commentTypes';
import { addCommentMutationKey } from './commentKeys';

export function forgetFailedSends(queryClient: QueryClient, clientId: string): void {
  const mutationCache = queryClient.getMutationCache();
  mutationCache
    .findAll({
      mutationKey: addCommentMutationKey,
      status: 'error',
      predicate: ({ state }) => (state.variables as CommentContent).clientId === clientId,
    })
    .forEach((failedSend) => mutationCache.remove(failedSend));
}
