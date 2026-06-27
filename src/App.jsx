import { useState } from "react";
import Sidebar from "./components/Sidebar.jsx";
import Topbar from "./components/Topbar.jsx";
import { ToastProvider } from "./insights/ui.jsx";
import { data } from "./insights/data.js";
import AdvisorBriefing from "./insights/AdvisorBriefing.jsx";
import FinanceCard from "./insights/FinanceCard.jsx";
import JobsCard from "./insights/JobsCard.jsx";
import CustomersCard from "./insights/CustomersCard.jsx";

export default function App() {
  const [openCards, setOpenCards] = useState({
    finance: false,
    jobs: false,
    customers: false,
  });
  const [tomOpen, setTomOpen] = useState(false);
  const [custShowAll, setCustShowAll] = useState(false);

  const toggleCard = (k) => setOpenCards((o) => ({ ...o, [k]: !o[k] }));

  // Which card owns each insight id (so "View →" can open + scroll to it).
  const CARD_OF = {
    finance: "finance",
    jobs: "jobs",
    customers: "customers",
    "stuck-cash": "finance",
    "losing-jobs": "jobs",
    "tom-hendricks": "customers",
  };

  // Advisor "View →" tap: open the right card (+ reveal Tom), then scroll to it.
  const jump = (id) => {
    const card = CARD_OF[id] || id;
    setOpenCards((o) => ({ ...o, [card]: true }));
    if (id === "tom-hendricks") {
      setCustShowAll(true);
      setTomOpen(true);
    }
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  };

  return (
    <ToastProvider>
      <div className="flex h-screen overflow-hidden bg-[#F3F4F6] text-[#111827]">
        <Sidebar />

        <div className="flex flex-1 flex-col overflow-hidden">
          <Topbar />

          <main className="flex-1 overflow-y-auto px-6 py-6">
            <div className="mx-auto max-w-screen-2xl">
              <header className="mb-5 px-1">
                <h1 className="text-[20px] font-semibold text-[#111827]">Dashboard</h1>
                <p className="text-[13px] text-[#6B7280]">
                  {data.month} · {data.owner}'s business
                </p>
              </header>

              {/* AI advisor spans the full width at the top. */}
              <div className="mb-6">
                <AdvisorBriefing
                  owner={data.owner}
                  insights={data.ai.briefing}
                  onJump={jump}
                />
              </div>

              {/* Cards arranged side by side below; each grows independently. */}
              <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2 xl:grid-cols-3">
                <FinanceCard
                  finance={data.finance}
                  aiSummary={data.ai.cardSummary.finance}
                  open={openCards.finance}
                  onToggle={() => toggleCard("finance")}
                />
                <JobsCard
                  jobs={data.jobs}
                  aiSummary={data.ai.cardSummary.jobs}
                  open={openCards.jobs}
                  onToggle={() => toggleCard("jobs")}
                />
                <CustomersCard
                  customers={data.customers}
                  aiSummary={data.ai.cardSummary.customers}
                  open={openCards.customers}
                  onToggle={() => toggleCard("customers")}
                  tomOpen={tomOpen}
                  setTomOpen={setTomOpen}
                  showAll={custShowAll}
                  setShowAll={setCustShowAll}
                />
              </div>
            </div>
          </main>
        </div>
      </div>
    </ToastProvider>
  );
}
