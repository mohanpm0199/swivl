import { useState } from "react";
import Sidebar from "./components/Sidebar.jsx";
import Topbar from "./components/Topbar.jsx";
import { ToastProvider } from "./insights/ui.jsx";
import { data } from "./insights/data.js";
import FinanceCard from "./insights/FinanceCard.jsx";
import JobsCard from "./insights/JobsCard.jsx";
import CustomersCard from "./insights/CustomersCard.jsx";
import InsightsPage from "./insights/InsightsPage.jsx";

export default function App() {
  const [page, setPage] = useState("dashboard");
  const [insightsTarget, setInsightsTarget] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
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

  const handleOpenInsights = (target) => {
    setInsightsTarget(target);
    setPage("insights");
  };

  const handleBackToDashboard = () => {
    setPage("dashboard");
    setInsightsTarget(null);
  };

  return (
    <ToastProvider>
      <div className="flex h-screen overflow-hidden bg-[#F3F4F6] text-[#111827]">
        <Sidebar activeView={page} onNavigate={(view) => { setPage(view); setInsightsTarget(null); }} collapsed={sidebarCollapsed} onToggleCollapsed={() => setSidebarCollapsed((value) => !value)} />

        <div className="flex flex-1 flex-col overflow-hidden">
          <Topbar />

          {page === "insights" ? (
            <InsightsPage onBack={handleBackToDashboard} initialTarget={insightsTarget} />
          ) : (
            <main className="flex-1 overflow-y-auto px-6 py-6">
              <div className="mx-auto max-w-screen-2xl">
                <header className="mb-5 px-1">
                  <h1 className="text-[20px] font-semibold text-[#111827]">Dashboard</h1>
                  <p className="text-[13px] text-[#6B7280]">
                    {data.month} · {data.owner}'s business
                  </p>
                </header>

                {/* Cards arranged side by side below; each grows independently. */}
                <div className="flex flex-wrap items-stretch gap-6">
                  <div className="w-full lg:w-[calc(33.333%-1rem)]">
                    <FinanceCard
                      finance={data.finance}
                      aiSummary={data.ai.cardSummary.finance}
                      open={openCards.finance}
                      onToggle={() => toggleCard("finance")}
                      onOpenInsights={handleOpenInsights}
                    />
                  </div>
                  <div className="w-full lg:w-[calc(33.333%-1rem)]">
                    <JobsCard
                      jobs={data.jobs}
                      aiSummary={data.ai.cardSummary.jobs}
                      open={openCards.jobs}
                      onToggle={() => toggleCard("jobs")}
                      onOpenInsights={handleOpenInsights}
                    />
                  </div>
                  <div className="w-full lg:w-[calc(33.333%-1rem)]">
                    <CustomersCard
                      customers={data.customers}
                      aiSummary={data.ai.cardSummary.customers}
                      open={openCards.customers}
                      onToggle={() => toggleCard("customers")}
                      tomOpen={tomOpen}
                      setTomOpen={setTomOpen}
                      showAll={custShowAll}
                      setShowAll={setCustShowAll}
                      onOpenInsights={handleOpenInsights}
                    />
                  </div>
                </div>

                <div className="mt-8 space-y-8">
                  <section>
                  <div className="mb-4 px-1">
                    <h2 className="text-[16px] font-semibold text-[#111827]">Leads</h2>
                  </div>
                  <div className="grid gap-6 xl:grid-cols-2">
                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                      <div className="flex items-center justify-between">
                        <h3 className="text-[18px] font-semibold text-[#111827]">Leads by Source · Jun 2026</h3>
                        <span className="text-[12px] font-medium text-[#6B7280]">Live</span>
                      </div>
                      <div className="mt-6 flex flex-col items-center gap-5 lg:flex-row lg:items-center">
                        <div
                          className="flex h-44 w-44 items-center justify-center rounded-full"
                          style={{ background: "conic-gradient(#F59E0B 0 20%, #1E3A8A 20% 35%, #0B7B6B 35% 60%, #3B82F6 60% 80%, #60A5FA 80% 100%)" }}
                        >
                          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white text-center">
                            <div>
                              <div className="text-[22px] font-semibold text-[#111827]">32</div>
                              <div className="text-[11px] uppercase tracking-[0.2em] text-[#6B7280]">Leads</div>
                            </div>
                          </div>
                        </div>
                        <div className="w-full">
                          <div className="space-y-2 text-[13px] text-[#374151]">
                            <div className="flex items-center justify-between"><span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-[#F59E0B]" />AI Receptionist</span><span>20</span></div>
                            <div className="flex items-center justify-between"><span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-[#1E3A8A]" />Chatbot</span><span>5</span></div>
                            <div className="flex items-center justify-between"><span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-[#0B7B6B]" />Direct</span><span>4</span></div>
                            <div className="flex items-center justify-between"><span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-[#3B82F6]" />Instant Quote</span><span>2</span></div>
                            <div className="flex items-center justify-between"><span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-[#60A5FA]" />Scheduler</span><span>1</span></div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-6 flex items-center justify-between gap-3 rounded-xl border border-emerald-100 bg-emerald-50 px-3 py-2">
                        <div>
                          <div className="text-[13px] font-semibold text-[#111827]">Total Leads Received</div>
                          <div className="text-[24px] font-semibold text-[#111827]">32</div>
                        </div>
                        <span className="rounded-full bg-emerald-600 px-2.5 py-1 text-[12px] font-semibold text-white">↑ 11 more than last month</span>
                      </div>
                      <div className="mt-4 rounded-lg border border-[#E0D9FF] bg-[#F5F3FF] p-3">
                        <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7C5CFC]">✨ AI Insights</div>
                        <div className="space-y-1.5 text-[14px] text-[#374151]">
                          <div className="flex items-start gap-2"><span className="mt-0.5 text-[15px] leading-none">🟢</span><span>AI Receptionist is your top lead source - 20 leads</span></div>
                          <div className="flex items-start gap-2"><span className="mt-0.5 text-[15px] leading-none">🔴</span><span>Only 37% of leads converted - follow up may be missing</span></div>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                      <div className="flex items-center justify-between">
                        <h3 className="text-[18px] font-semibold text-[#111827]">AI Receptionist · Jun 2026</h3>
                        <span className="text-[12px] font-medium text-[#6B7280]">Live</span>
                      </div>
                      <div className="mt-6 grid gap-4 sm:grid-cols-3">
                        <div>
                          <div className="text-[12px] font-medium text-slate-500">Calls Handled</div>
                          <div className="mt-1 text-2xl font-bold tracking-tight text-slate-900">20</div>
                        </div>
                        <div>
                          <div className="text-[12px] font-medium text-slate-500">Avg Call Duration</div>
                          <div className="mt-1 text-2xl font-bold tracking-tight text-slate-900">2m 15s</div>
                        </div>
                        <div>
                          <div className="text-[12px] font-medium text-slate-500">Successfully Transferred</div>
                          <div className="mt-1 text-2xl font-bold tracking-tight text-slate-900">14</div>
                        </div>
                      </div>
                      <div className="mt-4 rounded-lg border border-[#E0D9FF] bg-[#F5F3FF] p-3">
                        <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7C5CFC]">✨ AI Insights</div>
                        <div className="space-y-1.5 text-[14px] text-[#374151]">
                          <div className="flex items-start gap-2"><span className="mt-0.5 text-[15px] leading-none">🔴</span><span>4 missed calls in last 7 days - possible lost business</span></div>
                          <div className="flex items-start gap-2"><span className="mt-0.5 text-[15px] leading-none">🟡</span><span>6 calls were not transferred - review AI routing</span></div>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end">
                        <a href="#" onClick={(e) => e.preventDefault()} className="text-[13px] font-medium text-[#0B7B6B]">View All →</a>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h2 className="text-[18px] font-semibold text-[#111827]">Money Waiting to be Collected · Jun 2026</h2>
                    <div className="flex rounded-full border border-slate-200 bg-slate-50 p-1 text-[13px] font-medium text-[#6B7280]">
                      <button className="rounded-full bg-[#0B7B6B] px-3 py-1.5 text-white">Invoices</button>
                      <button className="rounded-full px-3 py-1.5">Estimates</button>
                    </div>
                  </div>
                  <div className="mt-6 overflow-hidden rounded-xl border border-slate-200">
                    <table className="min-w-full divide-y divide-slate-200 text-left text-[14px]">
                      <thead className="bg-slate-50 text-slate-600">
                        <tr>
                          <th className="px-4 py-3 font-semibold">Customer Name</th>
                          <th className="px-4 py-3 font-semibold">Amount</th>
                          <th className="px-4 py-3 font-semibold">Days Pending</th>
                          <th className="px-4 py-3 font-semibold">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 bg-white">
                        <tr>
                          <td className="px-4 py-3">sanity</td>
                          <td className="px-4 py-3">$123.34</td>
                          <td className="px-4 py-3">26 days</td>
                          <td className="px-4 py-3"><div className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-red-500" /> <button className="rounded-lg border border-slate-200 px-3 py-1.5 text-[12px] font-medium text-[#0B7B6B]">Send Reminder</button></div></td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3">Johnson HVAC</td>
                          <td className="px-4 py-3">$340.00</td>
                          <td className="px-4 py-3">12 days</td>
                          <td className="px-4 py-3"><div className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-amber-400" /> <button className="rounded-lg border border-slate-200 px-3 py-1.5 text-[12px] font-medium text-[#0B7B6B]">Send Reminder</button></div></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4 rounded-lg border border-[#E0D9FF] bg-[#F5F3FF] p-3">
                    <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7C5CFC]">✨ AI Insights</div>
                    <div className="space-y-1.5 text-[14px] text-[#374151]">
                      <div className="flex items-start gap-2"><span className="mt-0.5 text-[15px] leading-none">🔴</span><span>$463 overdue - 1 invoice pending over 30 days</span></div>
                      <div className="flex items-start gap-2"><span className="mt-0.5 text-[15px] leading-none">🟡</span><span>Send reminders now to collect faster</span></div>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <a href="#" onClick={(e) => e.preventDefault()} className="text-[13px] font-medium text-[#0B7B6B]">View All →</a>
                  </div>
                </section>

                <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h2 className="text-[18px] font-semibold text-[#111827]">Realtime Tracking</h2>
                    <div className="flex flex-wrap items-center gap-2">
                      <div className="flex rounded-full border border-slate-200 bg-slate-50 p-1 text-[13px] font-medium text-[#6B7280]">
                        <button className="rounded-full bg-[#0B7B6B] px-3 py-1.5 text-white">Tasks</button>
                        <button className="rounded-full px-3 py-1.5">Technicians & Suppliers</button>
                      </div>
                      <div className="flex rounded-full border border-slate-200 bg-slate-50 p-1 text-[13px] font-medium text-[#6B7280]">
                        <button className="rounded-full bg-[#0B7B6B] px-3 py-1.5 text-white">Today</button>
                        <button className="rounded-full px-3 py-1.5">Tomorrow</button>
                      </div>
                      <div className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[13px] font-medium text-[#6B7280]">All Tasks</div>
                    </div>
                  </div>
                  <div className="mt-6 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
                    <div className="rounded-2xl border border-slate-200 bg-[#F9FAFB] p-8 text-center">
                      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#E6F7F4] text-[#0B7B6B]">
                        <span className="text-[24px]">📋</span>
                      </div>
                      <p className="text-[15px] text-slate-600">No jobs scheduled today. Tap + to assign work to your team.</p>
                      <button className="mt-5 rounded-xl bg-[#0B7B6B] px-4 py-2.5 text-[14px] font-semibold text-white">+ Create</button>
                    </div>
                    <div className="rounded-2xl bg-[#0F172A] p-6 text-white">
                      <div className="flex h-full flex-col justify-between rounded-2xl border border-slate-700 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.12),_transparent_30%),linear-gradient(135deg,_#111827_0%,_#111827_100%)] p-5">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-[14px] font-semibold">Live map</div>
                            <div className="text-[12px] text-slate-400">Technicians in motion</div>
                          </div>
                          <div className="rounded-full bg-slate-800 px-3 py-1 text-[12px] text-slate-300">Online</div>
                        </div>
                        <div className="mt-6 flex-1 rounded-2xl border border-slate-700 bg-[#0F172A] p-4">
                          <div className="relative h-48 rounded-2xl bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.25),_transparent_55%),linear-gradient(135deg,_rgba(255,255,255,0.06),_rgba(255,255,255,0.02))]">
                            <div className="absolute inset-6 rounded-full border border-slate-600" />
                            <div className="absolute left-[22%] top-[25%] h-16 w-16 rounded-full border border-slate-600" />
                            <div className="absolute right-[20%] top-[30%] h-20 w-20 rounded-full border border-slate-600" />
                            <div className="absolute left-[35%] top-[45%] h-12 w-12 rounded-full border border-slate-600" />
                            <div className="absolute left-[40%] top-[20%] h-2 w-20 rounded-full bg-slate-600" />
                            <div className="absolute left-[52%] top-[58%] h-2 w-24 rounded-full bg-slate-600" />
                            <div className="absolute left-[28%] top-[62%] h-2 w-16 rounded-full bg-slate-600" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <section>
                  <div className="mb-4 px-1">
                    <h2 className="text-[16px] font-semibold text-[#111827]">Setup</h2>
                  </div>
                  <div className="grid gap-6 lg:grid-cols-3">
                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                      <div className="flex items-center justify-between">
                        <h3 className="text-[18px] font-semibold text-[#111827]">Top Service Areas · Jun 2026</h3>
                        <button className="rounded-full border border-slate-200 p-2 text-[#0B7B6B]">+</button>
                      </div>
                      <div className="mt-10 flex min-h-[120px] items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50">
                        <button className="rounded-full border border-slate-200 bg-white p-3 text-[#0B7B6B] shadow-sm">+</button>
                      </div>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                      <div className="flex items-center justify-between">
                        <h3 className="text-[18px] font-semibold text-[#111827]">Top Tags · Jun 2026</h3>
                        <button className="rounded-full border border-slate-200 p-2 text-[#0B7B6B]">+</button>
                      </div>
                      <div className="mt-10 flex min-h-[120px] items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50">
                        <button className="rounded-full border border-slate-200 bg-white p-3 text-[#0B7B6B] shadow-sm">+</button>
                      </div>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                      <div className="flex items-center justify-between">
                        <h3 className="text-[18px] font-semibold text-[#111827]">Asset Distribution · Jun 2026</h3>
                        <button className="rounded-full border border-slate-200 p-2 text-[#0B7B6B]">+</button>
                      </div>
                      <div className="mt-10 flex min-h-[120px] items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50">
                        <button className="rounded-full border border-slate-200 bg-white p-3 text-[#0B7B6B] shadow-sm">+</button>
                      </div>
                    </div>
                  </div>
                </section>
                </div>
              </div>
            </main>
          )}
        </div>
      </div>
    </ToastProvider>
  );
}
