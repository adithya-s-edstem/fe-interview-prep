import { describe, expect, it } from 'vitest';
import { applyQueuedEdit } from './applyQueuedEdit';

const content = { clientId: 'a', text: 'Original', createdAt: '2026-01-01T10:00:00.000Z' };

describe('applyQueuedEdit', () => {
  it('replaces the text with the edited text for the same client id', () => {
    expect(applyQueuedEdit(content, { a: 'Edited' })).toEqual({ ...content, text: 'Edited' });
  });

  it('keeps the original text when the comment was not edited', () => {
    expect(applyQueuedEdit(content, { other: 'Edited' })).toEqual(content);
  });
});
