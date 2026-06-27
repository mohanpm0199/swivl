import { useState } from "react";
import { AiInsightsBox, Card, InsightLink, InsightModal, money } from "./ui.jsx";

function FlagRow({ emoji, children }) {
  return (
    <div className="flex w-full items-start gap-2 rounded-lg px-0 py-1.5 text-left text-[14px] text-[#374151]">
      <span className="mt-0.5 text-[15px] leading-none">{emoji}</span>
      <span className="flex-1">{children}</span>
    </div>
  );
}

export default function FinanceCard({ finance, aiSummary, onOpenInsights }) {
  const [modal, setModal] = useState(null);

  return (
    <Card
      id="finance"
      title="Your Money This Month"
      subtitle="Jun 2026"
      aiSummary={aiSummary || "You kept $165K this month, up 18%. But $6,400 is still uncollected and 3 jobs lost you money."}
    >
      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <div className="text-[12px] font-medium text-slate-500">Money Billed</div>
            <div className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
              {money(finance.billed)}
            </div>
          </div>
          <div>
            <div className="text-[12px] font-medium text-slate-500">Money Spent</div>
            <div className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
              {money(finance.costs)}
            </div>
          </div>
          <div>
            <div className="text-[12px] font-medium text-slate-500">Money You Kept</div>
            <div className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
              {money(finance.kept)}
            </div>
          </div>
        </div>

        <AiInsightsBox>
          <FlagRow emoji="🔴">
            <span>
              <InsightLink onClick={() => setModal("lostMoney")}>3 jobs</InsightLink> cost more than you charged - <InsightLink onClick={() => setModal("lostMoney")}>lost $690</InsightLink>
            </span>
          </FlagRow>
          <FlagRow emoji="🟡">
            <span>
              <InsightLink onClick={() => setModal("uncollected")}>$6,400 billed</InsightLink> but not collected yet
            </span>
          </FlagRow>
        </AiInsightsBox>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => onOpenInsights?.({ section: "cost", filter: "Loss Only" })}
            className="text-[13px] font-medium text-[#0B7B6B]"
          >
            View in Insights →
          </button>
        </div>
      </div>

      <InsightModal
        isOpen={modal === "lostMoney"}
        onClose={() => setModal(null)}
        title="Jobs That Lost You Money"
        items={[
          { icon: "🔴", label: "Johnson House Inspection", value: "Lost $120", tone: "red" },
          { icon: "🔴", label: "Mike Brown Inspection", value: "Lost $120", tone: "red" },
          { icon: "🔴", label: "Tom H AC Service", value: "Lost $450", tone: "red" },
          { divider: true },
        ]}
        footer={{ label: "Total lost this month: $690", tone: "red" }}
        buttonLabel="View Full Breakdown in Insights →"
        onPrimaryAction={() => onOpenInsights?.({ section: "cost", filter: "Loss Only" })}
      />

      <InsightModal
        isOpen={modal === "uncollected"}
        onClose={() => setModal(null)}
        title="Money Not Yet Collected"
        items={[
          { icon: "🔴", label: "Johnson HVAC - 26 days overdue", value: "$340", tone: "red" },
          { icon: "🟡", label: "ABC Drain - 18 days pending", value: "$2,100", tone: "warning" },
          { icon: "🟡", label: "Mike Brown - 10 days pending", value: "$1,800", tone: "warning" },
          { icon: "🔴", label: "3 jobs not invoiced yet", value: "est. $2,160", tone: "red" },
          { divider: true },
        ]}
        footer={{ label: "Total uncollected: $6,400", tone: "red" }}
        buttonLabel="View Full Breakdown in Insights →"
        onPrimaryAction={() => onOpenInsights?.({ section: "collections", tab: "overdue" })}
      />
    </Card>
  );
}
