import { widgetIds, type WidgetId } from '../domain/widgetIds';
import styles from './WidgetToggles.module.css';
import { widgetTitles } from './widgetTitles';

type WidgetTogglesProps = {
  hidden: WidgetId[];
  onToggle: (widgetId: WidgetId) => void;
};

export function WidgetToggles({ hidden, onToggle }: WidgetTogglesProps) {
  return (
    <fieldset className={styles.toggles}>
      <legend>Show widgets</legend>
      {widgetIds.map((widgetId) => (
        <label key={widgetId} className={styles.toggle}>
          <input type="checkbox" checked={!hidden.includes(widgetId)} onChange={() => onToggle(widgetId)} />
          {widgetTitles[widgetId]}
        </label>
      ))}
    </fieldset>
  );
}
