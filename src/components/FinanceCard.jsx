import { Card, StatLabel, money } from "./ui.jsx";

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
  const f = data.accrual;

  return (
    <Card
      title="Finance"
      subtitle="Jun 2026"
      aiSummary="You kept $165K this month, up 18%. But $6,400 is still uncollected and 3 jobs lost you money."
    >
      <div className="grid grid-cols-2 gap-x-6 gap-y-5">
        <Stat label="Money Billed" value={money(f.revenue)} />
        <Stat label="Money Spent" value={money(f.costs)} />
        <Stat label="Money You Kept" value={money(f.netIncome)} />
      </div>

      <div className="mt-5 space-y-2">
        <button className="flex w-full items-start gap-2 rounded-lg px-0 py-1.5 text-left text-[14px] text-[#374151]">
          <span className="mt-0.5 text-[15px] leading-none">🔴</span>
          <span>3 jobs cost more than you charged - lost $690</span>
        </button>
        <button className="flex w-full items-start gap-2 rounded-lg px-0 py-1.5 text-left text-[14px] text-[#374151]">
          <span className="mt-0.5 text-[15px] leading-none">🟡</span>
          <span>$6,400 billed but not collected yet</span>
        </button>
      </div>
    </Card>
  );
}
