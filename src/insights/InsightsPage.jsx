import { useEffect, useMemo, useRef, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Customized,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  XAxis,
  YAxis,
} from "recharts";

const jobData = [
  {
    name: "Drain Cleaning",
    customer: "Johnson Ave",
    type: "profit",
    chip: "+$90",
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
    profitLoss: 90,
  },
  {
    name: "Plumbing Repair",
    customer: "Mike St",
    type: "profit",
    chip: "+$60",
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
    profitLoss: 60,
  },
  {
    name: "AC Service",
    customer: "Brown House",
    type: "profit",
    chip: "+$40",
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
    profitLoss: 40,
  },
  {
    name: "Johnson House",
    customer: "Inspection",
    type: "loss",
    chip: "-$120",
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
    profitLoss: -120,
    mainReason: "Labour went $130 over budget",
  },
  {
    name: "Mike Brown",
    customer: "Inspection",
    type: "loss",
    chip: "-$120",
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
    profitLoss: -120,
    mainReason: "Labour went $110 over budget",
  },
  {
    name: "Tom H AC",
    customer: "Tom H",
    type: "loss",
    chip: "-$450",
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
    profitLoss: -450,
    mainReason: "Labour went $200 and Material went $220 over",
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

function CostTooltip({ job, position }) {
  if (!job) return null;
  const format = (value) => `$${value}`;
  const isProfit = job.type === "profit";

  const categories = [
    { label: "Repair", quoted: job.quotedRepair, actual: job.actualRepair, dot: "#0B7B6B" },
    { label: "Labour", quoted: job.quotedLabour, actual: job.actualLabour, dot: "#3B82F6" },
    { label: "Material", quoted: job.quotedMaterial, actual: job.actualMaterial, dot: "#7C5CFC" },
    { label: "Fuel", quoted: job.quotedFuel, actual: job.actualFuel, dot: "#F59E0B" },
  ];

  return (
    <div
      className="pointer-events-none fixed z-[9999] w-[280px] overflow-hidden rounded-[14px] bg-white p-0 shadow-[0_8px_30px_rgba(0,0,0,0.18)]"
      style={{ left: position.left, top: position.top }}
    >
      <div
        className="border-b border-[#E5E7EB] bg-[#F9FAFB]"
        style={{ padding: "12px 16px", borderRadius: "14px 14px 0 0" }}
      >
        <div className="text-[15px] text-[#111827]" style={{ fontWeight: 800 }}>
          {isProfit ? "🟢 " : "🔴 "}
          {job.name}
        </div>
        <div className="text-[12px] text-[#6B7280]" style={{ marginTop: 2 }}>
          {job.customer}
        </div>
      </div>

      <div style={{ padding: "12px 16px" }}>
        <div
          className="grid grid-cols-[1.1fr_0.75fr_0.85fr] uppercase text-[#9CA3AF]"
          style={{ background: "#F3F4F6", borderRadius: 6, padding: "4px 8px", fontSize: 10 }}
        >
          <div>CATEGORY</div>
          <div>QUOTED</div>
          <div>ACTUAL</div>
        </div>

        {categories.map(({ label, quoted, actual, dot }) => {
          const over = actual > quoted;
          return (
            <div
              key={label}
              className="grid grid-cols-[1.1fr_0.75fr_0.85fr] border-b border-[#F3F4F6]"
              style={{ padding: "6px 0" }}
            >
              <div className="flex items-center gap-2 text-[13px] text-[#374151]">
                <span
                  className="inline-block shrink-0 rounded-full"
                  style={{ width: 10, height: 10, backgroundColor: dot }}
                />
                {label}
              </div>
              <div className="text-[13px] text-[#374151]">{format(quoted)}</div>
              <div
                className="text-[13px]"
                style={{ color: over ? "#DC2626" : "#059669", fontWeight: over ? 700 : 400 }}
              >
                {over ? `↑ ${format(actual)}` : format(actual)}
              </div>
            </div>
          );
        })}

        <div className="my-2 border-t border-[#E5E7EB]" />

        <div className="grid grid-cols-[1.1fr_0.75fr_0.85fr]" style={{ fontSize: 14, fontWeight: 700 }}>
          <div className="text-[#111827]">Total</div>
          <div className="text-[#374151]">{format(job.quotedTotal)}</div>
          <div style={{ color: isProfit ? "#059669" : "#DC2626", fontWeight: 700 }}>
            {format(job.actualTotal)}
          </div>
        </div>
      </div>

      <div
        style={{
          padding: "10px 16px",
          borderRadius: "0 0 14px 14px",
          background: isProfit ? "#F0FDF4" : "#FEF2F2",
        }}
      >
        <div
          className="text-[15px]"
          style={{ color: isProfit ? "#059669" : "#DC2626", fontWeight: 800 }}
        >
          {isProfit
            ? `🟢 You made $${job.profitLoss} on this job`
            : `🔴 You lost $${Math.abs(job.profitLoss)} on this job`}
        </div>
        {!isProfit && job.mainReason ? (
          <div className="mt-1 text-[11px] italic text-[#6B7280]">{job.mainReason}</div>
        ) : null}
      </div>
    </div>
  );
}

function CustomAxisTick({ x, y, payload, jobs }) {
  const job = jobs.find((item) => item.name === payload.value);
  if (!job) return null;

  const isProfit = job.type === "profit";
  const chipFill = isProfit ? "#DCFCE7" : "#FEE2E2";
  const chipTextColor = isProfit ? "#059669" : "#DC2626";
  const nameColor = isProfit ? "#059669" : "#DC2626";
  const chipWidth = Math.max(44, job.chip.length * 7 + 16);

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        textAnchor="middle"
        fill={nameColor}
        fontSize={13}
        fontWeight={700}
        style={{ letterSpacing: "0.01em" }}
      >
        {job.name}
      </text>
      <rect x={-chipWidth / 2} y={8} width={chipWidth} height={18} rx={9} fill={chipFill} />
      <text x={0} y={21} textAnchor="middle" fontSize={11} fontWeight={700} fill={chipTextColor}>
        {job.chip}
      </text>
    </g>
  );
}

const BAR_SIZE = 50;
const BAR_GAP = 8;
const LANE_PADDING = 10;

function BackgroundLanes({ xAxisMap, yAxisMap, data }) {
  const xAxis = xAxisMap[Object.keys(xAxisMap)[0]];
  const yAxis = yAxisMap[Object.keys(yAxisMap)[0]];
  if (!xAxis?.scale || !yAxis) return null;

  const yTop = yAxis.y;
  const yBottom = yAxis.y + yAxis.height;
  const laneWidth = BAR_SIZE * 2 + BAR_GAP + LANE_PADDING * 2;

  return (
    <g>
      {data.map((job) => {
        const bandStart = xAxis.scale(job.name);
        if (bandStart == null) return null;
        const bandWidth = xAxis.scale.bandwidth?.() ?? xAxis.bandSize ?? 0;
        const cx = bandStart + bandWidth / 2;
        const fill = job.type === "profit" ? "#F0FDF4" : "#FEF2F2";

        return (
          <rect
            key={job.name}
            x={cx - laneWidth / 2}
            y={yTop}
            width={laneWidth}
            height={yBottom - yTop}
            fill={fill}
            rx={8}
          />
        );
      })}
    </g>
  );
}

function clampTooltipPosition(mousePos, tooltipWidth = 280, tooltipHeight = 340) {
  const viewportWidth = typeof window !== "undefined" ? window.innerWidth : 1280;
  const viewportHeight = typeof window !== "undefined" ? window.innerHeight : 720;

  let left =
    mousePos.x < viewportWidth / 2 ? mousePos.x + 16 : mousePos.x - (tooltipWidth + 16);
  let top = mousePos.y - 80;

  left = Math.max(16, Math.min(left, viewportWidth - tooltipWidth - 16));
  top = Math.max(16, Math.min(top, viewportHeight - tooltipHeight - 16));

  return { left, top };
}

function AiSummaryChip({ isOpen, onToggle }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      type="button"
      onClick={onToggle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="cursor-pointer rounded-[20px] border border-transparent text-[12px] font-bold text-white shadow-[0_4px_15px_rgba(124,92,252,0.4)] transition-all duration-200"
      style={{
        background: "linear-gradient(135deg, #7C5CFC 0%, #0B7B6B 100%)",
        padding: "8px 16px",
        animation: isOpen ? "none" : (hovered ? "none" : "aiChipPulse 2s ease-in-out infinite"),
        transform: hovered && !isOpen ? "scale(1.05)" : "scale(1)",
      }}
    >
      {isOpen ? "✨ Close AI Summary" : (hovered ? "✨ Tap for AI Summary" : "✨ AI Summary")}
    </button>
  );
}

function AiSummarySidePanel({ onClose, children }) {
  return (
    <div
      className="flex w-[42%] min-w-0 flex-1 flex-col rounded-[12px] border border-slate-200 bg-white shadow-sm transition-all duration-300"
      style={{ borderLeft: "3px solid #7C5CFC", padding: 20, animation: "slideInRight 300ms ease-out both" }}
    >
      <div className="mb-4 flex w-full items-start justify-between gap-2">
        <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#7C5CFC]">✨ AI Summary</div>
        <button type="button" onClick={onClose} className="cursor-pointer text-[18px] font-semibold text-slate-500">×</button>
      </div>
      <div className="w-full flex-1">{children}</div>
    </div>
  );
}

function ServiceTooltip({ service, position }) {
  if (!service) return null;
  const isProfit = service.positive;
  const valueColor = isProfit ? "#059669" : "#DC2626";

  return (
    <div
      className="pointer-events-none fixed z-[9999] w-[240px] overflow-hidden rounded-[14px] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.18)]"
      style={{ left: position.left, top: position.top }}
    >
      <div
        className="border-b border-[#E5E7EB] bg-[#F9FAFB]"
        style={{ padding: "12px 16px", borderRadius: "14px 14px 0 0" }}
      >
        <div className="text-[15px] text-[#111827]" style={{ fontWeight: 800 }}>
          {isProfit ? "🟢 " : "🔴 "}
          {service.name}
        </div>
      </div>
      <div style={{ padding: "12px 16px" }} className="space-y-2 text-[13px]">
        <div>
          <span className="text-[#6B7280]">Jobs done: </span>
          <span className="font-medium text-[#111827]">{service.jobs} jobs</span>
        </div>
        <div>
          <span className="text-[#6B7280]">Avg profit per job: </span>
          <span className="font-bold" style={{ color: valueColor }}>${Math.abs(service.avg)}</span>
        </div>
        <div>
          <span className="text-[#6B7280]">Total this month: </span>
          <span className="text-[16px] font-bold" style={{ color: valueColor }}>
            {isProfit ? "" : "-"}${Math.abs(service.amount)}
          </span>
        </div>
      </div>
      <div
        style={{
          padding: "10px 16px",
          borderRadius: "0 0 14px 14px",
          background: isProfit ? "#F0FDF4" : "#FEF2F2",
        }}
      >
        <div className="text-[13px]" style={{ color: valueColor, fontWeight: 700 }}>
          {isProfit ? "🟢 Profitable service — do more of this" : "🔴 Losing money — review pricing"}
        </div>
      </div>
    </div>
  );
}

function ServicePerformanceChart({ data }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeService, setActiveService] = useState(null);

  const tooltipPosition = clampTooltipPosition(mousePos, 240, 220);

  const handleWrapperMouseMove = (event) => {
    setMousePos({ x: event.clientX, y: event.clientY });
  };

  const handleChartMouseMove = (state) => {
    if (state?.activeLabel) {
      const service = data.find((item) => item.name === state.activeLabel);
      setActiveService(service ?? null);
    }
  };

  const handleMouseLeave = () => {
    setActiveService(null);
  };

  return (
    <div
      className="relative h-80"
      onMouseMove={handleWrapperMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout="vertical"
          data={data}
          onMouseMove={handleChartMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <CartesianGrid stroke="#F3F4F6" horizontal={false} />
          <XAxis type="number" tick={{ fontSize: 12, fill: "#6B7280" }} axisLine={false} tickLine={false} />
          <YAxis dataKey="name" type="category" tick={{ fontSize: 12, fill: "#6B7280" }} axisLine={false} tickLine={false} width={120} />
          <Bar dataKey="amount" radius={[0, 6, 6, 0]}>
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.positive ? (entry.name === "Drain Cleaning" ? "#059669" : "#10B981") : "#DC2626"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      {activeService ? <ServiceTooltip service={activeService} position={tooltipPosition} /> : null}
    </div>
  );
}

const uninvoicedRows = [
  { job: "Drain Cleaning", customer: "ABC Drain", completed: "Jun 18", amount: "$640" },
  { job: "Plumbing Repair", customer: "Johnson", completed: "Jun 20", amount: "$560" },
  { job: "AC Service", customer: "Mike Brown", completed: "Jun 22", amount: "$960" },
];

const overdueRows = [
  { customer: "Johnson HVAC", invoice: "#1023", amount: "$340", days: 26 },
  { customer: "ABC Drain", invoice: "#1045", amount: "$2,100", days: 18 },
  { customer: "Mike Brown", invoice: "#1067", amount: "$1,800", days: 10 },
];

function CollectionsRowTooltip({ row, type, position }) {
  if (!row) return null;

  if (type === "uninvoiced") {
    return (
      <div
        className="pointer-events-none fixed z-[9999] w-[220px] rounded-[12px] bg-white p-[14px] shadow-[0_4px_20px_rgba(0,0,0,0.15)]"
        style={{ left: position.left, top: position.top }}
      >
        <div className="text-[14px] font-bold text-[#111827]">{row.job}</div>
        <div className="text-[12px] text-[#6B7280]">{row.customer}</div>
        <div className="mt-2 text-[13px] text-[#374151]">Completed: {row.completed}</div>
        <div className="mt-1 text-[13px] text-[#374151]">
          Est. Amount: <span className="text-[16px] font-bold text-[#0B7B6B]">{row.amount}</span>
        </div>
        <div className="mt-2 text-[13px]">Status: 🔴 Not invoiced yet</div>
      </div>
    );
  }

  const overdueStatus =
    row.days >= 30 ? "🔴 Overdue 30+ days" : row.days >= 15 ? "🟡 Overdue 15-30 days" : null;

  return (
    <div
      className="pointer-events-none fixed z-[9999] w-[220px] rounded-[12px] bg-white p-[14px] shadow-[0_4px_20px_rgba(0,0,0,0.15)]"
      style={{ left: position.left, top: position.top }}
    >
      <div className="text-[14px] font-bold text-[#111827]">{row.customer}</div>
      <div className="text-[12px] text-[#6B7280]">{row.invoice}</div>
      <div className="mt-2 text-[13px] text-[#374151]">
        Amount: <span className="text-[16px] font-bold text-[#DC2626]">{row.amount}</span>
      </div>
      <div className="mt-1 text-[13px] text-[#374151]">Overdue by: {row.days} days</div>
      {overdueStatus ? <div className="mt-2 text-[13px]">{overdueStatus}</div> : null}
    </div>
  );
}

function CustomerTooltip({ customer, position }) {
  if (!customer) return null;
  const isProfit = customer.profitable;
  const avgProfit = Math.round(customer.profit / customer.jobs);
  const valueColor = isProfit ? "#059669" : "#DC2626";

  return (
    <div
      className="pointer-events-none fixed z-[9999] w-[250px] overflow-hidden rounded-[14px] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.18)]"
      style={{ left: position.left, top: position.top }}
    >
      <div
        className="border-b border-[#E5E7EB] bg-[#F9FAFB]"
        style={{ padding: "12px 16px", borderRadius: "14px 14px 0 0" }}
      >
        <div className="text-[15px] text-[#111827]" style={{ fontWeight: 800 }}>
          {isProfit ? "🟢 " : "🔴 "}
          {customer.name}
        </div>
      </div>
      <div style={{ padding: "12px 16px" }} className="space-y-2 text-[13px]">
        <div>
          <span className="text-[#6B7280]">Jobs this month: </span>
          <span className="font-medium text-[#111827]">{customer.jobs}</span>
        </div>
        <div>
          <span className="text-[#6B7280]">Total revenue: </span>
          <span className="font-bold text-[#111827]">${customer.revenue.toLocaleString()}</span>
        </div>
        <div>
          <span className="text-[#6B7280]">Avg profit per job: </span>
          <span className="font-bold" style={{ color: valueColor }}>
            {isProfit ? "" : "-"}${Math.abs(avgProfit)}
          </span>
        </div>
      </div>
      <div
        style={{
          padding: "10px 16px",
          borderRadius: "0 0 14px 14px",
          background: isProfit ? "#F0FDF4" : "#FEF2F2",
        }}
      >
        <div className="text-[13px]" style={{ color: valueColor, fontWeight: 700 }}>
          {isProfit ? "🟢 Profitable customer — keep them happy" : "🔴 Costing you money — review pricing"}
        </div>
        {!isProfit ? (
          <div className="mt-1 text-[11px] italic text-[#6B7280]">Jobs taking more labour than quoted</div>
        ) : null}
      </div>
    </div>
  );
}

function CustomerIntelligenceChart({ data }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeCustomer, setActiveCustomer] = useState(null);

  const tooltipPosition = clampTooltipPosition(mousePos, 250, 240);

  const handleWrapperMouseMove = (event) => {
    setMousePos({ x: event.clientX, y: event.clientY });
  };

  const handleChartMouseMove = (state) => {
    if (state?.activePayload?.length) {
      setActiveCustomer(state.activePayload[0].payload);
    }
  };

  const handleMouseLeave = () => {
    setActiveCustomer(null);
  };

  return (
    <div
      className="relative h-80"
      onMouseMove={handleWrapperMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart onMouseMove={handleChartMouseMove} onMouseLeave={handleMouseLeave}>
          <CartesianGrid stroke="#F3F4F6" />
          <XAxis type="number" dataKey="revenue" name="Revenue" tick={{ fontSize: 12, fill: "#6B7280" }} axisLine={false} tickLine={false} />
          <YAxis type="number" dataKey="profit" name="Profit" tick={{ fontSize: 12, fill: "#6B7280" }} axisLine={false} tickLine={false} />
          <Scatter data={data}>
            {data.map((entry) => (
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
      {activeCustomer ? <CustomerTooltip customer={activeCustomer} position={tooltipPosition} /> : null}
    </div>
  );
}

function CostIntelligenceChart({ data }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeJob, setActiveJob] = useState(null);

  const tooltipPosition = clampTooltipPosition(mousePos, 280, 340);

  const handleWrapperMouseMove = (event) => {
    setMousePos({ x: event.clientX, y: event.clientY });
  };

  const handleChartMouseMove = (state) => {
    if (state?.activeLabel) {
      const job = data.find((item) => item.name === state.activeLabel);
      setActiveJob(job ?? null);
    }
  };

  const handleMouseLeave = () => {
    setActiveJob(null);
  };

  return (
    <div
      className="relative overflow-x-auto overflow-y-hidden pb-3"
      style={{ width: "100%", scrollbarWidth: "thin", WebkitOverflowScrolling: "touch", scrollBehavior: "smooth" }}
      onMouseMove={handleWrapperMouseMove}
      onMouseLeave={handleMouseLeave}
      onWheel={(e) => {
        if (e.deltaY !== 0) e.currentTarget.scrollLeft += e.deltaY;
      }}
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
      <ResponsiveContainer width={Math.max(900, data.length * 168)} height={320}>
        <BarChart
          data={data}
          margin={{ top: 24, right: 20, left: 20, bottom: 54 }}
          barGap={BAR_GAP}
          barCategoryGap={60}
          onMouseMove={handleChartMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <CartesianGrid stroke="#F3F4F6" vertical={false} />
          <Customized component={(props) => <BackgroundLanes {...props} data={data} />} />
          <XAxis
            dataKey="name"
            tick={(props) => <CustomAxisTick {...props} jobs={data} />}
            axisLine={false}
            tickLine={false}
            height={54}
          />
          <YAxis tick={{ fontSize: 12, fill: "#6B7280" }} axisLine={false} tickLine={false} />
          <Bar dataKey="quotedRepair" stackId="quoted" fill="#0B7B6B" barSize={BAR_SIZE} />
          <Bar dataKey="quotedLabour" stackId="quoted" fill="#3B82F6" barSize={BAR_SIZE} />
          <Bar dataKey="quotedMaterial" stackId="quoted" fill="#7C5CFC" barSize={BAR_SIZE} />
          <Bar dataKey="quotedFuel" stackId="quoted" fill="#F59E0B" barSize={BAR_SIZE} />
          <Bar dataKey="actualRepair" stackId="actual" fill="#7BC5B8" barSize={BAR_SIZE} />
          <Bar dataKey="actualLabour" stackId="actual" fill="#93C5FD" barSize={BAR_SIZE} />
          <Bar dataKey="actualMaterial" stackId="actual" fill="#C4B5FD" barSize={BAR_SIZE} />
          <Bar dataKey="actualFuel" stackId="actual" fill="#FCD34D" barSize={BAR_SIZE} />
        </BarChart>
      </ResponsiveContainer>
      {activeJob ? <CostTooltip job={activeJob} position={tooltipPosition} /> : null}
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
  const [serviceSummaryOpen, setServiceSummaryOpen] = useState(false);
  const [collectionsSummaryOpen, setCollectionsSummaryOpen] = useState(false);
  const [customerSummaryOpen, setCustomerSummaryOpen] = useState(false);
  const [collectionsHoveredRow, setCollectionsHoveredRow] = useState(null);
  const [collectionsMousePos, setCollectionsMousePos] = useState({ x: 0, y: 0 });

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
      return jobData.filter((job) => job.type === "loss");
    }
    return jobData;
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

          <div className={`transition-all duration-300 ${summaryOpen ? "flex gap-4" : ""}`}>
            <div className={`min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm ${summaryOpen ? "w-[58%] shrink-0" : "w-full"}`}>
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
              <div
                className="w-[42%] min-w-0 flex-1 rounded-[12px] border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300"
                style={{ borderLeft: "3px solid #7C5CFC", animation: "slideInRight 300ms ease-out both" }}
              >
                <div className="mb-4 flex w-full items-start justify-between gap-2">
                  <div className="text-[13px] font-semibold uppercase tracking-[0.2em] text-[#7C5CFC]">✨ AI Summary</div>
                  <button type="button" onClick={() => setSummaryOpen(false)} className="cursor-pointer text-[18px] font-semibold text-slate-500">×</button>
                </div>
                <div className="w-full space-y-3 text-[14px] leading-6 text-[#374151]">
                  <div><span className="mr-2">🔴</span><span><span className="font-semibold text-[#DC2626]">Labour costs</span> overran on all 3 loss jobs</span></div>
                  <div><span className="mr-2">🔴</span><span>Tom H AC Service lost you the most — <span className="font-semibold text-[#DC2626]">$450</span></span></div>
                  <div><span className="mr-2">🟡</span><span><span className="font-semibold text-[#F59E0B]">Materials</span> also went over on Tom H AC job</span></div>
                  <div><span className="mr-2">🟢</span><span>Drain Cleaning, Plumbing Repair and AC Service all came in <span className="font-semibold text-[#059669]">under budget</span></span></div>
                  <div><span className="mr-2">💡</span><span>Raise labour estimate for inspections by at least <span className="font-semibold text-[#7C5CFC]">40%</span> to stop the losses</span></div>
                </div>
                <div className="mt-5 w-full border-t border-slate-200 pt-3 text-[11px] italic text-[#6B7280]">Based on 6 jobs in June 2026</div>
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

          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap gap-2">
              <Pill active={serviceFilter === "All"} onClick={() => setServiceFilter("All")}>All</Pill>
              <Pill active={serviceFilter === "Profitable"} onClick={() => setServiceFilter("Profitable")}>Profitable</Pill>
              <Pill active={serviceFilter === "Loss Making"} onClick={() => setServiceFilter("Loss Making")}>Loss Making</Pill>
            </div>
            <AiSummaryChip
              isOpen={serviceSummaryOpen}
              onToggle={() => setServiceSummaryOpen((value) => !value)}
            />
          </div>

          <div className={`transition-all duration-300 ${serviceSummaryOpen ? "flex gap-4" : ""}`}>
            <div className={`min-w-0 rounded-2xl border border-slate-200 p-4 shadow-sm ${serviceSummaryOpen ? "w-[58%] shrink-0" : "w-full"}`}>
              <ServicePerformanceChart data={visibleServiceData} />
            </div>

            {serviceSummaryOpen ? (
              <AiSummarySidePanel onClose={() => setServiceSummaryOpen(false)}>
                <div className="w-full space-y-3 text-[14px] leading-6 text-[#374151]">
                  <div>
                    <span className="mr-2">🔴</span>
                    <span>Inspections are losing you <span className="font-bold text-[#DC2626]">$86</span> per job</span>
                  </div>
                  <div>
                    <span className="mr-2">🟢</span>
                    <span>Drain cleaning makes you <span className="font-bold text-[#059669]">$320</span> per job</span>
                  </div>
                  <div>
                    <span className="mr-2">🟡</span>
                    <span>You have 3 services making profit — focus on <span className="font-bold text-[#0B7B6B]">drain cleaning</span> most</span>
                  </div>
                  <div>
                    <span className="mr-2">💡</span>
                    <span>Stop undercharging for inspections — raise pricing by at least <span className="font-bold text-[#7C5CFC]">30%</span></span>
                  </div>
                </div>
                <div className="mt-5 w-full border-t border-slate-200 pt-3 text-[11px] italic text-[#6B7280]">
                  Based on 5 services in June 2026
                </div>
                <div className="mt-4 flex w-full flex-wrap gap-3">
                  <ActionButton>Promote Drain Cleaning →</ActionButton>
                  <ActionButton>Review Inspection Pricing →</ActionButton>
                </div>
              </AiSummarySidePanel>
            ) : null}
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

          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap gap-2">
              <Pill active={collectionsTab === "uninvoiced"} onClick={() => setCollectionsTab("uninvoiced")}>Uninvoiced Jobs</Pill>
              <Pill active={collectionsTab === "overdue"} onClick={() => setCollectionsTab("overdue")}>Overdue Invoices</Pill>
            </div>
            <AiSummaryChip
              isOpen={collectionsSummaryOpen}
              onToggle={() => setCollectionsSummaryOpen((value) => !value)}
            />
          </div>

          <div className={`transition-all duration-300 ${collectionsSummaryOpen ? "flex gap-4" : ""}`}>
            <div className={`min-w-0 ${collectionsSummaryOpen ? "w-[58%] shrink-0" : "w-full"}`}>
              {collectionsTab === "uninvoiced" ? (
                <div
                  className="overflow-hidden rounded-xl border border-slate-200"
                  onMouseLeave={() => setCollectionsHoveredRow(null)}
                >
                  <div className="grid grid-cols-[1.2fr_1fr_1fr_0.8fr_0.9fr] bg-slate-50 px-4 py-3 text-[13px] font-semibold text-[#6B7280]">
                    <div>Job</div>
                    <div>Customer</div>
                    <div>Completed On</div>
                    <div>Est. Amount</div>
                    <div>Action</div>
                  </div>
                  {uninvoicedRows.map((row) => (
                    <div
                      key={row.job}
                      className="grid cursor-pointer grid-cols-[1.2fr_1fr_1fr_0.8fr_0.9fr] items-center border-t border-l-[3px] border-l-transparent border-slate-100 bg-white px-4 py-3 text-[14px] text-[#374151] transition-all duration-150 hover:border-l-[#0B7B6B] hover:bg-[#F9FAFB]"
                      onMouseEnter={() => setCollectionsHoveredRow({ row, type: "uninvoiced" })}
                      onMouseMove={(e) => setCollectionsMousePos({ x: e.clientX, y: e.clientY })}
                      onMouseLeave={() => setCollectionsHoveredRow(null)}
                    >
                      <div>{row.job}</div>
                      <div>{row.customer}</div>
                      <div>{row.completed}</div>
                      <div className="font-semibold text-[#111827]">{row.amount}</div>
                      <button className="cursor-pointer rounded-lg bg-[#0B7B6B] px-3 py-2 text-[12px] font-semibold text-white">Generate Invoice</button>
                    </div>
                  ))}
                  <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50 px-4 py-3 text-[14px] font-semibold text-[#111827]">
                    <span>Total uninvoiced: $2,160</span>
                    <button className="cursor-pointer rounded-lg bg-[#0B7B6B] px-3 py-2 text-[12px] font-semibold text-white">Generate All Invoices →</button>
                  </div>
                </div>
              ) : (
                <div
                  className="overflow-hidden rounded-xl border border-slate-200"
                  onMouseLeave={() => setCollectionsHoveredRow(null)}
                >
                  <div className="grid grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr_0.9fr] bg-slate-50 px-4 py-3 text-[13px] font-semibold text-[#6B7280]">
                    <div>Customer</div>
                    <div>Invoice</div>
                    <div>Amount</div>
                    <div>Days Pending</div>
                    <div>Action</div>
                  </div>
                  {overdueRows.map((row) => (
                    <div
                      key={row.customer}
                      className="grid cursor-pointer grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr_0.9fr] items-center border-t border-l-[3px] border-l-transparent border-slate-100 bg-white px-4 py-3 text-[14px] text-[#374151] transition-all duration-150 hover:border-l-[#0B7B6B] hover:bg-[#F9FAFB]"
                      onMouseEnter={() => setCollectionsHoveredRow({ row, type: "overdue" })}
                      onMouseMove={(e) => setCollectionsMousePos({ x: e.clientX, y: e.clientY })}
                      onMouseLeave={() => setCollectionsHoveredRow(null)}
                    >
                      <div>{row.customer}</div>
                      <div>{row.invoice}</div>
                      <div className="font-semibold text-[#111827]">{row.amount}</div>
                      <div>{row.days} days</div>
                      <button className="cursor-pointer rounded-lg border border-slate-200 px-3 py-2 text-[12px] font-semibold text-[#0B7B6B]">Send Reminder</button>
                    </div>
                  ))}
                  <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50 px-4 py-3 text-[14px] font-semibold text-[#111827]">
                    <span>Total overdue: $4,240</span>
                    <button className="cursor-pointer rounded-lg bg-[#0B7B6B] px-3 py-2 text-[12px] font-semibold text-white">Send All Reminders →</button>
                  </div>
                </div>
              )}
            </div>

            {collectionsSummaryOpen ? (
              <AiSummarySidePanel onClose={() => setCollectionsSummaryOpen(false)}>
                <div className="w-full space-y-3 text-[14px] leading-6 text-[#374151]">
                  <div>
                    <span className="mr-2">🔴</span>
                    <span><span className="font-bold text-[#DC2626]">$340</span> from Johnson HVAC is <span className="font-bold text-[#DC2626]">26 days</span> overdue — send reminder today</span>
                  </div>
                  <div>
                    <span className="mr-2">🔴</span>
                    <span><span className="font-bold text-[#DC2626]">3 jobs</span> were finished but never invoiced</span>
                  </div>
                  <div>
                    <span className="mr-2">🟡</span>
                    <span><span className="font-bold text-[#F59E0B]">$2,160</span> is sitting uninvoiced — generate invoices now</span>
                  </div>
                  <div>
                    <span className="mr-2">💡</span>
                    <span>Collecting everything today adds <span className="font-bold text-[#7C5CFC]">$6,400</span> to your account this week</span>
                  </div>
                </div>
                <div className="mt-5 w-full border-t border-slate-200 pt-3 text-[11px] italic text-[#6B7280]">
                  Based on June 2026 collections data
                </div>
                <div className="mt-4 flex w-full flex-wrap gap-3">
                  <ActionButton>Send All Reminders →</ActionButton>
                  <ActionButton>Generate All Invoices →</ActionButton>
                </div>
              </AiSummarySidePanel>
            ) : null}
          </div>

          {collectionsHoveredRow ? (
            <CollectionsRowTooltip
              row={collectionsHoveredRow.row}
              type={collectionsHoveredRow.type}
              position={clampTooltipPosition(collectionsMousePos, 220, 180)}
            />
          ) : null}
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

          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap gap-2">
              <Pill active={customerFilter === "All Customers"} onClick={() => setCustomerFilter("All Customers")}>All</Pill>
              <Pill active={customerFilter === "Profitable"} onClick={() => setCustomerFilter("Profitable")}>Profitable</Pill>
              <Pill active={customerFilter === "Loss Making"} onClick={() => setCustomerFilter("Loss Making")}>Loss Making</Pill>
            </div>
            <AiSummaryChip
              isOpen={customerSummaryOpen}
              onToggle={() => setCustomerSummaryOpen((value) => !value)}
            />
          </div>

          <div className={`transition-all duration-300 ${customerSummaryOpen ? "flex gap-4" : ""}`}>
            <div className={`min-w-0 rounded-2xl border border-slate-200 p-4 shadow-sm ${customerSummaryOpen ? "w-[58%] shrink-0" : "w-full"}`}>
              <CustomerIntelligenceChart data={visibleCustomerData} />
            </div>

            {customerSummaryOpen ? (
              <AiSummarySidePanel onClose={() => setCustomerSummaryOpen(false)}>
                <div className="w-full space-y-3 text-[14px] leading-6 text-[#374151]">
                  <div>
                    <span className="mr-2">🟢</span>
                    <span><span className="font-bold text-[#059669]">ABC Plumbing</span> is your best customer — <span className="font-bold text-[#059669]">$890</span> profit per job</span>
                  </div>
                  <div>
                    <span className="mr-2">🔴</span>
                    <span><span className="font-bold text-[#DC2626]">Tom Hendricks</span> is costing you money — <span className="font-bold text-[#DC2626]">$690</span> loss this month</span>
                  </div>
                  <div>
                    <span className="mr-2">🟡</span>
                    <span><span className="font-bold text-[#0B7B6B]">4 out of 5</span> customers are profitable this month</span>
                  </div>
                  <div>
                    <span className="mr-2">💡</span>
                    <span>Have a pricing conversation with <span className="font-bold text-[#7C5CFC]">Tom Hendricks</span> or revise his job estimates</span>
                  </div>
                </div>
                <div className="mt-5 w-full border-t border-slate-200 pt-3 text-[11px] italic text-[#6B7280]">
                  Based on 5 customers in June 2026
                </div>
                <div className="mt-4 flex w-full flex-wrap gap-3">
                  <ActionButton>Review Tom&apos;s Account →</ActionButton>
                  <ActionButton>View ABC Plumbing →</ActionButton>
                </div>
              </AiSummarySidePanel>
            ) : null}
          </div>
        </section>
      </div>
    </main>
  );
}

export default InsightsPage;
