import { createCommentsHandlers } from './createCommentsHandlers';
import { unreliableNetwork } from './unreliableNetwork';

export const commentsHandlers = createCommentsHandlers(unreliableNetwork);
