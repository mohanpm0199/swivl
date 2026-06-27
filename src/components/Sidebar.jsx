import { useState } from "react";
import * as Icons from "../icons.jsx";
import { navSections, createMenu } from "../data.js";

/* Small colored pill used for AI / NEW / SOON badges. */
function Badge({ children, tone = "violet" }) {
  const tones = {
    violet: "bg-violet-100 text-violet-700",
    amber: "bg-amber-100 text-amber-700",
    slate: "bg-slate-100 text-slate-500",
  };
  return (
    <span
      className={`ml-auto rounded-full px-2 py-0.5 text-[10px] font-semibold ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

function NavItem({ item, active, onClick, collapsed }) {
  const Icon = Icons[item.icon];
  return (
    <button
      onClick={onClick}
      className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
        active
          ? "bg-cyan-50 font-semibold text-teal-700"
          : "text-slate-600 hover:bg-slate-50"
      }`}
    >
      {Icon && <Icon className="h-[18px] w-[18px] shrink-0" />}
      {!collapsed && <span className="truncate">{item.label}</span>}

      {item.badge && (
        <Badge tone={item.badge === "NEW" ? "amber" : "violet"}>
          {item.badge === "AI" ? "✦ AI" : item.badge}
        </Badge>
      )}
      {item.count != null && (
        <span className="ml-auto flex items-center gap-1 rounded-full bg-red-50 px-1.5 py-0.5 text-[10px] font-semibold text-red-500">
          <Icons.Headset className="h-3 w-3" />
          {item.count}
        </span>
      )}
      {item.soon && (
        <span className="ml-auto flex items-center gap-1 text-[10px] font-medium text-slate-400">
          ● SOON
        </span>
      )}
      {item.chevron && !item.badge && (
        <Icons.ChevronRight className="ml-auto h-4 w-4 text-slate-300" />
      )}
    </button>
  );
}

export default function Sidebar({ activeView = "dashboard", onNavigate = () => {}, collapsed = false, onToggleCollapsed = () => {} }) {
  const [createOpen, setCreateOpen] = useState(false);
  const [tab, setTab] = useState("workspace");

  return (
    <aside className={`flex shrink-0 flex-col border-r border-slate-200 bg-white transition-all duration-200 ${collapsed ? "w-20" : "w-64"}`}>
      {/* Brand */}
      <div className="flex items-center gap-3 px-4 py-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400 to-yellow-500 text-sm font-bold text-white">
          Y
        </div>
        {!collapsed && (
          <div className="min-w-0">
            <div className="truncate text-sm font-bold text-slate-900">
              Yellow Plum Grocers Co
            </div>
            <div className="text-xs text-slate-400">Scale Pro</div>
          </div>
        )}
      </div>

      {/* Chat | Workspace toggle */}
      {!collapsed && <div className="px-3">
        <div className="flex rounded-lg bg-slate-100 p-1 text-sm font-medium">
          {[
            ["chat", "Chat"],
            ["workspace", "Workspace"],
          ].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`flex-1 rounded-md py-1.5 transition ${
                tab === key
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>}

      {/* Create button + dropdown */}
      <div className="relative px-3 py-3">
        <button
          onClick={() => setCreateOpen((o) => !o)}
          className={`flex w-full items-center justify-center gap-2 rounded-xl bg-teal-700 px-3 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-800 ${collapsed ? "" : ""}`}
        >
          <Icons.Plus className="h-5 w-5" />
          {!collapsed && "Create"}
        </button>

        {createOpen && (
          <div className="absolute left-3 right-3 top-full z-20 mt-1 rounded-xl border border-slate-200 bg-white py-2 shadow-lg">
            <div className="px-3 pb-1 text-xs font-medium text-slate-400">
              Create
            </div>
            {createMenu.map((m) => {
              const Icon = Icons[m.icon];
              return (
                <button
                  key={m.label}
                  className="flex w-full items-center gap-3 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                >
                  {Icon && <Icon className="h-[18px] w-[18px] text-slate-500" />}
                  {m.label}
                  {m.badge && <Badge tone="amber">✦ {m.badge}</Badge>}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 pb-4">
        {navSections.map((item, i) => {
          if (item.divider)
            return <div key={i} className="my-2 border-t border-slate-100" />;
          return (
            <div key={item.key}>
              <NavItem
                item={item}
                active={activeView === item.key}
                onClick={() => onNavigate(item.key)}
                collapsed={collapsed}
              />
              {item.children && item.expanded && (
                <div className="ml-9 mt-0.5 space-y-0.5">
                  {item.children.map((c) => (
                    <button
                      key={c.key}
                      onClick={() => onNavigate(c.key)}
                      className={`block w-full rounded-md px-3 py-1.5 text-left text-sm transition ${
                        activeView === c.key
                          ? "font-semibold text-teal-700"
                          : "text-slate-500 hover:text-slate-700"
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <div className="mt-2 border-t border-slate-100 px-3 py-3">
        <button
          onClick={() => onNavigate("insights")}
          className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${activeView === "insights" ? "bg-cyan-50 font-semibold text-teal-700" : "text-slate-600 hover:bg-slate-50"}`}
        >
          <span className="text-[15px] leading-none">✨</span>
          {!collapsed && <span className="truncate">Insights</span>}
        </button>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3">
        {!collapsed && <span className="text-lg font-bold text-teal-700">Swivl</span>}
        <button onClick={onToggleCollapsed} className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-600">
          {collapsed ? "Expand" : "Minimize"} <Icons.PanelLeft className={`h-4 w-4 transition-transform ${collapsed ? "rotate-180" : ""}`} />
        </button>
      </div>
    </aside>
  );
}
