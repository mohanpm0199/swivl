import * as Icons from "../icons.jsx";

export const money = (n) =>
  "$ " + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/* Card shell - every metric section shares this so they stay identical and
   future P2–P4 blocks drop in via `children`/`footer` without layout churn. */
export function Card({ title, subtitle, action, children, footer, className = "", aiSummary }) {
  return (
    <section
      className={`flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm ${className}`}
    >
      <header className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-slate-900">{title}</h2>
          {subtitle && <p className="text-xs text-slate-400">{subtitle}</p>}
        </div>
        {action}
      </header>
      <div className="flex-1">{children}</div>
      {aiSummary && (
        <div className="mt-5 rounded-lg border-l-[3px] border-[#0B7B6B] bg-[#F0FAF8] p-3">
          <div className="text-[12px] font-semibold uppercase tracking-wide text-[#0B7B6B]">
            ✨ AI Summary
          </div>
          <p className="mt-1 text-sm leading-5 text-slate-700">{aiSummary}</p>
          <div className="mt-2 flex justify-end">
            <a href="#" onClick={(e) => e.preventDefault()} className="text-[12px] font-medium text-[#0B7B6B]">
              View in Insights →
            </a>
          </div>
        </div>
      )}
      {footer}
    </section>
  );
}

/* The context badge - turns a % into direction + color (green up / red down). */
export function Trend({ change }) {
  if (change == null) return null;
  const down = change < 0;
  return (
    <span
      className={`inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-xs font-semibold ${
        down ? "bg-red-50 text-red-500" : "bg-emerald-50 text-emerald-600"
      }`}
    >
      {down ? (
        <Icons.ArrowUpRight className="h-3 w-3 rotate-90" />
      ) : (
        <Icons.ArrowUpRight className="h-3 w-3" />
      )}
      {Math.abs(change)}%
    </span>
  );
}

/* Small label with an info dot, used above each stat. */
export function StatLabel({ children }) {
  return (
    <div className="flex items-center gap-1 text-sm text-slate-500">
      {children}
      <Icons.Info className="h-3.5 w-3.5 text-slate-300" />
    </div>
  );
}
