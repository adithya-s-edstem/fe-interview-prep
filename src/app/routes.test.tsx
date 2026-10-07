import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { renderAppAt } from '@/test/renderAppAt';

const questionPages = [
  { linkName: 'Shopping Cart', path: '/cart' },
  { linkName: 'Infinite Feed', path: '/feed' },
  { linkName: 'Kanban Board', path: '/kanban' },
  { linkName: 'Live Dashboard', path: '/dashboard' },
  { linkName: 'Comments with Offline Support', path: '/comments' },
];

describe('app routes', () => {
  it('shows a navigation with one link per question', () => {
    renderAppAt('/cart');

    const navigation = screen.getByRole('navigation', { name: 'Questions' });
    const links = within(navigation).getAllByRole('link');

    expect(links.map((link) => [link.textContent, link.getAttribute('href')])).toEqual(
      questionPages.map(({ linkName, path }) => [linkName, path]),
    );
  });

  it.each(questionPages)('opens the $linkName page from its navigation link', async ({ linkName, path }) => {
    const user = userEvent.setup();
    const router = renderAppAt(path === '/cart' ? '/feed' : '/cart');

    await user.click(screen.getByRole('link', { name: linkName }));

    expect(router.state.location.pathname).toBe(path);
    expect(screen.getByRole('heading', { level: 1, name: linkName })).toBeInTheDocument();
  });

  it('takes the user from the root to the shopping cart', async () => {
    const router = renderAppAt('/');

    expect(await screen.findByRole('heading', { level: 1, name: 'Shopping Cart' })).toBeInTheDocument();
    expect(router.state.location.pathname).toBe('/cart');
  });
});
