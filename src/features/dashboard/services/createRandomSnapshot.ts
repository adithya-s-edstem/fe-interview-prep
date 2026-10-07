import type { ActiveUsersSample, DashboardSnapshot, RecentOrder } from '../domain/DashboardSnapshot';

const customers = ['Asha Menon', 'Liam Carter', 'Mei Tanaka', 'Omar Haddad', 'Sofia Rossi', 'Kwame Mensah'];
const activeUsersSampleCount = 12;
const activeUsersSampleSpacingMs = 5_000;
const recentOrderCount = 5;

function randomInteger(min: number, max: number): number {
  return min + Math.floor(Math.random() * (max - min + 1));
}

function randomCustomer(): string {
  return customers[randomInteger(0, customers.length - 1)] ?? 'Guest';
}

function randomActiveUsers(now: Date): ActiveUsersSample[] {
  return Array.from({ length: activeUsersSampleCount }, (_, index) => ({
    at: new Date(now.getTime() - (activeUsersSampleCount - 1 - index) * activeUsersSampleSpacingMs).toISOString(),
    count: randomInteger(80, 220),
  }));
}

function randomRecentOrders(): RecentOrder[] {
  const newestOrderNumber = randomInteger(10_000, 99_999);
  return Array.from({ length: recentOrderCount }, (_, index) => ({
    id: String(newestOrderNumber - index),
    customer: randomCustomer(),
    totalCents: randomInteger(5_00, 400_00),
  }));
}

export function createRandomSnapshot(now: Date): DashboardSnapshot {
  return {
    generatedAt: now.toISOString(),
    salesCents: randomInteger(10_000_00, 50_000_00),
    activeUsers: randomActiveUsers(now),
    recentOrders: randomRecentOrders(),
  };
}
