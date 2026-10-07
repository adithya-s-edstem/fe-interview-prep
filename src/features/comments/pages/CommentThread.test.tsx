import { onlineManager } from '@tanstack/react-query';
import { act, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { server } from '@/mocks/server';
import type { CommentContent } from '../domain/commentTypes';
import { createCommentsQueryClient } from '../hooks/createCommentsQueryClient';
import { useQueuedCommentEdits } from '../hooks/useQueuedCommentEdits';
import { commentsEndpoint } from '../services/commentsEndpoint';
import { createCommentsHandlers } from '../services/createCommentsHandlers';
import { CommentsQueryProvider } from './CommentsQueryProvider';
import { CommentThread } from './CommentThread';

function createTestNetwork() {
  let holding = false;
  let failuresLeft = 0;
  const heldResponses: (() => void)[] = [];
  return {
    holdResponses: () => {
      holding = true;
    },
    releaseResponsesNewestFirst: () => {
      holding = false;
      heldResponses
        .splice(0)
        .reverse()
        .forEach((respond) => respond());
    },
    heldResponseCount: () => heldResponses.length,
    failNextRequest: () => {
      failuresLeft += 1;
    },
    conditions: {
      waitBeforeResponding: () =>
        holding ? new Promise<void>((respond) => heldResponses.push(respond)) : Promise.resolve(),
      shouldFail: () => {
        if (failuresLeft === 0) return false;
        failuresLeft -= 1;
        return true;
      },
    },
  };
}

let network: ReturnType<typeof createTestNetwork>;

function openCommentsPage(client = createCommentsQueryClient()) {
  return render(
    <CommentsQueryProvider client={client}>
      <CommentThread />
    </CommentsQueryProvider>,
  );
}

function refreshPage(page: ReturnType<typeof openCommentsPage>) {
  page.unmount();
  return openCommentsPage();
}

function setBrowserOnline(isOnline: boolean) {
  vi.spyOn(navigator, 'onLine', 'get').mockReturnValue(isOnline);
  act(() => {
    window.dispatchEvent(new Event(isOnline ? 'online' : 'offline'));
  });
}

async function postComment(user: ReturnType<typeof userEvent.setup>, text: string) {
  await user.type(screen.getByRole('textbox', { name: 'Comment' }), text);
  await user.click(screen.getByRole('button', { name: 'Post comment' }));
}

async function textsStoredOnServer(): Promise<string[]> {
  const response = await fetch(commentsEndpoint);
  const comments = (await response.json()) as CommentContent[];
  return comments.map(({ text }) => text);
}

function comments() {
  return within(screen.getByRole('list', { name: 'Comments' })).queryAllByRole('listitem');
}

async function waitUntilEveryCommentIsSent(count: number) {
  await waitFor(() => expect(comments()).toHaveLength(count));
  await waitFor(() => {
    comments().forEach((comment) => expect(comment).not.toHaveTextContent(/Queued|Sending|Failed/));
  });
}

describe('comment thread', () => {
  beforeEach(() => {
    network = createTestNetwork();
    server.use(...createCommentsHandlers(network.conditions));
  });

  afterEach(() => {
    vi.restoreAllMocks();
    onlineManager.setOnline(true);
    useQueuedCommentEdits.setState({ editedTextByClientId: {} });
  });

  it('shows a posted comment straight away as sending until the server confirms it', async () => {
    const user = userEvent.setup();
    openCommentsPage();
    await waitFor(() => expect(screen.queryByText('Loading comments…')).not.toBeInTheDocument());
    network.holdResponses();

    await postComment(user, 'Hello there');

    expect(comments()[0]).toHaveTextContent('Hello there');
    expect(within(comments()[0]).getByRole('status')).toHaveTextContent('Sending…');
    network.releaseResponsesNewestFirst();
    await waitUntilEveryCommentIsSent(1);
  });

  it('keeps a failed comment visible with a retry button that sends it again exactly once', async () => {
    const user = userEvent.setup();
    openCommentsPage();
    await waitFor(() => expect(screen.queryByText('Loading comments…')).not.toBeInTheDocument());
    network.failNextRequest();

    await postComment(user, 'Try again');

    expect(await screen.findByText('Failed')).toBeInTheDocument();
    expect(comments()[0]).toHaveTextContent('Try again');
    await user.click(screen.getByRole('button', { name: 'Retry "Try again"' }));
    await waitUntilEveryCommentIsSent(1);
    expect(await textsStoredOnServer()).toEqual(['Try again']);
  });

  it('announces a status change of a comment to screen readers', async () => {
    const user = userEvent.setup();
    openCommentsPage();
    await waitFor(() => expect(screen.queryByText('Loading comments…')).not.toBeInTheDocument());
    network.failNextRequest();

    await postComment(user, 'Announce me');

    await waitFor(() => expect(within(comments()[0]).getByRole('status')).toHaveTextContent('Failed'));
  });

  it('moves focus to the comment after pressing retry', async () => {
    const user = userEvent.setup();
    openCommentsPage();
    await waitFor(() => expect(screen.queryByText('Loading comments…')).not.toBeInTheDocument());
    network.failNextRequest();
    await postComment(user, 'Focus me');
    await screen.findByText('Failed');

    await user.click(screen.getByRole('button', { name: 'Retry "Focus me"' }));

    expect(comments()[0]).toHaveFocus();
    await waitUntilEveryCommentIsSent(1);
  });

  it('forgets the failed attempt once its retry is confirmed', async () => {
    const user = userEvent.setup();
    const client = createCommentsQueryClient();
    openCommentsPage(client);
    await waitFor(() => expect(screen.queryByText('Loading comments…')).not.toBeInTheDocument());
    network.failNextRequest();
    await postComment(user, 'Forget the failure');
    await screen.findByText('Failed');

    await user.click(screen.getByRole('button', { name: 'Retry "Forget the failure"' }));
    await waitUntilEveryCommentIsSent(1);

    const failedAttempts = client.getMutationCache().findAll({ status: 'error' });
    expect(failedAttempts).toHaveLength(0);
  });

  it('keeps a failed comment with its retry button after a page refresh', async () => {
    const user = userEvent.setup();
    const page = openCommentsPage();
    await waitFor(() => expect(screen.queryByText('Loading comments…')).not.toBeInTheDocument());
    network.failNextRequest();
    await postComment(user, 'Still here');
    await screen.findByText('Failed');

    refreshPage(page);

    await waitFor(() => expect(comments()).toHaveLength(1));
    expect(comments()[0]).toHaveTextContent('Still here');
    expect(comments()[0]).toHaveTextContent('Failed');
    await user.click(screen.getByRole('button', { name: 'Retry "Still here"' }));
    await waitUntilEveryCommentIsSent(1);
    expect(await textsStoredOnServer()).toEqual(['Still here']);
  });

  it('queues comments while offline and sends them in order, once each, when back online', async () => {
    const user = userEvent.setup();
    openCommentsPage();
    await waitFor(() => expect(screen.queryByText('Loading comments…')).not.toBeInTheDocument());
    setBrowserOnline(false);

    await postComment(user, 'One');
    await postComment(user, 'Two');
    await postComment(user, 'Three');

    expect(comments()).toHaveLength(3);
    comments().forEach((comment) => expect(comment).toHaveTextContent('Queued'));
    expect(await textsStoredOnServer()).toEqual([]);
    network.holdResponses();
    setBrowserOnline(true);
    await waitFor(() => expect(network.heldResponseCount()).toBeGreaterThan(0));
    network.releaseResponsesNewestFirst();
    await waitUntilEveryCommentIsSent(3);
    expect(await textsStoredOnServer()).toEqual(['One', 'Two', 'Three']);
  });

  it('keeps queued comments across a page refresh and sends them once back online', async () => {
    const user = userEvent.setup();
    const page = openCommentsPage();
    await waitFor(() => expect(screen.queryByText('Loading comments…')).not.toBeInTheDocument());
    setBrowserOnline(false);
    await postComment(user, 'Survives');
    await postComment(user, 'Refresh');

    refreshPage(page);

    await waitFor(() => expect(comments()).toHaveLength(2));
    expect(comments()[0]).toHaveTextContent('Survives');
    expect(comments()[1]).toHaveTextContent('Refresh');
    comments().forEach((comment) => expect(comment).toHaveTextContent('Queued'));
    setBrowserOnline(true);
    await waitUntilEveryCommentIsSent(2);
    expect(await textsStoredOnServer()).toEqual(['Survives', 'Refresh']);
  });

  it('stores one copy of a comment whose request was still running when the page was refreshed', async () => {
    const user = userEvent.setup();
    const page = openCommentsPage();
    await waitFor(() => expect(screen.queryByText('Loading comments…')).not.toBeInTheDocument());
    network.holdResponses();
    await postComment(user, 'Mid flight');

    refreshPage(page);
    await waitFor(() => expect(comments()[0]).toHaveTextContent('Sending…'));
    network.releaseResponsesNewestFirst();

    await waitUntilEveryCommentIsSent(1);
    expect(await textsStoredOnServer()).toEqual(['Mid flight']);
  });

  it('sends the edited text of a comment that was edited while queued', async () => {
    const user = userEvent.setup();
    openCommentsPage();
    await waitFor(() => expect(screen.queryByText('Loading comments…')).not.toBeInTheDocument());
    setBrowserOnline(false);
    await postComment(user, 'Frist draft');

    await user.click(screen.getByRole('button', { name: 'Edit "Frist draft"' }));
    const editField = screen.getByRole('textbox', { name: 'Edit comment' });
    await user.clear(editField);
    await user.type(editField, 'First draft');
    await user.click(screen.getByRole('button', { name: 'Save' }));

    expect(comments()[0]).toHaveTextContent('First draft');
    expect(comments()[0]).toHaveTextContent('Queued');
    setBrowserOnline(true);
    await waitUntilEveryCommentIsSent(1);
    expect(await textsStoredOnServer()).toEqual(['First draft']);
  });

  it('moves focus into the edit box when editing starts and back to the edit button after saving', async () => {
    const user = userEvent.setup();
    openCommentsPage();
    await waitFor(() => expect(screen.queryByText('Loading comments…')).not.toBeInTheDocument());
    setBrowserOnline(false);
    await postComment(user, 'Draft');

    await user.click(screen.getByRole('button', { name: 'Edit "Draft"' }));
    expect(screen.getByRole('textbox', { name: 'Edit comment' })).toHaveFocus();
    await user.type(screen.getByRole('textbox', { name: 'Edit comment' }), ' two');
    await user.click(screen.getByRole('button', { name: 'Save' }));

    expect(screen.getByRole('button', { name: 'Edit "Draft two"' })).toHaveFocus();
  });

  it('returns focus to the edit button after cancelling an edit', async () => {
    const user = userEvent.setup();
    openCommentsPage();
    await waitFor(() => expect(screen.queryByText('Loading comments…')).not.toBeInTheDocument());
    setBrowserOnline(false);
    await postComment(user, 'Unchanged');

    await user.click(screen.getByRole('button', { name: 'Edit "Unchanged"' }));
    await user.click(screen.getByRole('button', { name: 'Cancel' }));

    expect(screen.getByRole('button', { name: 'Edit "Unchanged"' })).toHaveFocus();
  });
});
