import { createMemoryRouter, RouterProvider } from 'react-router';
import { routes } from '@/app/routes';
import { renderWithProviders } from './renderWithProviders';

export function renderAppAt(path: string) {
  const router = createMemoryRouter(routes, { initialEntries: [path] });
  renderWithProviders(<RouterProvider router={router} />);
  return router;
}
