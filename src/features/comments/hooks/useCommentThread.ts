import { type Mutation, useMutationState, useQuery } from '@tanstack/react-query';
import { buildCommentThread } from '../domain/buildCommentThread';
import type { CommentContent, SendAttempt } from '../domain/commentTypes';
import { fetchComments } from '../services/fetchComments';
import { addCommentMutationKey, commentsQueryKey } from './commentKeys';
import { useQueuedCommentEdits } from './useQueuedCommentEdits';

function toSendAttempt({ state }: Mutation<unknown, Error, unknown>): SendAttempt {
  return { content: state.variables as CommentContent, status: state.status, isPaused: state.isPaused };
}

export function useCommentThread() {
  const { data: sentComments = [], isPending } = useQuery({ queryKey: commentsQueryKey, queryFn: fetchComments });
  const sendAttempts = useMutationState({ filters: { mutationKey: addCommentMutationKey }, select: toSendAttempt });
  const editedTextByClientId = useQueuedCommentEdits((state) => state.editedTextByClientId);
  return {
    comments: buildCommentThread({ sentComments, sendAttempts, editedTextByClientId }),
    isLoading: isPending,
  };
}
