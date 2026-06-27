# Swivl · Insights

A mobile-first "business health check" dashboard. Every number comes with
context: a comparison to last month, a plain-English color signal, and a
jargon-free label.

## Run it

You'll need Node.js 18+ (it isn't installed on this machine yet — grab it from
https://nodejs.org or `brew install node`).

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

## Structure

```
src/
  InsightsDashboard.jsx   # parent + FinanceCard / JobsCard / CustomersCard
  main.jsx                # React entry
  index.css               # Tailwind v4 import
```

All three sections share one `<Card>` shell and one `<Signal>` badge, so the
look stays consistent and the upcoming P2–P4 blocks (losing/most-profitable
jobs, where cash is stuck) drop in under each card without touching layout —
see the `{/* P2/P3/P4 ... slot in here */}` markers.

Data is hardcoded in `dashboardData` at the top of `InsightsDashboard.jsx`.
