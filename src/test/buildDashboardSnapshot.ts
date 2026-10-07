import type { DashboardSnapshot } from '@/features/dashboard/domain/DashboardSnapshot';

export function buildDashboardSnapshot(overrides: Partial<DashboardSnapshot> = {}): DashboardSnapshot {
  return {
    generatedAt: '2026-10-07T10:00:00.000Z',
    salesCents: 1_234_56,
    activeUsers: [
      { at: '2026-10-07T09:59:55.000Z', count: 140 },
      { at: '2026-10-07T10:00:00.000Z', count: 152 },
    ],
    recentOrders: [
      { id: '50412', customer: 'Asha Menon', totalCents: 45_90 },
      { id: '50411', customer: 'Liam Carter', totalCents: 12_00 },
    ],
    ...overrides,
  };
}
