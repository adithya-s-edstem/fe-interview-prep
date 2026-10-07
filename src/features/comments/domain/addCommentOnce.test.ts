import { describe, expect, it } from 'vitest';
import { addCommentOnce } from './addCommentOnce';

const firstComment = { clientId: 'a', text: 'First', createdAt: '2026-01-01T10:00:00.000Z' };
const secondComment = { clientId: 'b', text: 'Second', createdAt: '2026-01-01T10:01:00.000Z' };

describe('addCommentOnce', () => {
  it('appends a comment with a new client id to the end', () => {
    expect(addCommentOnce([firstComment], secondComment)).toEqual([firstComment, secondComment]);
  });

  it('keeps exactly one copy when the same client id is added again', () => {
    const comments = addCommentOnce(addCommentOnce([], firstComment), { ...firstComment, text: 'Resent' });

    expect(comments).toEqual([firstComment]);
  });

  it('leaves the original list unchanged', () => {
    const original = [firstComment];

    addCommentOnce(original, secondComment);

    expect(original).toEqual([firstComment]);
  });
});
