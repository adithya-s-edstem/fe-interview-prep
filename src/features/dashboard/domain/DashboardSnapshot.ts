export type ActiveUsersSample = {
  at: string;
  count: number;
};

export type RecentOrder = {
  id: string;
  customer: string;
  totalCents: number;
};

export type DashboardSnapshot = {
  generatedAt: string;
  salesCents: number;
  activeUsers: ActiveUsersSample[];
  recentOrders: RecentOrder[];
};
