import type { CommentStatus, SendAttempt } from './commentTypes';

export function sendStatusOf({ status, isPaused }: SendAttempt): CommentStatus {
  if (status === 'error') return 'failed';
  if (status === 'success') return 'sent';
  return isPaused ? 'queued' : 'sending';
}
