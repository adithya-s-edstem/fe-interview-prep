import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useId } from 'react';
import { useForm } from 'react-hook-form';
import { cardInputSchema, type CardInput } from '../domain/cardInputSchema';
import styles from './CardForm.module.css';

const blankCard: CardInput = { title: '', description: '' };

type CardFormProps = {
  initialValues?: CardInput;
  submitLabel: string;
  onSubmit: (input: CardInput) => void;
  onCancel: () => void;
};

export function CardForm({ initialValues = blankCard, submitLabel, onSubmit, onCancel }: CardFormProps) {
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm<CardInput>({ resolver: zodResolver(cardInputSchema), defaultValues: initialValues });
  const titleId = useId();
  const titleErrorId = useId();
  const descriptionId = useId();

  useEffect(() => setFocus('title'), [setFocus]);

  return (
    <form className={styles.form} noValidate onSubmit={(event) => void handleSubmit(onSubmit)(event)}>
      <label htmlFor={titleId}>Title</label>
      <input
        id={titleId}
        className={styles.field}
        aria-invalid={errors.title !== undefined}
        aria-describedby={errors.title ? titleErrorId : undefined}
        {...register('title')}
      />
      {errors.title && (
        <p id={titleErrorId} role="alert" className={styles.error}>
          {errors.title.message}
        </p>
      )}
      <label htmlFor={descriptionId}>Description (optional)</label>
      <textarea id={descriptionId} className={styles.field} rows={2} {...register('description')} />
      <div className={styles.buttons}>
        <button type="submit">{submitLabel}</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}
