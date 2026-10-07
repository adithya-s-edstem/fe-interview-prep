import { http, HttpResponse } from 'msw';
import type { CommentContent } from '../domain/commentTypes';
import { commentsEndpoint } from './commentsEndpoint';
import { readStoredComments, storeCommentOnce } from './mockCommentsDatabase';

export type NetworkConditions = {
  waitBeforeResponding: () => Promise<void>;
  shouldFail: () => boolean;
};

const serverError = () => HttpResponse.json({ message: 'Comments service unavailable' }, { status: 500 });

export function createCommentsHandlers({ waitBeforeResponding, shouldFail }: NetworkConditions) {
  return [
    http.get(commentsEndpoint, async () => {
      await waitBeforeResponding();
      return shouldFail() ? serverError() : HttpResponse.json(readStoredComments());
    }),
    http.post(commentsEndpoint, async ({ request }) => {
      const comment = (await request.json()) as CommentContent;
      await waitBeforeResponding();
      return shouldFail() ? serverError() : HttpResponse.json(storeCommentOnce(comment), { status: 201 });
    }),
  ];
}
