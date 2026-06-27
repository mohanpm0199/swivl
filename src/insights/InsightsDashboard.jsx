import { useState } from "react";
import { data } from "./data.js";
import { ToastProvider } from "./ui.jsx";
import SummaryAlert from "./SummaryAlert.jsx";
import FinanceCard from "./FinanceCard.jsx";
import JobsCard from "./JobsCard.jsx";
import CustomersCard from "./CustomersCard.jsx";

export default function InsightsDashboard() {
  // Shared so the summary alert can both scroll to Tom *and* expand his row.
  const [tomOpen, setTomOpen] = useState(false);

  const jump = (id) => {
    if (id === "tom-hendricks") setTomOpen(true);
    // Let the expand render first, then scroll.
    requestAnimationFrame(() =>
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
    );
  };

  return (
    <ToastProvider>
      <div className="min-h-screen bg-[#F3F4F6]">
        <div className="mx-auto max-w-[430px] px-4 py-6">
          <header className="mb-4 px-1">
            <h1 className="text-[20px] font-semibold text-[#111827]">Insights</h1>
            <p className="text-[13px] text-[#6B7280]">{data.month}</p>
          </header>

          <div className="space-y-4">
            <SummaryAlert data={data} onJump={jump} />
            <FinanceCard finance={data.finance} />
            <JobsCard jobs={data.jobs} />
            <CustomersCard
              customers={data.customers}
              tomOpen={tomOpen}
              setTomOpen={setTomOpen}
            />
          </div>
        </div>
      </div>
    </ToastProvider>
  );
}
