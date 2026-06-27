import { useState } from "react";
import { Card, StatLabel, money } from "./ui.jsx";

/* Tiny CSS bar chart — revenue (blue) vs costs (amber). No chart library. */
function MiniBars({ series }) {
  const max = Math.max(...series.flatMap((d) => [d.revenue, d.costs]), 1);
  return (
    <div className="mt-4">
      <div className="flex h-24 items-end gap-3 border-b border-slate-100 pb-1">
        {series.map((d) => (
          <div key={d.day} className="flex flex-1 items-end justify-center gap-0.5">
            <div
              className="w-2 rounded-t bg-blue-500"
              style={{ height: `${(d.revenue / max) * 100}%` }}
            />
            <div
              className="w-2 rounded-t bg-amber-400"
              style={{ height: `${(d.costs / max) * 100}%` }}
            />
          </div>
        ))}
      </div>
      <div className="mt-2 flex items-center justify-between">
        <span className="text-[11px] text-slate-300">All times UTC</span>
        <div className="flex items-center gap-3 text-[11px] text-slate-500">
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-sm bg-blue-500" /> Revenue
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-sm bg-amber-400" /> Costs
          </span>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div>
      <StatLabel>{label}</StatLabel>
      <div className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
        {value}
      </div>
    </div>
  );
}

export default function FinanceCard({ data }) {
  const [basis, setBasis] = useState("accrual"); // "accrual" | "cash"
  const f = data[basis];

  return (
    <Card title="Finance" subtitle="Jun 2026">
      {/* Revenue basis toggle */}
      <div className="mb-5 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          Revenue Basis
        </span>
        <div className="flex rounded-lg bg-slate-100 p-1 text-sm font-medium">
          {[
            ["accrual", "Accrual"],
            ["cash", "Cash"],
          ].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setBasis(key)}
              className={`rounded-md px-3 py-1 transition ${
                basis === key
                  ? "bg-teal-700 text-white shadow-sm"
                  : "text-slate-500"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-6 gap-y-5">
        <Stat
          label={basis === "accrual" ? "Accrual Revenue" : "Cash Revenue"}
          value={money(f.revenue)}
        />
        <Stat label="Total Costs" value={money(f.costs)} />
        <Stat label="Net Income" value={money(f.netIncome)} />
        <Stat label="Net Margin" value={`${f.netMargin}%`} />
      </div>

      <MiniBars series={data.series} />

      {/* P2/P3/P4 finance blocks slot in here, under the same card. */}
    </Card>
  );
}
