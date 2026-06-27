import { Card, Trend, StatLabel } from "./ui.jsx";
import * as Icons from "../icons.jsx";

export default function CustomersCard({ data }) {
  return (
    <Card
      title="Customers"
      subtitle="Jun 2026"
      action={
        <button className="rounded-lg bg-teal-700 p-2 text-white hover:bg-teal-800">
          <Icons.Plus className="h-4 w-4" />
        </button>
      }
      footer={
        <div className="mt-4 flex justify-end border-t border-slate-100 pt-3">
          <button className="flex items-center gap-1 text-sm font-medium text-teal-700 hover:text-teal-800">
            View All <Icons.ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
      }
      aiSummary="34 customers came back this month - strong loyalty. But Tom Hendricks costs more than he pays."
    >
      <div className="grid grid-cols-3 gap-4">
        <div>
          <StatLabel>Total New</StatLabel>
          <div className="mt-1 flex items-center gap-2">
            <span className="text-3xl font-bold tracking-tight text-slate-900">
              {data.totalNew}
            </span>
            <Trend change={data.totalNewChange} />
          </div>
        </div>

        <div>
          <StatLabel>Avg. Rating</StatLabel>
          <div className="mt-1 flex items-center gap-1.5">
            <Icons.Star className="h-6 w-6 text-amber-400" filled />
            <span className="text-3xl font-bold tracking-tight text-slate-900">
              {data.avgRating}
            </span>
          </div>
        </div>

        <div>
          <StatLabel>Came Back</StatLabel>
          <div className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
            {data.cameBack ?? data.smsSent}
          </div>
        </div>
      </div>

      <div className="mt-5 space-y-2">
        <button className="flex w-full items-start gap-2 rounded-lg px-0 py-1.5 text-left text-[14px] text-[#374151]">
          <span className="mt-0.5 text-[15px] leading-none">🟢</span>
          <span>Top customer: ABC Plumbing - $12,400 this month</span>
        </button>
        <button className="flex w-full items-start gap-2 rounded-lg px-0 py-1.5 text-left text-[14px] text-[#374151]">
          <span className="mt-0.5 text-[15px] leading-none">🔴</span>
          <span>Tom Hendricks costs more than he pays</span>
        </button>
      </div>
    </Card>
  );
}
