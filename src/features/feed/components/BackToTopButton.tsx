import styles from './BackToTopButton.module.css';

type BackToTopButtonProps = {
  onClick: () => void;
};

export function BackToTopButton({ onClick }: BackToTopButtonProps) {
  return (
    <button type="button" onClick={onClick} className={styles.button}>
      Back to top
    </button>
  );
}
