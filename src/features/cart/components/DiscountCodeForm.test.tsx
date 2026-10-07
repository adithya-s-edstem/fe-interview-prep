import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { DiscountCodeForm } from './DiscountCodeForm';

describe('DiscountCodeForm', () => {
  it('applies a known code typed in any case and with surrounding spaces', async () => {
    const user = userEvent.setup();
    const onApply = vi.fn();
    render(<DiscountCodeForm appliedCode={null} onApply={onApply} />);

    await user.type(screen.getByRole('textbox', { name: 'Discount code' }), ' save20 ');
    await user.click(screen.getByRole('button', { name: 'Apply' }));

    expect(onApply).toHaveBeenCalledWith('SAVE20');
  });

  it('explains that an unknown code is not valid and does not apply it', async () => {
    const user = userEvent.setup();
    const onApply = vi.fn();
    render(<DiscountCodeForm appliedCode={null} onApply={onApply} />);

    await user.type(screen.getByRole('textbox', { name: 'Discount code' }), 'FREE');
    await user.click(screen.getByRole('button', { name: 'Apply' }));

    expect(await screen.findByText('This discount code is not valid.')).toBeInTheDocument();
    expect(onApply).not.toHaveBeenCalled();
  });

  it('shows which code is applied', () => {
    render(<DiscountCodeForm appliedCode="SAVE10" onApply={vi.fn()} />);

    expect(screen.getByText('SAVE10 applied.')).toBeInTheDocument();
  });
});
