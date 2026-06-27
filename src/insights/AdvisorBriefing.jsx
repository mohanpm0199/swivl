import { useState } from "react";
import { PriorityPill, AiTag, ActionButton, PRIORITY, useToast } from "./ui.jsx";

const ORDER = { critical: 0, attention: 1, opportunity: 2 };

/* One prioritized insight: badge + headline always visible; the AI "why"
   expands on tap (progressive disclosure); a recommended action + a deep link. */
function InsightRow({ item, onJump }) {
  const [open, setOpen] = useState(false);
  const notify = useToast();
  const s = PRIORITY[item.priority];

  return (
    <div className={`rounded-xl border-l-[3px] ${s.border} ${s.bg} p-3`}>
      <button onClick={() => setOpen((o) => !o)} className="block w-full text-left">
        <PriorityPill p={item.priority} />
        <div className="mt-1.5 text-[15px] font-semibold text-[#111827]">{item.title}</div>
        {open && <p className="mt-1 text-[13px] leading-5 text-[#374151]">{item.why}</p>}
        <span className="mt-1 inline-block text-[12px] font-medium text-[#0F766E]">
          {open ? "Hide" : "Why this matters"}
        </span>
      </button>

      <div className="mt-2 flex items-center gap-3">
        <ActionButton onClick={() => notify(item.actionToast)}>{item.action}</ActionButton>
        <button
          onClick={() => onJump(item.id)}
          className="text-[13px] font-medium text-[#6B7280]"
        >
          View →
        </button>
      </div>
    </div>
  );
}

/*export default function AdvisorBriefing({ owner, insights, onJump }) {
  const sorted = [...insights].sort((a, b) => ORDER[a.priority] - ORDER[b.priority]);

  const n = (p) => insights.filter((i) => i.priority === p).length;
  const parts = [];
  if (n("critical")) parts.push(`${n("critical")} need${n("critical") === 1 ? "s" : ""} fixing now`);
  if (n("attention")) parts.push(`${n("attention")} to watch`);
  if (n("opportunity")) parts.push(`${n("opportunity")} way to grow`);
  const tldr = parts.join(", ") + ".";

  return (
    <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-2">
        <span className="text-xl leading-none">✨</span>
        <h2 className="text-[18px] font-semibold text-[#111827]">Your AI advisor</h2>
        <AiTag />
      </div>
      <p className="mt-1 text-[14px] text-[#374151]">
        Good morning {owner}. Here's what matters today - {tldr}
      </p>

      <div className="mt-4 grid grid-cols-1 items-start gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {sorted.map((i) => (
          <InsightRow key={i.id} item={i} onJump={onJump} />
        ))}
      </div>
    </section>
  );
}*/
