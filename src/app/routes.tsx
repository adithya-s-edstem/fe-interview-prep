import { Navigate, type RouteObject } from 'react-router';
import { Layout } from './Layout';
import { questionPages } from './questionPages';

export const routes: RouteObject[] = [
  {
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to="/cart" replace /> },
      ...questionPages.map(({ path, Page }) => ({ path, element: <Page /> })),
    ],
  },
];
