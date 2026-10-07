import { setupWorker } from 'msw/browser';
import { dashboardHandlers } from '@/features/dashboard/services/dashboardHandlers';

export const worker = setupWorker(...dashboardHandlers);
