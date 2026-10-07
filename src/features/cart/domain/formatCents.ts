const dollarFormat = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

export function formatCents(cents: number): string {
  return dollarFormat.format(cents / 100);
}
