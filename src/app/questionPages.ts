import type { ComponentType } from 'react';
import { CartPage } from '@/features/cart/pages/CartPage';
import { CommentsPage } from '@/features/comments/pages/CommentsPage';
import { DashboardPage } from '@/features/dashboard/pages/DashboardPage';
import { FeedPage } from '@/features/feed/pages/FeedPage';
import { KanbanPage } from '@/features/kanban/pages/KanbanPage';

export type QuestionPage = {
  path: string;
  title: string;
  Page: ComponentType;
};

export const questionPages: readonly QuestionPage[] = [
  { path: '/cart', title: 'Shopping Cart', Page: CartPage },
  { path: '/feed', title: 'Infinite Feed', Page: FeedPage },
  { path: '/kanban', title: 'Kanban Board', Page: KanbanPage },
  { path: '/dashboard', title: 'Live Dashboard', Page: DashboardPage },
  { path: '/comments', title: 'Comments with Offline Support', Page: CommentsPage },
];
