import { Card, Trend, StatLabel } from "./ui.jsx";
import * as Icons from "../icons.jsx";

function Stat({ label, value, change }) {
  return (
    <div>
      <StatLabel>{label}</StatLabel>
      <div className="mt-1 flex items-center gap-2">
        <span className="text-3xl font-bold tracking-tight text-slate-900">
          {value}
        </span>
        <Trend change={change} />
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
    >
      <div className="grid grid-cols-3 gap-4">
        <Stat label="Created" value={data.created} change={data.createdChange} />
        <Stat label="Open" value={data.open} />
        <Stat label="Closed" value={data.closed} />
      </div>
      <p className="mt-3 text-xs text-slate-400">to previous month</p>

      {/* P2/P3/P4 jobs blocks slot in here. */}
    </Card>
  );
}
