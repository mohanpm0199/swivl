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
          <StatLabel>SMS Sent</StatLabel>
          <div className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
            {data.smsSent}
          </div>
        </div>
      </div>

      {/* P2/P3/P4 customer blocks slot in here. */}
    </Card>
  );
}
