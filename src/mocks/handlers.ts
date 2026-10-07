import { cartHandlers } from '@/features/cart/services/mocks';
import { feedHandlers } from '@/features/feed/services/mocks';

export const handlers = [...cartHandlers, ...feedHandlers];
