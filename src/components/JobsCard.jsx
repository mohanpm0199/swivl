import { Card, StatLabel } from "./ui.jsx";
import * as Icons from "../icons.jsx";

function Stat({ label, value }) {
  return (
    <div>
      <StatLabel>{label}</StatLabel>
      <div className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
        {value}
      </div>
    </div>
  );
}

export default function JobsCard({ data }) {
  return (
    <Card
      title="Jobs"
      subtitle="Jun 2026"
      action={
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-50">
            <Icons.ReportIcon className="h-4 w-4" />
            Report
          </button>
          <button className="rounded-lg bg-teal-700 p-2 text-white hover:bg-teal-800">
            <Icons.Plus className="h-4 w-4" />
          </button>
        </div>
      }
      footer={
        <div className="mt-4 flex justify-end border-t border-slate-100 pt-3">
          <button className="flex items-center gap-1 text-sm font-medium text-teal-700 hover:text-teal-800">
            View All <Icons.ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
      }
      aiSummary="4 completed jobs still need invoicing. Drain cleaning is making you most profit. Inspections are costing you."
    >
      <div className="grid grid-cols-3 gap-4">
        <Stat label="New Jobs" value={data.created} />
        <Stat label="In Progress" value={data.open} />
        <Stat label="Completed" value={data.closed} />
      </div>
      <p className="mt-3 text-xs text-slate-400">vs last month</p>

      <div className="mt-5 space-y-2">
        <button className="flex w-full items-start gap-2 rounded-lg px-0 py-1.5 text-left text-[14px] text-[#374151]">
          <span className="mt-0.5 text-[15px] leading-none">🟢</span>
          <span>Drain cleaning made you most profit this month</span>
        </button>
        <button className="flex w-full items-start gap-2 rounded-lg px-0 py-1.5 text-left text-[14px] text-[#374151]">
          <span className="mt-0.5 text-[15px] leading-none">🔴</span>
          <span>Inspections lost you money - 3 jobs</span>
        </button>
      </div>
    </Card>
  );
}
