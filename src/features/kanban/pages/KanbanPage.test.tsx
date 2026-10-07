import { render, screen, within } from '@testing-library/react';
import userEvent, { type UserEvent } from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';
import { useBoardStore } from '../hooks/useBoardStore';
import { KanbanPage } from './KanbanPage';

function forgetBoardInMemory() {
  useBoardStore.setState(useBoardStore.getInitialState(), true);
}

async function simulatePageRefresh() {
  const browserStorage = Object.entries<string>(localStorage);
  forgetBoardInMemory();
  browserStorage.forEach(([key, value]) => localStorage.setItem(key, value));
  await useBoardStore.persist.rehydrate();
}

function column(title: string) {
  return screen.getByRole('region', { name: title });
}

function cardTitlesIn(columnTitle: string) {
  return within(column(columnTitle))
    .queryAllByRole('listitem')
    .map((card) => card.getAttribute('aria-label'));
}

async function addCard(user: UserEvent, columnTitle: string, title: string) {
  await user.click(screen.getByRole('button', { name: `Add card to ${columnTitle}` }));
  await user.type(within(column(columnTitle)).getByLabelText('Title'), title);
  await user.click(within(column(columnTitle)).getByRole('button', { name: 'Add' }));
}

async function moveWithKeyboard(user: UserEvent, cardTitle: string, optionLabel: string) {
  screen.getByRole('button', { name: `Move ${cardTitle}` }).focus();
  await user.keyboard('{Enter}');
  const card = screen.getByRole('listitem', { name: cardTitle });
  while (document.activeElement !== within(card).getByRole('button', { name: optionLabel })) {
    await user.tab();
  }
  await user.keyboard('{Enter}');
}

afterEach(forgetBoardInMemory);

describe('KanbanPage', () => {
  it('shows exactly the To do, In progress and Done columns', () => {
    render(<KanbanPage />);

    const headings = screen.getAllByRole('heading', { level: 2 }).map((heading) => heading.textContent);
    expect(headings).toEqual(['To do', 'In progress', 'Done']);
  });

  it('adds a card to the chosen column and updates its count', async () => {
    const user = userEvent.setup();
    render(<KanbanPage />);

    await addCard(user, 'Done', 'Ship it');

    expect(cardTitlesIn('Done')).toEqual(['Ship it']);
    expect(within(column('Done')).getByText('1 card')).toBeInTheDocument();
    expect(cardTitlesIn('To do')).toEqual([]);
  });

  it('edits the title and description of a card in place', async () => {
    const user = userEvent.setup();
    render(<KanbanPage />);
    await addCard(user, 'To do', 'Draft');
    await addCard(user, 'To do', 'Review');

    await user.click(screen.getByRole('button', { name: 'Edit Draft' }));
    await user.clear(screen.getByLabelText('Title'));
    await user.type(screen.getByLabelText('Title'), 'Final draft');
    await user.type(screen.getByLabelText('Description (optional)'), 'Two pages');
    await user.click(screen.getByRole('button', { name: 'Save' }));

    expect(cardTitlesIn('To do')).toEqual(['Final draft', 'Review']);
    expect(screen.getByText('Two pages')).toBeInTheDocument();
  });

  it('removes a deleted card from the board', async () => {
    const user = userEvent.setup();
    render(<KanbanPage />);
    await addCard(user, 'To do', 'Obsolete');

    await user.click(screen.getByRole('button', { name: 'Delete Obsolete' }));

    expect(screen.queryByRole('listitem', { name: 'Obsolete' })).not.toBeInTheDocument();
    expect(within(column('To do')).getByText('0 cards')).toBeInTheDocument();
  });

  it('moves a card to another column with the keyboard and updates both counts', async () => {
    const user = userEvent.setup();
    render(<KanbanPage />);
    await addCard(user, 'To do', 'Plan');
    await addCard(user, 'To do', 'Build');

    await moveWithKeyboard(user, 'Plan', 'Move to Done');

    expect(cardTitlesIn('To do')).toEqual(['Build']);
    expect(cardTitlesIn('Done')).toEqual(['Plan']);
    expect(within(column('To do')).getByText('1 card')).toBeInTheDocument();
    expect(within(column('Done')).getByText('1 card')).toBeInTheDocument();
  });

  it('reorders a card within its column with the keyboard', async () => {
    const user = userEvent.setup();
    render(<KanbanPage />);
    await addCard(user, 'To do', 'First');
    await addCard(user, 'To do', 'Second');

    await moveWithKeyboard(user, 'Second', 'Move up');

    expect(cardTitlesIn('To do')).toEqual(['Second', 'First']);
  });

  it("keeps focus on the moved card's Move button after a move to another column", async () => {
    const user = userEvent.setup();
    render(<KanbanPage />);
    await addCard(user, 'To do', 'Plan');

    await moveWithKeyboard(user, 'Plan', 'Move to Done');

    expect(screen.getByRole('button', { name: 'Move Plan' })).toHaveFocus();
  });

  it("keeps focus on the moved card's Move button after a reorder within its column", async () => {
    const user = userEvent.setup();
    render(<KanbanPage />);
    await addCard(user, 'To do', 'First');
    await addCard(user, 'To do', 'Second');

    await moveWithKeyboard(user, 'Second', 'Move up');

    expect(screen.getByRole('button', { name: 'Move Second' })).toHaveFocus();
  });

  it("focuses the new card's Edit button after adding it", async () => {
    const user = userEvent.setup();
    render(<KanbanPage />);

    await addCard(user, 'In progress', 'Fresh');

    expect(screen.getByRole('button', { name: 'Edit Fresh' })).toHaveFocus();
  });

  it("focuses the card's Edit button after saving it", async () => {
    const user = userEvent.setup();
    render(<KanbanPage />);
    await addCard(user, 'To do', 'Draft');

    await user.click(screen.getByRole('button', { name: 'Edit Draft' }));
    await user.type(screen.getByLabelText('Title'), ' two');
    await user.click(screen.getByRole('button', { name: 'Save' }));

    expect(screen.getByRole('button', { name: 'Edit Draft two' })).toHaveFocus();
  });

  it("focuses the next card's Edit button after deleting a card", async () => {
    const user = userEvent.setup();
    render(<KanbanPage />);
    await addCard(user, 'To do', 'Old');
    await addCard(user, 'To do', 'Next');

    await user.click(screen.getByRole('button', { name: 'Delete Old' }));

    expect(screen.getByRole('button', { name: 'Edit Next' })).toHaveFocus();
  });

  it("focuses the column's Add button after deleting its last card", async () => {
    const user = userEvent.setup();
    render(<KanbanPage />);
    await addCard(user, 'Done', 'Only');

    await user.click(screen.getByRole('button', { name: 'Delete Only' }));

    expect(screen.getByRole('button', { name: 'Add card to Done' })).toHaveFocus();
  });

  it('keeps every card, its column and its order after a page refresh', async () => {
    const user = userEvent.setup();
    const { unmount } = render(<KanbanPage />);
    await addCard(user, 'To do', 'A');
    await addCard(user, 'To do', 'B');
    await addCard(user, 'In progress', 'C');
    await moveWithKeyboard(user, 'B', 'Move up');

    unmount();
    await simulatePageRefresh();
    render(<KanbanPage />);

    expect(cardTitlesIn('To do')).toEqual(['B', 'A']);
    expect(cardTitlesIn('In progress')).toEqual(['C']);
    expect(cardTitlesIn('Done')).toEqual([]);
  });

  it('stops adding or moving cards into In progress once it holds 3 cards', async () => {
    const user = userEvent.setup();
    render(<KanbanPage />);
    for (const title of ['One', 'Two', 'Three']) {
      await addCard(user, 'In progress', title);
    }
    await addCard(user, 'To do', 'Waiting');

    await user.click(screen.getByRole('button', { name: 'Move Waiting' }));

    expect(screen.getByRole('button', { name: 'Add card to In progress' })).toBeDisabled();
    expect(screen.queryByRole('button', { name: 'Move to In progress' })).not.toBeInTheDocument();
    expect(within(column('In progress')).getByText('3 of 3 cards')).toBeInTheDocument();
  });
});
