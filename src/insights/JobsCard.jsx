import { useState } from "react";
import { AiInsightsBox, Card, InsightLink, InsightModal } from "./ui.jsx";

function FlagRow({ emoji, children }) {
  return (
    <div className="flex w-full items-start gap-2 rounded-lg px-0 py-1.5 text-left text-[14px] text-[#374151]">
      <span className="mt-0.5 text-[15px] leading-none">{emoji}</span>
      <span className="flex-1">{children}</span>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div>
      <div className="text-[12px] font-medium text-slate-500">{label}</div>
      <div className="mt-1 text-2xl font-bold tracking-tight text-slate-900">{value}</div>
    </div>
  );
}

export default function JobsCard({ jobs, aiSummary }) {
  const [modal, setModal] = useState(null);

  return (
    <Card
      id="jobs"
      title="Your Jobs This Month"
      subtitle="Jun 2026"
      aiSummary={aiSummary || "4 completed jobs still need invoicing. Drain cleaning is making you most profit. Inspections are costing you."}
      footer={
        <div className="mt-4 flex justify-end border-t border-slate-100 pt-3">
          <a href="#" onClick={(e) => e.preventDefault()} className="text-[13px] font-medium text-[#0B7B6B]">
            View in Insights →
          </a>
        </div>
      }
    >
      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-4">
          <Stat label="New Jobs" value={jobs.completed} />
          <Stat label="Scheduled" value={43} />
          <Stat label="In Progress" value={jobs.inProgress} />
          <Stat label="Completed" value={jobs.notBilled} />
        </div>
        

        <AiInsightsBox>
          <FlagRow emoji="🟢">
            <span>
              Drain cleaning made you most <InsightLink onClick={() => setModal("mostProfitable")}>profit this month</InsightLink>
            </span>
          </FlagRow>
          <FlagRow emoji="🔴">
            <span>
              Inspections <InsightLink onClick={() => setModal("inspectionLoss")}>lost you money - 3 jobs</InsightLink>
            </span>
          </FlagRow>
        </AiInsightsBox>
      </div>

      <InsightModal
        isOpen={modal === "mostProfitable"}
        onClose={() => setModal(null)}
        title="Your Most Profitable Services"
        items={[
          { icon: "🟢", label: "Drain Cleaning - 12 jobs", value: "$3,840 profit", tone: "green" },
          { icon: "🟢", label: "Plumbing Repair - 8 jobs", value: "$1,680 profit", tone: "green" },
          { icon: "🟢", label: "AC Service - 5 jobs", value: "$900 profit", tone: "green" },
          { divider: true },
        ]}
        footer={{ label: "Best work to do more of: Drain Cleaning", tone: "teal" }}
        buttonLabel="View Full Breakdown in Insights →"
      />

      <InsightModal
        isOpen={modal === "inspectionLoss"}
        onClose={() => setModal(null)}
        title="Inspection Jobs Losing You Money"
        items={[
          { icon: "🔴", label: "Johnson House Inspection", value: "Lost $120", tone: "red" },
          { icon: "🔴", label: "Mike Brown Inspection", value: "Lost $120", tone: "red" },
          { icon: "🔴", label: "Tom H AC Service", value: "Lost $450", tone: "red" },
          { divider: true },
        ]}
        footer={{ label: "Total lost on inspections: $690", tone: "red" }}
        buttonLabel="View Full Breakdown in Insights →"
      />
    </Card>
  );
}
