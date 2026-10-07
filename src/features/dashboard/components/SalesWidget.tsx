import styles from './SalesWidget.module.css';
import { formatCents } from './formatCents';

type SalesWidgetProps = {
  salesCents: number;
};

export function SalesWidget({ salesCents }: SalesWidgetProps) {
  return (
    <>
      <p className={styles.figure}>{formatCents(salesCents)}</p>
      <p className={styles.caption}>Total sales today</p>
    </>
  );
}
