import type { DashboardSnapshot } from './DashboardSnapshot';

export function isNewer(candidate: DashboardSnapshot, current: DashboardSnapshot): boolean {
  return Date.parse(candidate.generatedAt) > Date.parse(current.generatedAt);
}
