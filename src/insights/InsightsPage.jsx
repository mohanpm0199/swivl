import { useEffect, useMemo, useRef, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const costIntelligenceData = [
  {
    job: "Drain Cleaning",
    customer: "Johnson Ave",
    quotedRepair: 200,
    quotedLabour: 300,
    quotedMaterial: 100,
    quotedFuel: 50,
    actualRepair: 180,
    actualLabour: 250,
    actualMaterial: 90,
    actualFuel: 40,
    quotedTotal: 650,
    actualTotal: 560,
  },
  {
    job: "Plumbing Repair",
    customer: "Mike St",
    quotedRepair: 300,
    quotedLabour: 200,
    quotedMaterial: 80,
    quotedFuel: 40,
    actualRepair: 280,
    actualLabour: 180,
    actualMaterial: 70,
    actualFuel: 30,
    quotedTotal: 620,
    actualTotal: 560,
  },
  {
    job: "AC Service",
    customer: "Brown House",
    quotedRepair: 250,
    quotedLabour: 150,
    quotedMaterial: 60,
    quotedFuel: 30,
    actualRepair: 230,
    actualLabour: 140,
    actualMaterial: 55,
    actualFuel: 25,
    quotedTotal: 490,
    actualTotal: 450,
  },
  {
    job: "Johnson House Inspection",
    customer: "Johnson",
    quotedRepair: 100,
    quotedLabour: 150,
    quotedMaterial: 30,
    quotedFuel: 20,
    actualRepair: 100,
    actualLabour: 280,
    actualMaterial: 30,
    actualFuel: 10,
    quotedTotal: 300,
    actualTotal: 420,
  },
  {
    job: "Mike Brown Inspection",
    customer: "Mike Brown",
    quotedRepair: 100,
    quotedLabour: 120,
    quotedMaterial: 20,
    quotedFuel: 10,
    actualRepair: 100,
    actualLabour: 230,
    actualMaterial: 30,
    actualFuel: 10,
    quotedTotal: 250,
    actualTotal: 370,
  },
  {
    job: "Tom H AC Service",
    customer: "Tom H",
    quotedRepair: 150,
    quotedLabour: 200,
    quotedMaterial: 30,
    quotedFuel: 20,
    actualRepair: 150,
    actualLabour: 400,
    actualMaterial: 250,
    actualFuel: 50,
    quotedTotal: 400,
    actualTotal: 850,
  },
];

const serviceData = [
  { name: "Drain Cleaning", jobs: 12, amount: 3840, positive: true, avg: 320 },
  { name: "Plumbing Repair", jobs: 8, amount: 1680, positive: true, avg: 210 },
  { name: "AC Service", jobs: 5, amount: 900, positive: true, avg: 180 },
  { name: "Electrical", jobs: 3, amount: 240, positive: true, avg: 80 },
  { name: "Inspections", jobs: 8, amount: -690, positive: false, avg: -86 },
];

const customerData = [
  { name: "ABC Plumbing", revenue: 12400, profit: 7120, jobs: 8, profitable: true, label: "ABC Plumbing ⭐" },
  { name: "Johnson HVAC", revenue: 4200, profit: 2100, jobs: 5, profitable: true, label: "" },
  { name: "Mike Brown", revenue: 2800, profit: 1200, jobs: 4, profitable: true, label: "" },
  { name: "Sarah Connor", revenue: 1800, profit: 600, jobs: 3, profitable: true, label: "" },
  { name: "Tom Hendricks", revenue: 1200, profit: -690, jobs: 3, profitable: false, label: "Tom Hendricks 🔴" },
];

function SectionHeader({ eyebrow, title, subtitle, right }) {
  return (
    <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
      <div>
        <div className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#7C5CFC]">{eyebrow}</div>
        <h2 className="mt-1 text-[20px] font-semibold text-[#111827]">{title}</h2>
        <p className="mt-1 text-[14px] text-[#6B7280]">{subtitle}</p>
      </div>
      {right}
    </div>
  );
}

function AiSummaryBox({ title = "✨ AI", text, actions }) {
  return (
    <div className="rounded-lg border-l-[3px] border-[#7C5CFC] bg-[#F5F3FF] p-4">
      <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7C5CFC]">{title}</div>
      <p className="mt-2 text-[14px] leading-6 text-[#374151]">{text}</p>
      {actions && <div className="mt-4 flex flex-wrap gap-3">{actions}</div>}
    </div>
  );
}

function ActionButton({ children, className = "" }) {
  return (
    <button className={`cursor-pointer rounded-lg bg-[#0B7B6B] px-3.5 py-2 text-[13px] font-semibold text-white ${className}`}>
      {children}
    </button>
  );
}

function Pill({ active, children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`cursor-pointer rounded-full px-3.5 py-2 text-[13px] font-medium ${active ? "bg-[#0B7B6B] text-white" : "bg-white text-[#6B7280] shadow-sm"}`}
    >
      {children}
    </button>
  );
}

function CostTooltip({ data, position }) {
  if (!data) return null;
  const quotedTotal = data.quotedRepair + data.quotedLabour + data.quotedMaterial + data.quotedFuel;
  const actualTotal = data.actualRepair + data.actualLabour + data.actualMaterial + data.actualFuel;
  const delta = actualTotal - quotedTotal;
  const format = (value) => `$${value}`;
  const biggestCategory = [
    { label: "Labour", overrun: data.actualLabour - data.quotedLabour },
    { label: "Material", overrun: data.actualMaterial - data.quotedMaterial },
    { label: "Repair", overrun: data.actualRepair - data.quotedRepair },
    { label: "Fuel", overrun: data.actualFuel - data.quotedFuel },
  ].sort((a, b) => b.overrun - a.overrun)[0];
  const isLoss = delta > 0;

  return (
    <div className="pointer-events-none fixed z-[9999] min-w-[260px] rounded-[12px] border border-slate-200 bg-white p-4 shadow-[0_4px_20px_rgba(0,0,0,0.15)]" style={{ left: position.left, top: position.top }}>
      <div className="text-[14px] font-semibold text-[#111827]">{data.job}</div>
      <div className="text-[12px] text-[#6B7280]">{data.customer}</div>
      <div className="mt-3 border-t border-slate-200" />

      <div className="mt-3 overflow-hidden rounded-lg border border-slate-200">
        <div className="grid grid-cols-[1.1fr_0.8fr_0.8fr] bg-[#F9FAFB] px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6B7280]">
          <div>CATEGORY</div>
          <div>QUOTED</div>
          <div>ACTUAL</div>
        </div>
        {[
          ["Repair", data.quotedRepair, data.actualRepair, "#0B7B6B"],
          ["Labour", data.quotedLabour, data.actualLabour, "#3B82F6"],
          ["Material", data.quotedMaterial, data.actualMaterial, "#7C5CFC"],
          ["Fuel", data.quotedFuel, data.actualFuel, "#F59E0B"],
        ].map(([label, quoted, actual, dot]) => (
          <div key={label} className="grid grid-cols-[1.1fr_0.8fr_0.8fr] border-t border-slate-100 px-3 py-2 text-[12px] text-[#374151]">
            <div className="flex items-center gap-2"><span className="text-[10px]" style={{ color: dot }}>●</span>{label}</div>
            <div>{format(quoted)}</div>
            <div>{format(actual)}</div>
          </div>
        ))}
        <div className="grid grid-cols-[1.1fr_0.8fr_0.8fr] border-t border-slate-200 bg-white px-3 py-2 text-[12px] font-semibold text-[#111827]">
          <div>Total</div>
          <div>{format(quotedTotal)}</div>
          <div>{format(actualTotal)}</div>
        </div>
      </div>

      <div className={`mt-3 rounded-[6px] px-[10px] py-[6px] ${isLoss ? "bg-[#FEF2F2]" : "bg-[#F0FDF4]"}`}>
        <div className={`text-[15px] font-extrabold ${isLoss ? "text-[#DC2626]" : "text-[#059669]"}`}>
          {isLoss ? `🔴 You lost $${Math.abs(delta)}` : `🟢 You made $${Math.abs(delta)}`}
        </div>
      </div>
      {isLoss ? (
        <div className="mt-2 text-[11px] italic text-[#6B7280]">Main reason: {biggestCategory.label} went ${Math.abs(biggestCategory.overrun)} over budget</div>
      ) : null}
    </div>
  );
}

function CustomAxisTick({ x, y, payload }) {
  const delta = payload?.payload?.quotedTotal - payload?.payload?.actualTotal;
  const isProfit = delta >= 0;
  const chipText = `${isProfit ? "+" : "-"}$${Math.abs(delta)}`;
  const chipFill = isProfit ? "#DCFCE7" : "#FEE2E2";
  const chipTextColor = isProfit ? "#059669" : "#DC2626";

  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} textAnchor="middle" fill="#6B7280" fontSize="12">
        <tspan x="0" dy="0">{payload.value}</tspan>
      </text>
      <rect x={-24} y={20} width={48} height={18} rx={10} fill={chipFill} />
      <text x={0} y={32} textAnchor="middle" fontSize="11" fontWeight="700" fill={chipTextColor}>
        {chipText}
      </text>
    </g>
  );
}

function CostIntelligenceChart({ data }) {
  const [tooltipPosition, setTooltipPosition] = useState({ left: 16, top: 16 });
  const [activeTooltip, setActiveTooltip] = useState(null);
  const chartWrapperRef = useRef(null);

  const updateTooltipPosition = (event) => {
    const viewportWidth = typeof window !== "undefined" ? window.innerWidth : 1280;
    const viewportHeight = typeof window !== "undefined" ? window.innerHeight : 720;
    const tooltipWidth = 260;
    const tooltipHeight = 320;
    const left = event.clientX < viewportWidth / 2 ? Math.min(event.clientX + 20, viewportWidth - tooltipWidth - 16) : Math.max(event.clientX - tooltipWidth - 20, 16);
    const top = event.clientY < viewportHeight / 2 ? Math.min(event.clientY + 20, viewportHeight - tooltipHeight - 16) : Math.max(event.clientY - tooltipHeight - 20, 16);
    setTooltipPosition({ left, top });
  };

  const handleMouseMove = (event) => {
    updateTooltipPosition(event);
    if (event?.activePayload?.length) {
      setActiveTooltip(event.activePayload[0].payload);
    }
  };

  const handleMouseLeave = () => {
    setActiveTooltip(null);
  };

  return (
    <div
      ref={chartWrapperRef}
      className="relative overflow-x-auto overflow-y-hidden pb-3"
      style={{ width: "100%", scrollbarWidth: "thin", WebkitOverflowScrolling: "touch", scrollBehavior: "smooth" }}
      onWheel={(e) => { if (e.deltaY !== 0) e.currentTarget.scrollLeft += e.deltaY; }}
      onTouchMove={(e) => {
        if (e.touches.length === 1) {
          const touch = e.touches[0];
          const target = e.currentTarget;
          target.scrollLeft -= touch.clientX - (target.dataset.lastTouchX || touch.clientX);
          target.dataset.lastTouchX = touch.clientX;
        }
      }}
      onTouchStart={(e) => {
        if (e.touches.length === 1) {
          e.currentTarget.dataset.lastTouchX = e.touches[0].clientX;
        }
      }}
    >
      <ResponsiveContainer width={Math.max(900, data.length * 140)} height={320}>
        <BarChart data={data} margin={{ top: 24, right: 16, left: 16, bottom: 44 }} barGap={8} barCategoryGap={24} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
          <CartesianGrid stroke="#F3F4F6" vertical={false} />
          <XAxis dataKey="job" tick={<CustomAxisTick />} axisLine={false} tickLine={false} height={54} />
          <YAxis tick={{ fontSize: 12, fill: "#6B7280" }} axisLine={false} tickLine={false} />
          <Tooltip cursor={false} content={({ active, payload }) => {
            if (!active || !payload?.length) return null;
            return <CostTooltip data={payload[0].payload} position={tooltipPosition} />;
          }} />
          <Bar dataKey="quotedRepair" stackId="quoted" fill="#0B7B6B" barSize={55} />
          <Bar dataKey="quotedLabour" stackId="quoted" fill="#3B82F6" barSize={55} />
          <Bar dataKey="quotedMaterial" stackId="quoted" fill="#7C5CFC" barSize={55} />
          <Bar dataKey="quotedFuel" stackId="quoted" fill="#F59E0B" barSize={55} />
          <Bar dataKey="actualRepair" stackId="actual" fill="#7BC5B8" barSize={55} />
          <Bar dataKey="actualLabour" stackId="actual" fill="#93C5FD" barSize={55} />
          <Bar dataKey="actualMaterial" stackId="actual" fill="#C4B5FD" barSize={55} />
          <Bar dataKey="actualFuel" stackId="actual" fill="#FCD34D" barSize={55} />
        </BarChart>
      </ResponsiveContainer>
      {activeTooltip ? <CostTooltip data={activeTooltip} position={tooltipPosition} /> : null}
    </div>
  );
}

function InsightsPage({ onBack, initialTarget }) {
  const [isLoading, setIsLoading] = useState(true);
  const [costFilter, setCostFilter] = useState("All Jobs");
  const [serviceFilter, setServiceFilter] = useState("All");
  const [collectionsTab, setCollectionsTab] = useState("uninvoiced");
  const [customerFilter, setCustomerFilter] = useState("All Customers");
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [summaryHovered, setSummaryHovered] = useState(false);

  const costRef = useRef(null);
  const serviceRef = useRef(null);
  const collectionsRef = useRef(null);
  const customerRef = useRef(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 1500);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading && initialTarget) {
      const target = initialTarget;
      if (target.section === "cost") {
        setCostFilter(target.filter || "Loss Only");
      }
      if (target.section === "service") {
        setServiceFilter(target.filter || "Profitable");
      }
      if (target.section === "collections") {
        setCollectionsTab(target.tab || "overdue");
      }
      if (target.section === "customer") {
        setCustomerFilter(target.filter || "Tom Hendricks");
      }
      window.setTimeout(() => {
        if (target.section === "cost") costRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        if (target.section === "service") serviceRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        if (target.section === "collections") collectionsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        if (target.section === "customer") customerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 120);
    }
  }, [isLoading, initialTarget]);

  const scrollToSection = (id) => {
    const refs = { cost: costRef, service: serviceRef, collections: collectionsRef, customer: customerRef };
    refs[id]?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const visibleCostData = useMemo(() => {
    if (costFilter === "Loss Only") {
      return costIntelligenceData.filter((job) => job.actualTotal > job.quotedTotal);
    }
    return costIntelligenceData;
  }, [costFilter]);
  const visibleServiceData = useMemo(() => {
    if (serviceFilter === "Profitable") return serviceData.filter((item) => item.positive);
    if (serviceFilter === "Loss Making") return serviceData.filter((item) => !item.positive);
    return serviceData;
  }, [serviceFilter]);

  const visibleCustomerData = useMemo(() => {
    if (customerFilter === "Profitable") return customerData.filter((item) => item.profitable);
    if (customerFilter === "Loss Making") return customerData.filter((item) => !item.profitable);
    if (customerFilter === "ABC Plumbing") return customerData.filter((item) => item.name === "ABC Plumbing");
    if (customerFilter === "Tom Hendricks") return customerData.filter((item) => item.name === "Tom Hendricks");
    return customerData;
  }, [customerFilter]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F9FAFB] px-6">
        <div className="rounded-2xl border border-slate-200 bg-white px-8 py-6 text-center shadow-sm">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#F5F3FF] text-[22px] text-[#7C5CFC] animate-pulse">✨</div>
          <div className="text-[16px] font-semibold text-[#111827]">AI is analysing your June data...</div>
          <div className="mt-2 text-[13px] text-[#6B7280]">Preparing your insights dashboard</div>
        </div>
      </div>
    );
  }

  return (
    <main className="flex-1 overflow-y-auto bg-[#F9FAFB] px-6 py-6">
      <style>{`
        @keyframes aiChipPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }
        @keyframes slideInRight {
          from { transform: translateX(10px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
      <div className="mx-auto max-w-screen-2xl">
        <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <button type="button" onClick={onBack} className="cursor-pointer text-[14px] font-medium text-[#0B7B6B]">
              ← Back to Dashboard
            </button>
            <h1 className="mt-2 text-[24px] font-semibold text-[#111827]">Insights</h1>
            <p className="text-[14px] text-[#6B7280]">June 2026 · Mike&apos;s business</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center rounded-full border border-slate-200 bg-white px-3 py-2 shadow-sm">
              <span className="mr-2 text-[13px] text-[#6B7280]">Month</span>
              <select className="bg-transparent text-[13px] font-medium text-[#111827] outline-none">
                <option>Jun 2026</option>
              </select>
            </div>
            <div className="flex items-center rounded-full border border-slate-200 bg-white px-3 py-2 shadow-sm">
              <span className="mr-2 text-[13px] text-[#6B7280]">🔎</span>
              <input className="bg-transparent text-[13px] text-[#111827] outline-none" placeholder="Search insights" />
            </div>
          </div>
        </div>

        <div className="mb-8 flex flex-wrap gap-3">
          <Pill active onClick={() => scrollToSection("cost")}>Cost Intelligence</Pill>
          <Pill active={false} onClick={() => scrollToSection("service")}>Service Performance</Pill>
          <Pill active={false} onClick={() => scrollToSection("collections")}>Collections</Pill>
          <Pill active={false} onClick={() => scrollToSection("customer")}>Customer Intelligence</Pill>
        </div>

        <section ref={costRef} className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <SectionHeader
            eyebrow="Cost Intelligence"
            title="You lost money on 3 jobs this month."
            subtitle="Here is where it happened and why."
            right={
              <div className="flex flex-wrap gap-2">
                <button type="button" className="cursor-pointer rounded-full border border-slate-200 bg-white px-3 py-2 text-[13px] font-medium text-[#6B7280]">
                  {costFilter}
                </button>
                <button type="button" className="cursor-pointer rounded-full border border-slate-200 bg-white px-3 py-2 text-[13px] font-medium text-[#6B7280]">
                  This Month
                </button>
              </div>
            }
          />

          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap gap-2">
              <Pill active={costFilter === "All Jobs"} onClick={() => setCostFilter("All Jobs")}>All Jobs</Pill>
              <Pill active={costFilter === "Loss Only"} onClick={() => setCostFilter("Loss Only")}>Loss Only</Pill>
            </div>
            <button
              type="button"
              onClick={() => setSummaryOpen((value) => !value)}
              onMouseEnter={() => setSummaryHovered(true)}
              onMouseLeave={() => setSummaryHovered(false)}
              className="cursor-pointer rounded-[20px] border border-transparent px-4 py-2 text-[12px] font-bold text-white shadow-[0_4px_15px_rgba(124,92,252,0.4)] transition-all duration-200"
              style={{
                background: "linear-gradient(135deg, #7C5CFC 0%, #0B7B6B 100%)",
                animation: summaryOpen ? "none" : (summaryHovered ? "none" : "aiChipPulse 2s ease-in-out infinite"),
                transform: summaryHovered && !summaryOpen ? "scale(1.05)" : "scale(1)",
              }}
            >
              {summaryOpen ? "✨ Close AI Summary" : (summaryHovered ? "✨ Tap for AI Summary" : "✨ AI Summary")}
            </button>
          </div>

          <div className={`transition-all duration-300 ${summaryOpen ? "grid gap-4 lg:grid-cols-[0.6fr_0.4fr]" : ""}`}>
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <div className="text-[15px] font-semibold text-[#111827]">Quoted vs Actual Cost</div>
                  <div className="text-[13px] text-[#6B7280]">Grouped stacked bar view for every job</div>
                </div>
              </div>
              <CostIntelligenceChart data={visibleCostData} />

              <div className="mt-3 space-y-2 text-[12px] text-[#6B7280]">
                <div className="flex flex-wrap gap-3">
                  <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-[#0B7B6B]" />Quoted · Repair</span>
                  <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-[#3B82F6]" />Quoted · Labour</span>
                  <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-[#7C5CFC]" />Quoted · Material</span>
                  <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-[#F59E0B]" />Quoted · Fuel</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-[#7BC5B8]" />Actual · Repair</span>
                  <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-[#93C5FD]" />Actual · Labour</span>
                  <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-[#C4B5FD]" />Actual · Material</span>
                  <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-[#FCD34D]" />Actual · Fuel</span>
                </div>
              </div>
            </div>

            {summaryOpen ? (
              <div className="rounded-[12px] border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300" style={{ borderLeft: "3px solid #7C5CFC", animation: "slideInRight 300ms ease-out both" }}>
                <div className="mb-4 flex items-start justify-between gap-2">
                  <div className="text-[13px] font-semibold uppercase tracking-[0.2em] text-[#7C5CFC]">✨ AI Summary</div>
                  <button type="button" onClick={() => setSummaryOpen(false)} className="cursor-pointer text-[18px] font-semibold text-slate-500">×</button>
                </div>
                <div className="space-y-3 text-[14px] leading-6 text-[#374151]">
                  <div><span className="mr-2">🔴</span><span><span className="font-semibold text-[#DC2626]">Labour costs</span> overran on all 3 loss jobs</span></div>
                  <div><span className="mr-2">🔴</span><span>Tom H AC Service lost you the most — <span className="font-semibold text-[#DC2626]">$450</span></span></div>
                  <div><span className="mr-2">🟡</span><span><span className="font-semibold text-[#F59E0B]">Materials</span> also went over on Tom H AC job</span></div>
                  <div><span className="mr-2">🟢</span><span>Drain Cleaning, Plumbing Repair and AC Service all came in <span className="font-semibold text-[#059669]">under budget</span></span></div>
                  <div><span className="mr-2">💡</span><span>Raise labour estimate for inspections by at least <span className="font-semibold text-[#7C5CFC]">40%</span> to stop the losses</span></div>
                </div>
                <div className="mt-5 border-t border-slate-200 pt-3 text-[11px] italic text-[#6B7280]">Based on 6 jobs in June 2026</div>
              </div>
            ) : null}
          </div>

        </section>

        <section ref={serviceRef} className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <SectionHeader
            eyebrow="Service Performance"
            title="Drain cleaning is making you the most money."
            subtitle="Inspections are costing you."
            right={
              <div className="flex flex-wrap gap-2">
                <button type="button" className="cursor-pointer rounded-full border border-slate-200 bg-white px-3 py-2 text-[13px] font-medium text-[#6B7280]">
                  {serviceFilter}
                </button>
                <button type="button" className="cursor-pointer rounded-full border border-slate-200 bg-white px-3 py-2 text-[13px] font-medium text-[#6B7280]">
                  This Month
                </button>
              </div>
            }
          />

          <div className="mb-4 flex flex-wrap gap-2">
            <Pill active={serviceFilter === "All"} onClick={() => setServiceFilter("All")}>All</Pill>
            <Pill active={serviceFilter === "Profitable"} onClick={() => setServiceFilter("Profitable")}>Profitable</Pill>
            <Pill active={serviceFilter === "Loss Making"} onClick={() => setServiceFilter("Loss Making")}>Loss Making</Pill>
          </div>

          <div className="rounded-2xl border border-slate-200 p-4 shadow-sm">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart layout="vertical" data={visibleServiceData}>
                  <CartesianGrid stroke="#F3F4F6" horizontal={false} />
                  <XAxis type="number" tick={{ fontSize: 12, fill: "#6B7280" }} axisLine={false} tickLine={false} />
                  <YAxis dataKey="name" type="category" tick={{ fontSize: 12, fill: "#6B7280" }} axisLine={false} tickLine={false} width={120} />
                  <Tooltip contentStyle={{ borderRadius: 10, borderColor: "#E5E7EB", boxShadow: "0 6px 20px rgba(0,0,0,0.08)" }} />
                  <Bar dataKey="amount" radius={[0, 6, 6, 0]}>
                    {visibleServiceData.map((entry, index) => (
                      <Cell key={entry.name} fill={entry.positive ? (entry.name === "Drain Cleaning" ? "#059669" : "#10B981") : "#DC2626"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-6">
            <AiSummaryBox
              text="Drain cleaning is your best work — $320 profit per job on average. Do more of this. Inspections are losing you $86 per job on average. You are undercharging for labour and materials. Stop taking inspection jobs until you fix the pricing."
              actions={
                <>
                  <ActionButton>Promote Drain Cleaning →</ActionButton>
                  <ActionButton>Review Inspection Pricing →</ActionButton>
                </>
              }
            />
          </div>
        </section>

        <section ref={collectionsRef} className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <SectionHeader
            eyebrow="Collections"
            title="$6,400 you already earned is not in your account yet."
            subtitle="Send reminders and generate invoices to collect faster."
            right={
              <div className="flex flex-wrap gap-2">
                <button type="button" className="cursor-pointer rounded-full border border-slate-200 bg-white px-3 py-2 text-[13px] font-medium text-[#6B7280]">
                  {collectionsTab === "uninvoiced" ? "Uninvoiced Jobs" : "Overdue Invoices"}
                </button>
                <button type="button" className="cursor-pointer rounded-full border border-slate-200 bg-white px-3 py-2 text-[13px] font-medium text-[#6B7280]">
                  This Month
                </button>
              </div>
            }
          />

          <div className="mb-4 flex flex-wrap gap-2">
            <Pill active={collectionsTab === "uninvoiced"} onClick={() => setCollectionsTab("uninvoiced")}>Uninvoiced Jobs</Pill>
            <Pill active={collectionsTab === "overdue"} onClick={() => setCollectionsTab("overdue")}>Overdue Invoices</Pill>
          </div>

          {collectionsTab === "uninvoiced" ? (
            <div className="overflow-hidden rounded-xl border border-slate-200">
              <div className="grid grid-cols-[1.2fr_1fr_1fr_0.8fr_0.9fr] bg-slate-50 px-4 py-3 text-[13px] font-semibold text-[#6B7280]">
                <div>Job</div>
                <div>Customer</div>
                <div>Completed On</div>
                <div>Est. Amount</div>
                <div>Action</div>
              </div>
              {[
                ["Drain Cleaning", "ABC Drain", "Jun 18", "$640"],
                ["Plumbing Repair", "Johnson", "Jun 20", "$560"],
                ["AC Service", "Mike Brown", "Jun 22", "$960"],
              ].map((row) => (
                <div key={row[0]} className="grid grid-cols-[1.2fr_1fr_1fr_0.8fr_0.9fr] items-center border-t border-slate-100 bg-white px-4 py-3 text-[14px] text-[#374151]">
                  <div>{row[0]}</div>
                  <div>{row[1]}</div>
                  <div>{row[2]}</div>
                  <div className="font-semibold text-[#111827]">{row[3]}</div>
                  <button className="cursor-pointer rounded-lg bg-[#0B7B6B] px-3 py-2 text-[12px] font-semibold text-white">Generate Invoice</button>
                </div>
              ))}
              <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50 px-4 py-3 text-[14px] font-semibold text-[#111827]">
                <span>Total uninvoiced: $2,160</span>
                <button className="cursor-pointer rounded-lg bg-[#0B7B6B] px-3 py-2 text-[12px] font-semibold text-white">Generate All Invoices →</button>
              </div>
            </div>
          ) : (
            <div className="overflow-hidden rounded-xl border border-slate-200">
              <div className="grid grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr_0.9fr] bg-slate-50 px-4 py-3 text-[13px] font-semibold text-[#6B7280]">
                <div>Customer</div>
                <div>Invoice</div>
                <div>Amount</div>
                <div>Days Pending</div>
                <div>Action</div>
              </div>
              {[
                ["Johnson HVAC", "#1023", "$340", "26 days", "Send Reminder"],
                ["ABC Drain", "#1045", "$2,100", "18 days", "Send Reminder"],
                ["Mike Brown", "#1067", "$1,800", "10 days", "Send Reminder"],
              ].map((row) => (
                <div key={row[0]} className="grid grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr_0.9fr] items-center border-t border-slate-100 bg-white px-4 py-3 text-[14px] text-[#374151]">
                  <div>{row[0]}</div>
                  <div>{row[1]}</div>
                  <div className="font-semibold text-[#111827]">{row[2]}</div>
                  <div>{row[3]}</div>
                  <button className="cursor-pointer rounded-lg border border-slate-200 px-3 py-2 text-[12px] font-semibold text-[#0B7B6B]">{row[4]}</button>
                </div>
              ))}
              <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50 px-4 py-3 text-[14px] font-semibold text-[#111827]">
                <span>Total overdue: $4,240</span>
                <button className="cursor-pointer rounded-lg bg-[#0B7B6B] px-3 py-2 text-[12px] font-semibold text-white">Send All Reminders →</button>
              </div>
            </div>
          )}

          <div className="mt-6">
            <AiSummaryBox
              text="$340 from Johnson HVAC is 26 days overdue — send a reminder today before it gets awkward. 3 jobs were finished but never invoiced — that is $2,160 sitting on the table. Generate those invoices now."
              actions={
                <>
                  <ActionButton>Send All Reminders →</ActionButton>
                  <ActionButton>Generate All Invoices →</ActionButton>
                </>
              }
            />
          </div>
        </section>

        <section ref={customerRef} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <SectionHeader
            eyebrow="Customer Intelligence"
            title="Most of your customers are profitable."
            subtitle="One customer is costing you money."
            right={
              <div className="flex flex-wrap gap-2">
                <button type="button" className="cursor-pointer rounded-full border border-slate-200 bg-white px-3 py-2 text-[13px] font-medium text-[#6B7280]">
                  {customerFilter}
                </button>
                <button type="button" className="cursor-pointer rounded-full border border-slate-200 bg-white px-3 py-2 text-[13px] font-medium text-[#6B7280]">
                  This Month
                </button>
              </div>
            }
          />

          <div className="mb-4 flex flex-wrap gap-2">
            <Pill active={customerFilter === "All Customers"} onClick={() => setCustomerFilter("All Customers")}>All</Pill>
            <Pill active={customerFilter === "Profitable"} onClick={() => setCustomerFilter("Profitable")}>Profitable</Pill>
            <Pill active={customerFilter === "Loss Making"} onClick={() => setCustomerFilter("Loss Making")}>Loss Making</Pill>
          </div>

          <div className="rounded-2xl border border-slate-200 p-4 shadow-sm">
            <div className="relative h-80">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart>
                  <CartesianGrid stroke="#F3F4F6" />
                  <XAxis type="number" dataKey="revenue" name="Revenue" tick={{ fontSize: 12, fill: "#6B7280" }} axisLine={false} tickLine={false} />
                  <YAxis type="number" dataKey="profit" name="Profit" tick={{ fontSize: 12, fill: "#6B7280" }} axisLine={false} tickLine={false} />
                  <Tooltip cursor={{ strokeDasharray: "3 3" }} contentStyle={{ borderRadius: 10, borderColor: "#E5E7EB", boxShadow: "0 6px 20px rgba(0,0,0,0.08)" }} />
                  <Scatter data={visibleCustomerData}>
                    {visibleCustomerData.map((entry) => (
                      <Cell key={entry.name} fill={entry.profitable ? "#059669" : "#DC2626"} />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
              <div className="pointer-events-none absolute left-[10%] top-[6%] rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[12px] font-semibold text-[#0B7B6B] shadow-sm">
                ABC Plumbing ⭐
              </div>
              <div className="pointer-events-none absolute right-[10%] bottom-[18%] rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[12px] font-semibold text-[#DC2626] shadow-sm">
                Tom Hendricks 🔴
              </div>
            </div>
          </div>

          <div className="mt-6">
            <AiSummaryBox
              text="ABC Plumbing is your most valuable customer — $890 profit per job. Keep them happy. Tom Hendricks is your only loss making customer this month — costing you $690. His jobs are taking more labour and materials than you quote. Have a pricing conversation with him or revise his job estimates."
              actions={
                <>
                  <ActionButton>Review Tom&apos;s Account →</ActionButton>
                  <ActionButton>View ABC Plumbing →</ActionButton>
                </>
              }
            />
          </div>
        </section>
      </div>
    </main>
  );
}

export default InsightsPage;
