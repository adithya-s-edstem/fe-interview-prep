import type { CartTotals } from '../domain/CartTotals';
import { formatCents } from '../domain/formatCents';
import styles from './CartSummary.module.css';

type CartSummaryProps = {
  totals: CartTotals;
  discountCode: string | null;
};

export function CartSummary({ totals, discountCode }: CartSummaryProps) {
  return (
    <dl className={styles.summary}>
      {discountCode !== null && (
        <>
          <dt>Discount ({discountCode})</dt>
          <dd>{formatCents(-totals.discountCents)}</dd>
        </>
      )}
      <dt>Subtotal</dt>
      <dd>{formatCents(totals.subtotalCents)}</dd>
      <dt>Tax (18%)</dt>
      <dd>{formatCents(totals.taxCents)}</dd>
      <dt className={styles.total}>Total</dt>
      <dd className={styles.total}>{formatCents(totals.totalCents)}</dd>
    </dl>
  );
}
