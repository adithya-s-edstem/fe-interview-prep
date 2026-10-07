import { act, fireEvent, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import { mockIsIntersecting } from 'react-intersection-observer/test-utils';
import { describe, expect, it } from 'vitest';
import { server } from '@/mocks/server';
import { renderAppAt } from '@/test/renderAppAt';
import { MOCK_POSTS_TOTAL } from '../services/mocks';
import { POSTS_URL } from '../services/postsUrl';

function recordPostsPageRequests() {
  const requestedPages: { limit: string | null; skip: string | null }[] = [];
  server.events.on('request:start', ({ request }) => {
    const url = new URL(request.url);
    if (`${url.origin}${url.pathname}` !== POSTS_URL) return;
    requestedPages.push({ limit: url.searchParams.get('limit'), skip: url.searchParams.get('skip') });
  });
  return requestedPages;
}

function failNextPostsPageRequest() {
  server.use(http.get(POSTS_URL, () => HttpResponse.json({}, { status: 500 }), { once: true }));
}

function postLinkNames() {
  return within(screen.getByRole('list', { name: 'Posts' }))
    .getAllByRole('link')
    .map((link) => link.textContent);
}

function scrollFeedEndIntoView(isVisible = true) {
  mockIsIntersecting(screen.getByRole('status'), isVisible);
}

async function loadEveryPost() {
  await screen.findByRole('link', { name: 'Post 1' });
  scrollFeedEndIntoView();
  await screen.findByText("You've reached the end");
}

describe('FeedPage', () => {
  it('requests the first 10 posts and shows them', async () => {
    const requestedPages = recordPostsPageRequests();
    renderAppAt('/feed');

    await screen.findByRole('link', { name: 'Post 1' });

    expect(requestedPages).toEqual([{ limit: '10', skip: '0' }]);
    expect(postLinkNames()).toHaveLength(10);
  });

  it('shows a loading indicator while a page is in flight', async () => {
    renderAppAt('/feed');

    expect(screen.getByRole('status')).toHaveTextContent('Loading posts');
    await screen.findByRole('link', { name: 'Post 1' });
    expect(screen.getByRole('status')).not.toHaveTextContent('Loading posts');
  });

  it('loads the next page with the next offset when the end of the list comes into view', async () => {
    const requestedPages = recordPostsPageRequests();
    renderAppAt('/feed');
    await screen.findByRole('link', { name: 'Post 1' });

    scrollFeedEndIntoView();

    expect(await screen.findByRole('link', { name: 'Post 11' })).toBeInTheDocument();
    expect(requestedPages.slice(0, 2)).toEqual([
      { limit: '10', skip: '0' },
      { limit: '10', skip: '10' },
    ]);
  });

  it('requests each page once and shows each post once when scrolling to the end fast', async () => {
    const requestedPages = recordPostsPageRequests();
    renderAppAt('/feed');
    await screen.findByRole('link', { name: 'Post 1' });

    for (let flick = 0; flick < 5; flick += 1) {
      scrollFeedEndIntoView(false);
      scrollFeedEndIntoView(true);
    }
    await screen.findByText("You've reached the end");

    expect(requestedPages.map(({ skip }) => skip)).toEqual(['0', '10', '20']);
    expect(new Set(postLinkNames()).size).toBe(MOCK_POSTS_TOTAL);
    expect(postLinkNames()).toHaveLength(MOCK_POSTS_TOTAL);
  });

  it('shows the end message and stops requesting once every post is loaded', async () => {
    const requestedPages = recordPostsPageRequests();
    renderAppAt('/feed');
    await loadEveryPost();
    const requestCountAtEnd = requestedPages.length;

    scrollFeedEndIntoView(false);
    scrollFeedEndIntoView(true);

    expect(screen.getByRole('status')).toHaveTextContent("You've reached the end");
    expect(requestedPages).toHaveLength(requestCountAtEnd);
  });

  it('shows an error with retry for a failed page, and retry requests that page and continues', async () => {
    const user = userEvent.setup();
    const requestedPages = recordPostsPageRequests();
    renderAppAt('/feed');
    await screen.findByRole('link', { name: 'Post 1' });
    failNextPostsPageRequest();

    scrollFeedEndIntoView();
    await screen.findByRole('alert');
    await user.click(screen.getByRole('button', { name: 'Retry' }));

    expect(await screen.findByRole('link', { name: 'Post 11' })).toBeInTheDocument();
    expect(requestedPages.map(({ skip }) => skip).slice(0, 3)).toEqual(['0', '10', '10']);
  });

  it('retries the first page when the very first request fails', async () => {
    const user = userEvent.setup();
    failNextPostsPageRequest();
    renderAppAt('/feed');

    await user.click(await screen.findByRole('button', { name: 'Retry' }));

    expect(await screen.findByRole('link', { name: 'Post 1' })).toBeInTheDocument();
  });

  it('opens the detail page of the clicked post', async () => {
    const user = userEvent.setup();
    const router = renderAppAt('/feed');

    await user.click(await screen.findByRole('link', { name: 'Post 3' }));

    expect(router.state.location.pathname).toBe('/feed/3');
    expect(await screen.findByRole('heading', { level: 1, name: 'Post 3' })).toBeInTheDocument();
  });

  it('returns to the same scroll position with the loaded posts when going back from a post', async () => {
    const user = userEvent.setup();
    const requestedPages = recordPostsPageRequests();
    const router = renderAppAt('/feed');
    await loadEveryPost();
    const requestCountBeforeLeaving = requestedPages.length;
    window.scrollTo(0, 1500);

    await user.click(screen.getByRole('link', { name: 'Post 15' }));
    await screen.findByRole('heading', { level: 1, name: 'Post 15' });
    await act(() => router.navigate(-1));

    expect(screen.getByRole('link', { name: 'Post 25' })).toBeInTheDocument();
    expect(window.scrollY).toBe(1500);
    expect(requestedPages).toHaveLength(requestCountBeforeLeaving);
  });

  it('scrolls back to the top when the user presses back to top after scrolling down', async () => {
    const user = userEvent.setup();
    renderAppAt('/feed');
    await screen.findByRole('link', { name: 'Post 1' });
    expect(screen.queryByRole('button', { name: 'Back to top' })).not.toBeInTheDocument();
    window.scrollTo(0, 900);

    mockIsIntersecting(screen.getByRole('heading', { level: 1, name: 'Infinite Feed' }), false);
    await user.click(await screen.findByRole('button', { name: 'Back to top' }));

    expect(window.scrollY).toBe(0);
  });

  it('reloads the feed from the first page when the user pulls down at the top', async () => {
    const requestedPages = recordPostsPageRequests();
    renderAppAt('/feed');
    await loadEveryPost();
    scrollFeedEndIntoView(false);
    window.scrollTo(0, 0);
    const feed = screen.getByRole('region', { name: 'Infinite Feed' });

    fireEvent.touchStart(feed, { touches: [{ clientY: 10 }] });
    fireEvent.touchEnd(feed, { changedTouches: [{ clientY: 200 }] });

    await waitFor(() => expect(postLinkNames()).toHaveLength(10));
    expect(requestedPages.at(-1)).toEqual({ limit: '10', skip: '0' });
  });
});
