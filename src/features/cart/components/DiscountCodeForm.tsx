import { zodResolver } from '@hookform/resolvers/zod';
import { useId } from 'react';
import { useForm } from 'react-hook-form';
import { discountCodeFormSchema } from './discountCodeFormSchema';
import styles from './DiscountCodeForm.module.css';

type DiscountCodeFormProps = {
  appliedCode: string | null;
  onApply: (code: string) => void;
};

export function DiscountCodeForm({ appliedCode, onApply }: DiscountCodeFormProps) {
  const inputId = useId();
  const hintId = useId();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(discountCodeFormSchema), defaultValues: { code: '' } });

  return (
    <form className={styles.form} onSubmit={(event) => void handleSubmit(({ code }) => onApply(code))(event)}>
      <label htmlFor={inputId}>Discount code</label>
      <div className={styles.controls}>
        <input id={inputId} type="text" aria-describedby={hintId} {...register('code')} />
        <button type="submit">Apply</button>
      </div>
      <p id={hintId} className={styles.hint}>
        {errors.code?.message ?? (appliedCode === null ? 'Try SAVE10 or SAVE20.' : `${appliedCode} applied.`)}
      </p>
    </form>
  );
}
