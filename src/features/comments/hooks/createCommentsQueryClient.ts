import { QueryClient } from '@tanstack/react-query';
import { addCommentOnce } from '../domain/addCommentOnce';
import { applyQueuedEdit } from '../domain/applyQueuedEdit';
import type { CommentContent } from '../domain/commentTypes';
import { postComment } from '../services/postComment';
import { startFromBrowserOnlineStatus } from '../services/startFromBrowserOnlineStatus';
import { addCommentMutationKey, commentsQueryKey } from './commentKeys';
import { useQueuedCommentEdits } from './useQueuedCommentEdits';

const sendInCreationOrder = { id: 'comments' };

export function createCommentsQueryClient(): QueryClient {
  startFromBrowserOnlineStatus();
  const queryClient = new QueryClient();
  queryClient.setMutationDefaults(addCommentMutationKey, {
    mutationFn: (comment: CommentContent) =>
      postComment(applyQueuedEdit(comment, useQueuedCommentEdits.getState().editedTextByClientId)),
    scope: sendInCreationOrder,
    gcTime: Infinity,
    onSuccess: (sentComment: CommentContent) => {
      queryClient.setQueryData<CommentContent[]>(commentsQueryKey, (comments = []) =>
        addCommentOnce(comments, sentComment),
      );
      useQueuedCommentEdits.getState().forgetEdit(sentComment.clientId);
    },
  });
  return queryClient;
}
