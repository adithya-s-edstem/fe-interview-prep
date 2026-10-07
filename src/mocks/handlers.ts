import { cartHandlers } from '@/features/cart/services/mocks';
import { dashboardHandlers } from '@/features/dashboard/services/dashboardHandlers';
import { feedHandlers } from '@/features/feed/services/mocks';

export const handlers = [...cartHandlers, ...feedHandlers, ...dashboardHandlers];
