import { useState } from "react";
import {
  Card,
  BlockHeading,
  WinnerBox,
  AlertBox,
  money,
  compactK,
  useToast,
} from "./ui.jsx";

function BasisToggle({ basis, setBasis }) {
  return (
    <div className="flex rounded-lg bg-[#F3F4F6] p-0.5 text-[12px] font-medium">
      {[
        ["billed", "Billed"],
        ["collected", "Collected"],
      ].map(([key, label]) => (
        <button
          key={key}
          onClick={() => setBasis(key)}
          className={`rounded-md px-2.5 py-1 transition ${
            basis === key ? "bg-white text-[#0F766E] shadow-sm" : "text-[#6B7280]"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

/* Where money went — muted, no per-row color. */
function CostBreakdown({ rows }) {
  return (
    <div>
      <BlockHeading>Where money went</BlockHeading>
      <div className="divide-y divide-[#F3F4F6]">
        {rows.map((r) => (
          <div key={r.label} className="py-3">
            <div className="flex items-center justify-between gap-3">
              <span className="text-[15px] text-[#374151]">{r.label}</span>
              <span className="text-[15px] font-semibold text-[#111827]">
                {money(r.amount)}
              </span>
            </div>
            <div className="mt-0.5 text-[13px] text-[#6B7280]">{r.signal}</div>
            {r.advice && <p className="mt-1 text-[13px] text-[#6B7280]">{r.advice}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

/* Best work type — one winner box, the rest muted. */
function ProfitByService({ services }) {
  const winner = services.reduce((a, b) => (b.profit > a.profit ? b : a));
  const rest = services.filter((s) => s !== winner);

  return (
    <div>
      <BlockHeading>Best work type</BlockHeading>
      <WinnerBox
        emoji="🏆"
        headline={`${winner.name} made you the most`}
        sub={`${winner.jobs} jobs · ${money(winner.profit)} profit`}
      />
      <div className="mt-2 divide-y divide-[#F3F4F6]">
        {rest.map((s) => {
          const neg = s.profit < 0;
          return (
            <div key={s.name} className="py-3">
              <div className="flex items-center justify-between gap-3">
                <span className="text-[15px] text-[#374151]">{s.name}</span>
                <span className="flex items-center gap-2 text-[15px]">
                  <span className="font-semibold text-[#111827]">
                    {neg ? "−" : ""}
                    {money(s.profit)}
                  </span>
                  <span className="text-[13px] text-[#6B7280]">{s.jobs} jobs</span>
                </span>
              </div>
              {s.note && <div className="mt-0.5 text-[13px] text-[#6B7280]">{s.note}</div>}
              {s.advice && <p className="mt-1 text-[13px] text-[#6B7280]">{s.advice}</p>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* Uncollected money — the single red item in this card. */
function StuckCash({ stuck }) {
  const notify = useToast();
  return (
    <div>
      <BlockHeading>Uncollected money</BlockHeading>
      <AlertBox tone="bad" id="stuck-cash">
        <div className="text-[22px] font-bold text-[#DC2626]">
          {money(stuck.total)} is sitting uncollected
        </div>
        <div className="mt-3 divide-y divide-[#FECACA]/50">
          {stuck.rows.map((r) => (
            <div key={r.key} className="flex items-center justify-between gap-3 py-2.5">
              <div className="flex items-baseline gap-3">
                <span className="w-28 text-[15px] text-[#374151]">{r.label}</span>
                <span className="text-[15px] font-semibold text-[#111827]">
                  {money(r.amount)}
                </span>
              </div>
              <button
                onClick={() => notify(r.toast)}
                className="shrink-0 rounded-lg bg-white px-3 py-1.5 text-[13px] font-medium text-[#0F766E] shadow-sm transition active:scale-95"
              >
                {r.cta}
              </button>
            </div>
          ))}
        </div>
      </AlertBox>
    </div>
  );
}

export default function FinanceCard({ finance, aiSummary, open, onToggle }) {
  const [basis, setBasis] = useState("billed");
  const collected = basis === "collected";

  const billed = collected ? finance.collected.billed : finance.billed;
  const kept = collected ? finance.collected.kept : finance.kept;
  const keptChange = collected ? finance.collected.keptChange : finance.keptChange;
  const deltaK = Math.round((kept - kept / (1 + keptChange / 100)) / 1000);

  const headline = (
    <div>
      <div className="flex items-start justify-between gap-3">
        <span className="text-[13px] text-[#6B7280]">You kept</span>
        <BasisToggle basis={basis} setBasis={setBasis} />
      </div>
      <div className="mt-1 text-[36px] font-bold leading-tight text-[#111827]">
        {money(kept)}
      </div>
      <div className="mt-1 text-[14px] font-medium text-[#6B7280]">
        ↑ You kept ${deltaK}K more than last month ✅
      </div>
      <p className="mt-1 text-[13px] text-[#6B7280]">
        {collected ? `You collected ${compactK(billed)}.` : `You billed ${compactK(billed)}.`}{" "}
        It cost you {compactK(finance.costs)} to run the business.
      </p>
    </div>
  );

  return (
    <Card
      id="finance"
      title="How did June go?"
      headline={headline}
      aiSummary={aiSummary}
      open={open}
      onToggle={onToggle}
      toggleLabel="Show breakdown"
    >
      <CostBreakdown rows={finance.costBreakdown} />
      <ProfitByService services={finance.profitByService} />
      <StuckCash stuck={finance.stuckCash} />
    </Card>
  );
}
