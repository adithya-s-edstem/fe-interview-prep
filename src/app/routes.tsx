import { Navigate, type RouteObject } from 'react-router';
import { PostDetailPage } from '@/features/feed/pages/PostDetailPage';
import { Layout } from './Layout';
import { questionPages } from './questionPages';

export const routes: RouteObject[] = [
  {
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to="/cart" replace /> },
      ...questionPages.map(({ path, Page }) => ({ path, element: <Page /> })),
      { path: '/feed/:postId', element: <PostDetailPage /> },
    ],
  },
];
