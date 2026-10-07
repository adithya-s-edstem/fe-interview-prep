import { useEffect, useId } from 'react';
import { useForm } from 'react-hook-form';
import styles from './CommentTextForm.module.css';

type CommentTextFormProps = {
  label: string;
  submitLabel: string;
  defaultText?: string;
  focusOnOpen?: boolean;
  onSubmit: (text: string) => void;
  onCancel?: () => void;
};

type CommentTextFields = { text: string };

export function CommentTextForm({
  label,
  submitLabel,
  defaultText = '',
  focusOnOpen = false,
  onSubmit,
  onCancel,
}: CommentTextFormProps) {
  const fieldId = useId();
  const { register, handleSubmit, reset, setFocus } = useForm<CommentTextFields>({
    defaultValues: { text: defaultText },
  });
  useEffect(() => {
    if (focusOnOpen) setFocus('text');
  }, [focusOnOpen, setFocus]);
  const submitText = handleSubmit(({ text }) => {
    onSubmit(text);
    reset();
  });

  return (
    <form className={styles.form} onSubmit={(event) => void submitText(event)}>
      <label htmlFor={fieldId}>{label}</label>
      <textarea id={fieldId} className={styles.field} rows={3} {...register('text', { required: true })} />
      <div className={styles.actions}>
        <button type="submit">{submitLabel}</button>
        {onCancel && (
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
