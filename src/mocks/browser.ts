import { setupWorker } from 'msw/browser';
import { commentsHandlers } from '@/features/comments/services/commentsHandlers';
import { dashboardHandlers } from '@/features/dashboard/services/dashboardHandlers';

export const worker = setupWorker(...dashboardHandlers, ...commentsHandlers);
