import type { RecentOrder } from '../domain/DashboardSnapshot';
import styles from './RecentOrdersWidget.module.css';
import { formatCents } from './formatCents';

type RecentOrdersWidgetProps = {
  orders: RecentOrder[];
};

export function RecentOrdersWidget({ orders }: RecentOrdersWidgetProps) {
  return (
    <ul className={styles.orders} aria-label="Latest orders">
      {orders.map((order) => (
        <li key={order.id} className={styles.order}>
          <span>
            #{order.id} {order.customer}
          </span>
          <span className={styles.total}>{formatCents(order.totalCents)}</span>
        </li>
      ))}
    </ul>
  );
}
