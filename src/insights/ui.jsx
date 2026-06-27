import { createContext, useCallback, useContext, useRef, useState } from "react";
import { ChevronDown } from "../icons.jsx";

/* ---------- formatting helpers ---------- */
export const money = (n) => "$" + Math.round(Math.abs(n)).toLocaleString("en-US");
export const compactK = (n) => "$" + Math.round(n / 1000) + "K";
export const signed = (n) => (n < 0 ? "−" : "+") + money(n);

/* ---------- toast ---------- */
const ToastCtx = createContext(() => {});
export const useToast = () => useContext(ToastCtx);

export function ToastProvider({ children }) {
  const [msg, setMsg] = useState(null);
  const timer = useRef();
  const notify = useCallback((m) => {
    setMsg(m);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setMsg(null), 2200);
  }, []);
  return (
    <ToastCtx.Provider value={notify}>
      {children}
      <div
        className={`pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4 transition-all duration-200 ${
          msg ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
        }`}
      >
        {msg && (
          <div className="rounded-xl bg-[#111827] px-5 py-3 text-[15px] font-medium text-white shadow-lg">
            {msg}
          </div>
        )}
      </div>
    </ToastCtx.Provider>
  );
}

/* ---------- collapsible card ---------- */
export function Card({ id, title, headline, aiSummary, open, onToggle, toggleLabel = "Show details", footer, children }) {
  const collapsible = typeof onToggle === "function";
  return (
    <section
      id={id}
      className="flex h-full flex-col scroll-mt-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <button
        onClick={onToggle}
        disabled={!collapsible}
        className="flex w-full items-center justify-between gap-3 text-left"
      >
        <h2 className="text-[18px] font-semibold text-[#111827]">{title}</h2>
        {collapsible && (
          <ChevronDown
            className={`h-5 w-5 text-[#9CA3AF] transition-transform ${open ? "rotate-180" : ""}`}
          />
        )}
      </button>

      {headline && <div className="mt-4">{headline}</div>}

      {collapsible && (
        <button
          onClick={onToggle}
          className="mt-4 inline-flex items-center gap-1 text-[14px] font-medium text-[#0B7B6B]"
        >
          {open ? "Hide" : toggleLabel}
          <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
      )}

      {(!collapsible || open) && <div className="mt-5 flex-1 space-y-6">{children}</div>}

      {footer}
    </section>
  );
}

export function AiInsightsBox({ children }) {
  return (
    <div className="mt-4 rounded-lg border border-[#E0D9FF] bg-[#F5F3FF] p-3">
      <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7C5CFC]">
        ✨ AI Insights
      </div>
      <div className="space-y-1.5">{children}</div>
    </div>
  );
}

export function InsightLink({ children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline cursor-pointer font-medium text-[#0B7B6B] underline decoration-[#0B7B6B]/70 underline-offset-2"
    >
      {children}
    </button>
  );
}

function InsightListRow({ icon, label, value, tone = "neutral" }) {
  const valueClass =
    tone === "red"
      ? "text-[#DC2626]"
      : tone === "green"
      ? "text-[#059669]"
      : "text-[#111827]";

  return (
    <div className="flex items-center justify-between gap-3 py-1 text-[15px] text-[#6B7280]">
      <div className="flex items-center gap-2">
        {icon ? <span className="leading-none">{icon}</span> : null}
        <span className="font-normal">{label}</span>
      </div>
      {value ? <span className={`text-[16px] font-bold ${valueClass}`}>{value}</span> : null}
    </div>
  );
}

export function InsightModal({ isOpen, onClose, title, items = [], footer, buttonLabel = "View Full Breakdown in Insights →" }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex cursor-pointer items-center justify-center bg-black/40 px-4 py-6 backdrop-blur-[6px]"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl rounded-[14px] border border-slate-200 bg-white shadow-[0_0_40px_rgba(124,92,252,0.25),0_20px_60px_rgba(0,0,0,0.15)]"
        style={{
          borderTop: "3px solid transparent",
          backgroundImage: "linear-gradient(white, white), linear-gradient(90deg, #7C5CFC 0%, #0B7B6B 100%)",
          backgroundOrigin: "border-box",
          backgroundClip: "padding-box, border-box",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-6 py-4">
          <h3 className="text-[18px] font-semibold text-[#111827]">{title}</h3>
          <div className="inline-flex rounded-full border border-[#E0D9FF] bg-[#F5F3FF] px-2.5 py-1 text-[11px] font-semibold text-[#7C5CFC]">
            ✨ AI
          </div>
          <button type="button" onClick={onClose} className="cursor-pointer text-[22px] font-semibold leading-none text-slate-500">
            ×
          </button>
        </div>

        <div className="px-6 py-5">
          <div className="space-y-3">
            {items.map((item, index) =>
              item?.divider ? (
                <div key={index} className="my-3 border-t border-slate-200" />
              ) : (
                <InsightListRow
                  key={index}
                  icon={item?.icon}
                  label={item?.label}
                  value={item?.value}
                  tone={item?.tone}
                />
              )
            )}
            {footer && (
              <div className={`mt-3 border-t border-slate-200 pt-3 text-[15px] font-semibold ${footer.tone === "red" ? "text-red-600" : footer.tone === "teal" ? "text-[#0B7B6B]" : "text-[#111827]"}`}>
                {footer.label}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end border-t border-slate-200 px-6 py-4">
          <button type="button" onClick={onClose} className="cursor-pointer rounded-lg bg-[#0B7B6B] px-4 py-2 text-[14px] font-semibold text-white">
            {buttonLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

/* Sentence-case block heading - quiet, not shouty. */
export function BlockHeading({ children }) {
  return (
    <h3 className="mb-3 text-[14px] font-medium text-[#6B7280]">{children}</h3>
  );
}

/* The one allowed winner highlight per card. */
export function WinnerBox({ emoji, headline, sub }) {
  return (
    <div className="rounded-xl border-l-[3px] border-[#A7F3D0] bg-[#ECFDF5] px-4 py-3">
      <div className="flex items-start gap-2">
        <span className="text-lg leading-none">{emoji}</span>
        <div>
          <div className="text-[15px] font-semibold text-[#111827]">{headline}</div>
          <div className="mt-0.5 text-[13px] text-[#374151]">{sub}</div>
        </div>
      </div>
    </div>
  );
}

/* Tinted alert box with a 3px left border. */
export function AlertBox({ tone = "bad", children, id }) {
  const border = tone === "bad" ? "border-[#FECACA]" : "border-[#FCD34D]";
  const bg = tone === "bad" ? "bg-[#FEF2F2]" : "bg-[#FFFBEB]";
  return (
    <div id={id} className={`scroll-mt-4 rounded-xl border-l-[3px] ${border} ${bg} p-4`}>
      {children}
    </div>
  );
}

/* Shows the first `cap` items, then a "N more" toggle. Optionally controlled
   via open/setOpen so a parent (the morning alert) can force-reveal. */
export function MoreList({ items, cap, render, open, setOpen, moreLabel }) {
  const [localOpen, setLocalOpen] = useState(false);
  const isOpen = open != null ? open : localOpen;
  const toggle = setOpen || setLocalOpen;
  const shown = isOpen ? items : items.slice(0, cap);
  const hidden = items.length - cap;
  return (
    <>
      {shown.map(render)}
      {hidden > 0 && (
        <button
          onClick={() => toggle((o) => !o)}
          className="w-full py-3 text-left text-[14px] font-medium text-[#0B7B6B]"
        >
          {isOpen ? "Show less" : moreLabel || `${hidden} more`}
        </button>
      )}
    </>
  );
}

/* ---------- AI advisor primitives ---------- */
export const PRIORITY = {
  critical: { label: "Critical", text: "text-[#DC2626]", bg: "bg-[#FEF2F2]", border: "border-[#FECACA]", dot: "🔴" },
  attention: { label: "Attention needed", text: "text-[#B45309]", bg: "bg-[#FFFBEB]", border: "border-[#FCD34D]", dot: "⚠️" },
  opportunity: { label: "Opportunity", text: "text-[#0F766E]", bg: "bg-[#ECFDF5]", border: "border-[#A7F3D0]", dot: "💡" },
};

export function PriorityPill({ p }) {
  const s = PRIORITY[p];
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ${s.bg} ${s.text}`}>
      {s.dot} {s.label}
    </span>
  );
}

export function AiTag() {
  return (
    <span className="inline-flex items-center gap-1 rounded-md bg-violet-50 px-1.5 py-0.5 text-[11px] font-semibold text-violet-700">
      ✨ AI
    </span>
  );
}

/* Compact filled action button (the recommended next step on an insight). */
export function ActionButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="shrink-0 rounded-lg bg-[#0B7B6B] px-3 py-1.5 text-[13px] font-medium text-white transition active:scale-95"
    >
      {children}
    </button>
  );
}

/* Full-width primary button. */
export function PrimaryButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full rounded-xl bg-[#0B7B6B] px-4 py-3 text-[15px] font-medium text-white transition active:scale-[0.98]"
    >
      {children}
    </button>
  );
}
