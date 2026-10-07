import type { DashboardSnapshot } from './DashboardSnapshot';
import { isNewer } from './isNewer';

export function keepNewerSnapshot(
  current: DashboardSnapshot | undefined,
  incoming: DashboardSnapshot,
): DashboardSnapshot {
  if (current === undefined || isNewer(incoming, current)) {
    return incoming;
  }
  return current;
}
