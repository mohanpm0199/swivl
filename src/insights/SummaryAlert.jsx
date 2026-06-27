import { money } from "./ui.jsx";

/* Top-of-screen triage. Only renders lines for problems that actually exist,
   max 3, each tappable to scroll (and act) on the relevant section. */
export default function SummaryAlert({ data, onJump }) {
  const lines = [];

  const stuck = data.finance.stuckCash.total;
  if (stuck > 0)
    lines.push({
      icon: "🔴",
      text: `${money(stuck)} of your money is uncollected`,
      target: "stuck-cash",
    });

  const losing = data.jobs.losingJobs.length;
  if (losing > 0)
    lines.push({
      icon: "🔴",
      text: `${losing} jobs lost you money this month`,
      target: "losing-jobs",
    });

  const badCustomer = data.customers.profitList.find((c) => c.status === "bad");
  if (badCustomer)
    lines.push({
      icon: "⚠️",
      text: `${badCustomer.name} is costing you money`,
      target: "tom-hendricks",
    });

  if (lines.length === 0) return null;

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="flex items-start gap-2">
        <span className="text-xl leading-none">👋</span>
        <p className="text-[15px] font-semibold text-[#111827]">
          Morning {data.owner}, here's what needs your attention today
        </p>
      </div>

      <div className="mt-4 space-y-2">
        {lines.slice(0, 3).map((l) => (
          <button
            key={l.target}
            onClick={() => onJump(l.target)}
            className="flex w-full items-center gap-2 rounded-lg px-1 py-1.5 text-left text-[15px] text-[#374151] transition active:bg-[#F3F4F6]"
          >
            <span>{l.icon}</span>
            <span>{l.text}</span>
          </button>
        ))}
      </div>

      <p className="mt-3 text-[13px] text-[#6B7280]">Tap any line to fix it</p>
    </div>
  );
}
