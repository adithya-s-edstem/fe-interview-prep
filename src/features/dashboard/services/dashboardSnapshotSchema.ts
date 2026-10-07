import { z } from 'zod';
import type { DashboardSnapshot } from '../domain/DashboardSnapshot';

export const dashboardSnapshotSchema = z.object({
  generatedAt: z.iso.datetime(),
  salesCents: z.number().int(),
  activeUsers: z.array(z.object({ at: z.iso.datetime(), count: z.number().int() })),
  recentOrders: z.array(z.object({ id: z.string(), customer: z.string(), totalCents: z.number().int() })),
}) satisfies z.ZodType<DashboardSnapshot>;
