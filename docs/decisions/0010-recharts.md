# 0010 Recharts for the active-users chart

- **Status:** accepted
- **Dictated by PDF:** an active-users chart is required; the library is our choice.

## Decision
Recharts `LineChart` for active users, with `isAnimationActive={false}` to keep 5-second updates cheap.

## Why
Declarative React components, small typed API. It draws the chart; polling, pausing, latest-wins and re-render
isolation (the core of Q4) stay in our code.

## Alternatives
- Chart.js via `react-chartjs-2`: imperative canvas, ref juggling.
- Hand-drawn SVG: possible, but time is better spent on the data logic.
- A dashboard kit (e.g. Tremor): does the core work.
