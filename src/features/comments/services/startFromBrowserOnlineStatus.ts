import { onlineManager } from '@tanstack/react-query';

export function startFromBrowserOnlineStatus(): void {
  onlineManager.setOnline(navigator.onLine);
}
