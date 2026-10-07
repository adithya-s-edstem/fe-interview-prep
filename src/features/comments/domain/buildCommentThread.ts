import { applyQueuedEdit } from './applyQueuedEdit';
import type { CommentContent, EditedTextByClientId, SendAttempt, ThreadComment } from './commentTypes';
import { sendStatusOf } from './sendStatusOf';

type CommentThreadSources = {
  sentComments: readonly CommentContent[];
  sendAttempts: readonly SendAttempt[];
  editedTextByClientId: EditedTextByClientId;
};

function latestAttemptPerComment(sendAttempts: readonly SendAttempt[]): SendAttempt[] {
  const latestByClientId = new Map(sendAttempts.map((attempt) => [attempt.content.clientId, attempt]));
  return [...latestByClientId.values()];
}

function byCreationTime(first: ThreadComment, second: ThreadComment): number {
  return first.content.createdAt.localeCompare(second.content.createdAt);
}

export function buildCommentThread({
  sentComments,
  sendAttempts,
  editedTextByClientId,
}: CommentThreadSources): ThreadComment[] {
  const sentClientIds = new Set(sentComments.map(({ clientId }) => clientId));
  const unsentComments = latestAttemptPerComment(sendAttempts)
    .filter((attempt) => !sentClientIds.has(attempt.content.clientId))
    .map((attempt) => ({
      content: applyQueuedEdit(attempt.content, editedTextByClientId),
      status: sendStatusOf(attempt),
    }));
  const confirmedComments = sentComments.map((content) => ({ content, status: 'sent' as const }));
  return [...confirmedComments, ...unsentComments].sort(byCreationTime);
}
