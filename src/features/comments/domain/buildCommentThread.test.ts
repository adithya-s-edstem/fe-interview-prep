import { describe, expect, it } from 'vitest';
import { buildCommentThread } from './buildCommentThread';
import type { SendAttempt } from './commentTypes';

const earlier = { clientId: 'a', text: 'Earlier', createdAt: '2026-01-01T10:00:00.000Z' };
const later = { clientId: 'b', text: 'Later', createdAt: '2026-01-01T10:05:00.000Z' };

function attempt(content: SendAttempt['content'], status: SendAttempt['status'], isPaused = false): SendAttempt {
  return { content, status, isPaused };
}

describe('buildCommentThread', () => {
  it('lists confirmed and unsent comments together in the order they were written', () => {
    const thread = buildCommentThread({
      sentComments: [later],
      sendAttempts: [attempt(earlier, 'pending', true)],
      editedTextByClientId: {},
    });

    expect(thread).toEqual([
      { content: earlier, status: 'queued' },
      { content: later, status: 'sent' },
    ]);
  });

  it('shows a comment once when its send was confirmed by the server', () => {
    const thread = buildCommentThread({
      sentComments: [earlier],
      sendAttempts: [attempt(earlier, 'error'), attempt(earlier, 'success')],
      editedTextByClientId: {},
    });

    expect(thread).toEqual([{ content: earlier, status: 'sent' }]);
  });

  it('shows the latest attempt when a failed comment is retried', () => {
    const thread = buildCommentThread({
      sentComments: [],
      sendAttempts: [attempt(earlier, 'error'), attempt(earlier, 'pending')],
      editedTextByClientId: {},
    });

    expect(thread).toEqual([{ content: earlier, status: 'sending' }]);
  });

  it('shows the edited text of a comment that is still waiting to be sent', () => {
    const thread = buildCommentThread({
      sentComments: [],
      sendAttempts: [attempt(earlier, 'pending', true)],
      editedTextByClientId: { a: 'Edited' },
    });

    expect(thread).toEqual([{ content: { ...earlier, text: 'Edited' }, status: 'queued' }]);
  });

  it('shows the server text of a comment that has been sent', () => {
    const thread = buildCommentThread({
      sentComments: [earlier],
      sendAttempts: [],
      editedTextByClientId: { a: 'Edited' },
    });

    expect(thread).toEqual([{ content: earlier, status: 'sent' }]);
  });
});
