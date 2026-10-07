# 0012 Money as integer cents

- **Status:** accepted
- **Dictated by PDF:** amounts always correct to 2 decimals; 18% tax. Representation is our choice.

## Decision
Convert prices to integer cents at the API boundary. Subtotal = Σ price × quantity; tax =
`Math.round(subtotal * 18 / 100)`; total = subtotal + tax. Format with
`Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })`.

## Why
Integer math avoids floating-point drift; rounding happens once, on tax, so the total always equals the shown subtotal
plus the shown tax.

## Alternatives
- Floats + `toFixed(2)`: display looks right but totals can be off by a cent.
- `dinero.js` / `big.js`: correct, but a dependency for three numbers.
