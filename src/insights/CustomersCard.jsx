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

export default function CustomersCard({ customers, aiSummary }) {
  const [modal, setModal] = useState(null);

  return (
    <Card
      id="customers"
      title="Your Customers This Month"
      subtitle="Jun 2026"
      aiSummary={aiSummary || "34 customers came back this month - strong loyalty. But Tom Hendricks costs more than he pays."}
      footer={
        <div className="mt-4 flex justify-end border-t border-slate-100 pt-3">
          <a href="#" onClick={(e) => e.preventDefault()} className="text-[13px] font-medium text-[#0B7B6B]">
            View in Insights →
          </a>
        </div>
      }
    >
      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <div className="text-[12px] font-medium text-slate-500">Total New</div>
            <div className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
              {customers.newThisMonth}
            </div>
          </div>
          <div>
            <div className="text-[12px] font-medium text-slate-500">Avg. Rating</div>
            <div className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
              {customers.avgRating}★
            </div>
          </div>
          <div>
            <div className="text-[12px] font-medium text-slate-500">Came Back</div>
            <div className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
              {customers.cameBack ?? customers.repeatCustomers}
            </div>
          </div>
        </div>

        <AiInsightsBox>
          <FlagRow emoji="🟢">
            <span>
              Top customer: <InsightLink onClick={() => setModal("abcPlumbing")}>ABC Plumbing - $12,400</InsightLink> this month
            </span>
          </FlagRow>
          <FlagRow emoji="🔴">
            <span>
              Tom Hendricks <InsightLink onClick={() => setModal("tomReview")}>costs more</InsightLink> than he pays
            </span>
          </FlagRow>
        </AiInsightsBox>
      </div>

      <InsightModal
        isOpen={modal === "abcPlumbing"}
        onClose={() => setModal(null)}
        title="ABC Plumbing - Top Customer"
        items={[
          { icon: "🟢", label: "8 jobs completed this month" },
          { icon: "🟢", label: "Total billed", value: "$12,400", tone: "green" },
          { icon: "🟢", label: "Avg profit per job", value: "$890", tone: "green" },
          { icon: "⭐", label: "Customer rating", value: "5★" },
          { divider: true },
        ]}
        footer={{ label: "Your most valuable customer this month", tone: "teal" }}
        buttonLabel="View Full Breakdown in Insights →"
      />

      <InsightModal
        isOpen={modal === "tomReview"}
        onClose={() => setModal(null)}
        title="Tom Hendricks - Account Review"
        items={[
          { icon: "🔴", label: "3 jobs completed this month" },
          { icon: "🔴", label: "Total billed", value: "$1,200", tone: "red" },
          { icon: "🔴", label: "Total cost incurred", value: "$1,890", tone: "red" },
          { icon: "🔴", label: "Net loss on this account", value: "$690", tone: "red" },
          { divider: true },
        ]}
        footer={{ label: "This account is costing you money", tone: "red" }}
        buttonLabel="View Full Breakdown in Insights →"
      />
    </Card>
  );
}
