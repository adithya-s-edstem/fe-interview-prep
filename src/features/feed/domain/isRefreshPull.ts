export const REFRESH_PULL_DISTANCE = 80;

export function isRefreshPull(pullDistance: number): boolean {
  return pullDistance >= REFRESH_PULL_DISTANCE;
}
