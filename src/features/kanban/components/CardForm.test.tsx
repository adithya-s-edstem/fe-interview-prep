import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { CardForm } from './CardForm';

function renderCardForm() {
  const onSubmit = vi.fn();
  render(<CardForm submitLabel="Add" onSubmit={onSubmit} onCancel={vi.fn()} />);
  return onSubmit;
}

describe('CardForm', () => {
  it('does not save a card whose title is only whitespace', async () => {
    const user = userEvent.setup();
    const onSubmit = renderCardForm();

    await user.type(screen.getByLabelText('Title'), '   ');
    await user.click(screen.getByRole('button', { name: 'Add' }));

    expect(await screen.findByRole('alert')).toHaveTextContent('Enter a title');
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('saves a card with a trimmed title and an empty description', async () => {
    const user = userEvent.setup();
    const onSubmit = renderCardForm();

    await user.type(screen.getByLabelText('Title'), '  Write tests  ');
    await user.click(screen.getByRole('button', { name: 'Add' }));

    expect(onSubmit).toHaveBeenCalledWith({ title: 'Write tests', description: '' }, expect.anything());
  });
});
