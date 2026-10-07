import { cartHandlers } from '@/features/cart/services/mocks';
import { commentsHandlers } from '@/features/comments/services/commentsHandlers';
import { dashboardHandlers } from '@/features/dashboard/services/dashboardHandlers';
import { feedHandlers } from '@/features/feed/services/mocks';

export const handlers = [...cartHandlers, ...feedHandlers, ...dashboardHandlers, ...commentsHandlers];
