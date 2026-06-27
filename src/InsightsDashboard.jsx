import { useState } from "react";

/* ------------------------------------------------------------------ *
 * DUMMY DATA — hardcoded for now. One day this comes from the API.
 * `collected` is added so the Billed | Collected toggle does something
 * real (collected = what has actually landed in the bank).
 * ------------------------------------------------------------------ */
const dashboardData = {
  finance: {
    billed: 238311,
    costs: 73133,
    kept: 165177,
    billedChange: 12,
    costsChange: 4,
    keptChange: 18,
    // What has actually been paid (a bit less than billed).
    collected: 209514,
    collectedKept: 136381,
    collectedChange: 9,
    collectedKeptChange: 14,
    breakdown: [
      { name: "Drain cleaning", amount: 94000, status: "good" },
      { name: "Plumbing repair", amount: 48000, status: "good" },
      { name: "Installations", amount: 23177, status: "warning", note: "Low margin" },
    ],
  },
  jobs: {
    completed: 62,
    completedChange: "up",
    inProgress: 15,
    notInvoiced: 4,
  },
  customers: {
    newCustomers: 79,
    newCustomersChange: 97,
    avgRating: 4.64,
    repeatCustomers: 34,
    repeatChange: "up",
  },
};

/* ------------------------------------------------------------------ *
 * SHARED HELPERS
 * ------------------------------------------------------------------ */
const money = (n) =>
  "$" + n.toLocaleString("en-US", { maximumFractionDigits: 0 });

// Plain-English signal colors. One place to tune the whole language.
const STATUS = {
  good: {
    text: "text-emerald-700",
    soft: "text-emerald-600",
    bg: "bg-emerald-50",
    ring: "ring-emerald-100",
    dot: "bg-emerald-500",
    icon: "✅",
  },
  warning: {
    text: "text-amber-700",
    soft: "text-amber-600",
    bg: "bg-amber-50",
    ring: "ring-amber-200",
    dot: "bg-amber-500",
    icon: "⚠️",
  },
  alert: {
    text: "text-red-700",
    soft: "text-red-600",
    bg: "bg-red-50",
    ring: "ring-red-200",
    dot: "bg-red-500",
    icon: "🔴",
  },
  neutral: {
    text: "text-slate-500",
    soft: "text-slate-500",
    bg: "bg-slate-50",
    ring: "ring-slate-200",
    dot: "bg-slate-400",
    icon: "•",
  },
};

/* A small arrow that knows its own direction + color. */
function TrendArrow({ direction }) {
  if (direction === "same")
    return <span className="leading-none">→</span>;
  return (
    <span className="leading-none">{direction === "down" ? "↓" : "↑"}</span>
  );
}

/* The reusable "context" badge — the heart of the whole feature.
 * Turns a raw number into: direction + comparison + color. */
function Signal({ change, direction, status = "neutral", label }) {
  const s = STATUS[status];
  // Numbers render as "↑ 12% vs last month"; strings (e.g. "up") just arrow.
  const dir =
    direction || (typeof change === "number" ? "up" : "same");
  const pct = typeof change === "number" ? `${Math.abs(change)}% ` : "";

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${s.bg} ${s.text}`}
    >
      <TrendArrow direction={dir} />
      <span>
        {pct}
        {label || "vs last month"}
      </span>
    </span>
  );
}

/* ------------------------------------------------------------------ *
 * CARD SHELL — every section uses this so they stay visually identical
 * and so new P2/P3/P4 blocks can be dropped in via `children`.
 * ------------------------------------------------------------------ */
function Card({ title, subtitle, action, children }) {
  return (
    <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <header className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-base font-bold text-slate-900">{title}</h2>
          {subtitle && (
            <p className="mt-0.5 text-xs text-slate-400">{subtitle}</p>
          )}
        </div>
        {action}
      </header>
      {children}
    </section>
  );
}

/* A single headline metric: plain-English label, big number, signal. */
function Metric({ label, value, signal, note, noteStatus = "good" }) {
  const ns = STATUS[noteStatus];
  return (
    <div className="py-3">
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-sm text-slate-500">{label}</span>
        {signal}
      </div>
      <div className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
        {value}
      </div>
      {note && <p className={`mt-1 text-xs ${ns.soft}`}>{note}</p>}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * SECTION 1 — FINANCE
 * ------------------------------------------------------------------ */
function FinanceCard({ data }) {
  const [basis, setBasis] = useState("billed"); // "billed" | "collected"
  const isBilled = basis === "billed";

  const headline = isBilled ? data.billed : data.collected;
  const headlineChange = isBilled ? data.billedChange : data.collectedChange;
  const kept = isBilled ? data.kept : data.collectedKept;
  const keptChange = isBilled ? data.keptChange : data.collectedKeptChange;

  return (
    <Card
      title="Finance"
      subtitle="How your money looks this month"
    >
      {/* Billed | Collected toggle */}
      <div className="mb-2 inline-flex rounded-lg bg-slate-100 p-1 text-sm font-medium">
        {[
          ["billed", "Billed"],
          ["collected", "Collected"],
        ].map(([key, text]) => (
          <button
            key={key}
            onClick={() => setBasis(key)}
            className={`rounded-md px-3 py-1 transition ${
              basis === key
                ? "bg-white text-teal-700 shadow-sm"
                : "text-slate-500"
            }`}
          >
            {text}
          </button>
        ))}
      </div>
      <p className="mb-3 text-xs text-slate-400">
        {isBilled
          ? "Billed = what you’ve invoiced"
          : "Collected = what’s actually been paid"}
      </p>

      <div className="divide-y divide-slate-100">
        <Metric
          label="Money you billed"
          value={money(headline)}
          signal={<Signal change={headlineChange} status="good" />}
        />
        <Metric
          label="What it cost you"
          value={money(data.costs)}
          signal={<Signal change={data.costsChange} status="good" />}
          note="Costs growing slower than revenue"
        />
        <Metric
          label="What you kept"
          value={money(kept)}
          signal={<Signal change={keptChange} status="good" />}
        />
      </div>

      {/* Mini breakdown by service */}
      <div className="mt-4 border-t border-slate-100 pt-4">
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
          Where it came from
        </h3>
        <ul className="space-y-1">
          {data.breakdown.map((row) => {
            const s = STATUS[row.status];
            return (
              <li
                key={row.name}
                className="flex items-center justify-between rounded-lg px-2 py-2 text-sm"
              >
                <span className="flex items-center gap-2 text-slate-700">
                  <span className={`h-2 w-2 rounded-full ${s.dot}`} />
                  {row.name}
                </span>
                <span className="flex items-center gap-2">
                  {row.note && (
                    <span className={`text-xs ${s.soft}`}>
                      {s.icon} {row.note}
                    </span>
                  )}
                  <span className="font-semibold text-slate-900">
                    {money(row.amount)}
                  </span>
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      {/* P2/P3/P4 finance blocks slot in here, under the same card. */}
    </Card>
  );
}

/* ------------------------------------------------------------------ *
 * SECTION 2 — JOBS
 * ------------------------------------------------------------------ */
function JobsCard({ data }) {
  return (
    <Card title="Jobs" subtitle="Work moving through the door">
      <div className="divide-y divide-slate-100">
        <Metric
          label="Completed"
          value={`${data.completed} jobs`}
          signal={
            <Signal direction="up" status="good" label="vs last month" />
          }
        />
        <Metric
          label="In progress"
          value={`${data.inProgress} jobs`}
          signal={<Signal direction="same" status="neutral" label="ongoing" />}
        />
      </div>

      {/* Needs-attention row — amber so it stands out from the rest. */}
      <div className="mt-3 flex items-center justify-between rounded-xl bg-amber-50 px-4 py-3 ring-1 ring-amber-200">
        <div>
          <div className="flex items-center gap-2 text-sm font-semibold text-amber-800">
            <span>⚠️</span> Not invoiced yet
          </div>
          <p className="mt-0.5 text-xs text-amber-700">
            You haven’t billed these yet
          </p>
        </div>
        <div className="text-2xl font-bold text-amber-800">
          {data.notInvoiced}
        </div>
      </div>

      {/* P2/P3/P4 jobs blocks slot in here. */}
    </Card>
  );
}

/* ------------------------------------------------------------------ *
 * SECTION 3 — CUSTOMERS
 * ------------------------------------------------------------------ */
function CustomersCard({ data }) {
  return (
    <Card title="Customers" subtitle="Who you’re serving">
      <div className="divide-y divide-slate-100">
        <Metric
          label="New customers"
          value={data.newCustomers}
          signal={<Signal change={data.newCustomersChange} status="good" />}
        />
        <Metric
          label="Avg rating"
          value={
            <span className="inline-flex items-center gap-1">
              {data.avgRating.toFixed(2)}
              <span className="text-amber-400">★</span>
            </span>
          }
          signal={
            <Signal
              direction="same"
              status="neutral"
              label="same as last month"
            />
          }
        />
        <Metric
          label="Repeat customers"
          value={data.repeatCustomers}
          signal={
            <Signal direction="up" status="good" label="vs last month" />
          }
          note="Repeat customers cost less to serve — a sign of a healthy business"
        />
      </div>

      {/* P2/P3/P4 customer blocks slot in here. */}
    </Card>
  );
}

/* ------------------------------------------------------------------ *
 * PARENT
 * ------------------------------------------------------------------ */
export default function InsightsDashboard() {
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6">
      <div className="mx-auto max-w-md space-y-4">
        <header className="px-1">
          <h1 className="text-xl font-bold text-slate-900">Insights</h1>
          <p className="text-sm text-slate-400">
            A quick health check on your business
          </p>
        </header>

        <FinanceCard data={dashboardData.finance} />
        <JobsCard data={dashboardData.jobs} />
        <CustomersCard data={dashboardData.customers} />
      </div>
    </div>
  );
}
