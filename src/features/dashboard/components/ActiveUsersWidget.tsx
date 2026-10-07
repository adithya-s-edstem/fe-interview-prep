import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import type { ActiveUsersSample } from '../domain/DashboardSnapshot';
import styles from './ActiveUsersWidget.module.css';

type ActiveUsersWidgetProps = {
  samples: ActiveUsersSample[];
};

const chartHeightPx = 180;

const timeFormat = new Intl.DateTimeFormat('en-US', { timeStyle: 'medium' });

function formatSampleTime(at: string): string {
  return timeFormat.format(new Date(at));
}

export function ActiveUsersWidget({ samples }: ActiveUsersWidgetProps) {
  const latestCount = samples.at(-1)?.count;
  const chartPoints = samples.map(({ at, count }) => ({ time: formatSampleTime(at), count }));
  return (
    <figure className={styles.figure} aria-label="Active users over the last minute">
      <figcaption className={styles.caption}>{latestCount} active now</figcaption>
      <LineChart data={chartPoints} responsive style={{ width: '100%', height: chartHeightPx }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" minTickGap={24} />
        <YAxis width={40} />
        <Tooltip />
        <Line dataKey="count" name="Active users" stroke="var(--color-accent)" isAnimationActive={false} />
      </LineChart>
    </figure>
  );
}
