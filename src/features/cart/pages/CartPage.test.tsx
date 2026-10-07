import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { renderWithProviders } from '@/test/renderWithProviders';
import { CartPage } from './CartPage';

async function productCard(title: string) {
  return within(await screen.findByRole('article', { name: title }));
}

function cart() {
  return within(screen.getByRole('region', { name: 'Cart' }));
}

function cartTotals() {
  return Object.fromEntries(
    cart()
      .getAllByRole('term')
      .map((term) => [term.textContent, term.nextElementSibling?.textContent]),
  );
}

async function addToCart(title: string) {
  const card = await productCard(title);
  await userEvent.click(card.getByRole('button', { name: 'Add to cart' }));
}

describe('CartPage', () => {
  it('shows the name, price, image and stock of each product from the API', async () => {
    renderWithProviders(<CartPage />);

    const mascara = await productCard('Mascara');

    expect(mascara.getByRole('heading', { name: 'Mascara' })).toBeInTheDocument();
    expect(mascara.getByText('$9.99')).toBeInTheDocument();
    const image = mascara.getByRole('img', { name: 'Mascara' });
    expect(image).toHaveAttribute('src', 'https://cdn.example.test/mascara.png');
    expect(mascara.getByText('99 in stock')).toBeInTheDocument();
  });

  it('shows an empty-cart message instead of totals when nothing is in the cart', async () => {
    renderWithProviders(<CartPage />);
    await productCard('Mascara');

    expect(cart().getByText('Your cart is empty.')).toBeInTheDocument();
    expect(cart().queryByText('Total')).not.toBeInTheDocument();
  });

  it('puts an added product in the cart with quantity 1', async () => {
    renderWithProviders(<CartPage />);

    await addToCart('Mascara');

    expect(cart().getByRole('listitem', { name: 'Mascara' })).toHaveTextContent('Quantity 1');
  });

  it('increases the quantity when the same product is added again', async () => {
    renderWithProviders(<CartPage />);

    await addToCart('Mascara');
    await addToCart('Mascara');

    expect(cart().getByRole('listitem', { name: 'Mascara' })).toHaveTextContent('Quantity 2');
  });

  it('shows subtotal, 18% tax and total to two decimals without floating-point artefacts', async () => {
    renderWithProviders(<CartPage />);

    await addToCart('Lip Balm');
    await addToCart('Hand Cream');

    expect(cartTotals()).toEqual({ Subtotal: '$0.30', 'Tax (18%)': '$0.05', Total: '$0.35' });
  });

  it('updates every total as soon as a quantity changes', async () => {
    const user = userEvent.setup();
    renderWithProviders(<CartPage />);
    await addToCart('Mascara');

    await user.click(cart().getByRole('button', { name: 'Increase quantity of Mascara' }));

    expect(cart().getByRole('listitem', { name: 'Mascara' })).toHaveTextContent('Quantity 2');
    expect(cartTotals()).toEqual({ Subtotal: '$19.98', 'Tax (18%)': '$3.60', Total: '$23.58' });
  });

  it('lowers the quantity of an item', async () => {
    const user = userEvent.setup();
    renderWithProviders(<CartPage />);
    await addToCart('Mascara');
    await addToCart('Mascara');

    await user.click(cart().getByRole('button', { name: 'Decrease quantity of Mascara' }));

    expect(cart().getByRole('listitem', { name: 'Mascara' })).toHaveTextContent('Quantity 1');
  });

  it('stops the quantity from going above the stock', async () => {
    const user = userEvent.setup();
    renderWithProviders(<CartPage />);
    await addToCart('Hand Cream');

    const increase = cart().getByRole('button', { name: 'Increase quantity of Hand Cream' });
    await user.click(increase);

    expect(increase).toBeDisabled();
    expect(cart().getByRole('listitem', { name: 'Hand Cream' })).toHaveTextContent('Quantity 2');
  });

  it('takes a removed item out of the cart and out of the totals', async () => {
    const user = userEvent.setup();
    renderWithProviders(<CartPage />);
    await addToCart('Lip Balm');
    await addToCart('Mascara');

    await user.click(cart().getByRole('button', { name: 'Remove Mascara' }));

    expect(cart().queryByRole('listitem', { name: 'Mascara' })).not.toBeInTheDocument();
    expect(cartTotals()).toEqual({ Subtotal: '$0.10', 'Tax (18%)': '$0.02', Total: '$0.12' });
  });

  it('shows the empty-cart message after the last item is removed', async () => {
    const user = userEvent.setup();
    renderWithProviders(<CartPage />);
    await addToCart('Mascara');

    await user.click(cart().getByRole('button', { name: 'Remove Mascara' }));

    expect(cart().getByText('Your cart is empty.')).toBeInTheDocument();
  });

  it('keeps the cart contents and quantities after the page is reloaded', async () => {
    const firstVisit = renderWithProviders(<CartPage />);
    await addToCart('Mascara');
    await addToCart('Mascara');
    await addToCart('Lip Balm');
    firstVisit.unmount();

    renderWithProviders(<CartPage />);

    expect(cart().getByRole('listitem', { name: 'Mascara' })).toHaveTextContent('Quantity 2');
    expect(cart().getByRole('listitem', { name: 'Lip Balm' })).toHaveTextContent('Quantity 1');
  });

  it('applies a valid discount code to the subtotal, tax and total', async () => {
    const user = userEvent.setup();
    renderWithProviders(<CartPage />);
    await addToCart('Mascara');

    await user.type(cart().getByRole('textbox', { name: 'Discount code' }), 'SAVE10');
    await user.click(cart().getByRole('button', { name: 'Apply' }));

    expect(cartTotals()).toEqual({
      'Discount (SAVE10)': '-$1.00',
      Subtotal: '$8.99',
      'Tax (18%)': '$1.62',
      Total: '$10.61',
    });
  });
});
