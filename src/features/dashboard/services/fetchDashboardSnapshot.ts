import type { DashboardSnapshot } from '../domain/DashboardSnapshot';
import { dashboardSnapshotSchema } from './dashboardSnapshotSchema';
import { dashboardUrl } from './dashboardUrl';

export async function fetchDashboardSnapshot(signal: AbortSignal): Promise<DashboardSnapshot> {
  const response = await fetch(dashboardUrl, { signal });
  return dashboardSnapshotSchema.parse(await response.json());
}
