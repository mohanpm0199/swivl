import * as Icons from "../icons.jsx";

function IconButton({ children, badge }) {
  return (
    <button className="relative rounded-full p-2 text-slate-500 transition hover:bg-slate-100">
      {children}
      {badge != null && (
        <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-teal-600 px-1 text-[10px] font-bold text-white">
          {badge}
        </span>
      )}
    </button>
  );
}

export default function Topbar() {
  return (
    <header className="flex items-center gap-4 border-b border-slate-200 bg-white px-6 py-3">
      <span className="text-sm font-medium text-slate-500">Dashboard</span>

      {/* Search */}
      <div className="relative mx-auto w-full max-w-xl">
        <Icons.Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          placeholder="Search"
          className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-teal-400 focus:bg-white"
        />
      </div>

      {/* Right cluster */}
      <div className="flex items-center gap-2">
        <button className="flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-50 px-3 py-1.5 text-sm font-semibold text-amber-700">
          <Icons.Coins className="h-4 w-4" />
          14,827
          <Icons.ChevronDown className="h-3.5 w-3.5" />
        </button>
        <IconButton>
          <Icons.Sun className="h-5 w-5" />
        </IconButton>
        <IconButton badge={88}>
          <Icons.Bell className="h-5 w-5" />
        </IconButton>
        <IconButton badge={7}>
          <Icons.Chat className="h-5 w-5" />
        </IconButton>
        <div className="ml-1 h-9 w-9 rounded-full bg-gradient-to-br from-teal-400 to-cyan-600" />
      </div>
    </header>
  );
}
