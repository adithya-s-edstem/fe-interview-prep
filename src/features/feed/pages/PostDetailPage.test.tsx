import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { renderAppAt } from '@/test/renderAppAt';

describe('PostDetailPage', () => {
  it('shows the full post for the id in the address', async () => {
    renderAppAt('/feed/7');

    expect(await screen.findByRole('heading', { level: 1, name: 'Post 7' })).toBeInTheDocument();
    expect(screen.getByText('Body of post 7')).toBeInTheDocument();
    expect(screen.getByText('70 views')).toBeInTheDocument();
  });

  it('links back to the feed', async () => {
    renderAppAt('/feed/7');

    expect(await screen.findByRole('link', { name: 'Back to feed' })).toHaveAttribute('href', '/feed');
  });
});
