import { beforeEach, describe, expect, it } from 'vitest';
import { server } from '@/mocks/server';
import { commentsEndpoint } from './commentsEndpoint';
import { createCommentsHandlers } from './createCommentsHandlers';

const comment = { clientId: 'client-1', text: 'Hello', createdAt: '2026-01-01T10:00:00.000Z' };

function post(body: object) {
  return fetch(commentsEndpoint, { method: 'POST', body: JSON.stringify(body) });
}

describe('mock comments API', () => {
  beforeEach(() => {
    server.use(...createCommentsHandlers({ waitBeforeResponding: () => Promise.resolve(), shouldFail: () => false }));
  });

  it('returns posted comments in the order they arrived', async () => {
    await post(comment);
    await post({ ...comment, clientId: 'client-2', text: 'Second' });

    const comments = (await (await fetch(commentsEndpoint)).json()) as { text: string }[];

    expect(comments.map(({ text }) => text)).toEqual(['Hello', 'Second']);
  });

  it('stores one comment when the same client id is posted twice', async () => {
    await post(comment);
    const repeated = await post(comment);

    const comments = (await (await fetch(commentsEndpoint)).json()) as unknown[];

    expect(await repeated.json()).toEqual(comment);
    expect(comments).toEqual([comment]);
  });

  it('answers with a server error when the request is chosen to fail', async () => {
    server.use(...createCommentsHandlers({ waitBeforeResponding: () => Promise.resolve(), shouldFail: () => true }));

    const response = await post(comment);

    expect(response.status).toBe(500);
  });
});
