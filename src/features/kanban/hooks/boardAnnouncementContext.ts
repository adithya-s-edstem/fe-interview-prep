import { createContext } from 'react';

export const boardAnnouncementContext = createContext<(message: string) => void>(() => undefined);
