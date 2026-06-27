import {
  Card,
  BlockHeading,
  WinnerBox,
  MoreList,
  PrimaryButton,
  money,
  signed,
  useToast,
} from "./ui.jsx";

/* Expanded "why is Tom costing you money" panel — only on tap. */
function WhyLosing({ c }) {
  const notify = useToast();
  const first = c.name.split(" ")[0];
  return (
    <div className="mt-2 rounded-xl border border-[#FECACA] bg-[#FEF2F2] p-4">
      <p className="text-[15px] font-semibold text-[#111827]">Here's why {first} is costing you</p>
      <div className="mt-3 space-y-2">
        {c.whyLosingMoney.map((w) => (
          <div key={w.reason} className="flex justify-between text-[15px] text-[#374151]">
            <span>{w.reason}</span>
            <span className="font-medium text-[#DC2626]">−{money(w.cost)}</span>
          </div>
        ))}
        <div className="flex justify-between border-t border-[#FECACA] pt-2 text-[15px] font-semibold">
          <span className="text-[#111827]">Extra cost you absorbed</span>
          <span className="text-[#DC2626]">−{money(c.totalHiddenCost)}</span>
        </div>
      </div>

      <div className="mt-3 space-y-1 text-[15px]">
        <div className="flex justify-between text-[#374151]">
          <span>He paid you</span>
          <span className="font-medium">{money(c.totalBilled)}</span>
        </div>
        <div className="flex justify-between text-[#374151]">
          <span>It cost you to serve him</span>
          <span className="font-medium">{money(c.totalActualCost)}</span>
        </div>
      </div>

      <div className="mt-3 rounded-lg bg-white p-3">
        <div className="text-[13px] font-medium text-[#6B7280]">What to do</div>
        <p className="mt-1 text-[15px] text-[#374151]">{c.advice}</p>
      </div>

      <div className="mt-3">
        <PrimaryButton onClick={() => notify(`✅ ${first}'s pricing updated`)}>
          Update {first}'s pricing →
        </PrimaryButton>
      </div>
    </div>
  );
}

function CustomerRow({ c, open, onToggle }) {
  const neg = c.made < 0;
  const expandable = c.status === "bad";
  return (
    <div
      id={c.name === "Tom Hendricks" ? "tom-hendricks" : undefined}
      className="scroll-mt-4 py-3"
    >
      <button
        onClick={expandable ? onToggle : undefined}
        className={`flex w-full items-center justify-between gap-3 text-left ${
          expandable ? "" : "cursor-default"
        }`}
      >
        <span className="text-[15px] font-medium text-[#111827]">{c.name}</span>
        <span className="flex items-center gap-2 text-[15px]">
          <span className={`font-semibold ${neg ? "text-[#DC2626]" : "text-[#111827]"}`}>
            {signed(c.made)}
          </span>
          <span className="text-[13px] text-[#6B7280]">{c.jobs} jobs</span>
          {expandable && <span>🔴</span>}
        </span>
      </button>
      <div className={`mt-0.5 text-[13px] font-medium ${expandable ? "text-[#DC2626]" : "text-[#6B7280]"}`}>
        {c.tag}
        {expandable && (
          <span className="text-[#6B7280]"> · {open ? "tap to hide" : "tap to see why"}</span>
        )}
      </div>
      {expandable && open && <WhyLosing c={c} />}
    </div>
  );
}

/* Top customers — one winner box, then top 2 + "1 more" (Tom). */
function CustomerProfitability({ list, tomOpen, setTomOpen, showAll, setShowAll }) {
  const winner = list.reduce((a, b) => (b.made > a.made ? b : a));
  const rest = list.filter((c) => c !== winner);

  return (
    <div>
      <BlockHeading>Top customers</BlockHeading>
      <WinnerBox
        emoji="🏆"
        headline={`${winner.name} is your best customer`}
        sub={`${winner.jobs} jobs · ${money(winner.made)} from them`}
      />
      <div className="mt-2 divide-y divide-[#F3F4F6]">
        <MoreList
          items={rest}
          cap={2}
          open={showAll}
          setOpen={setShowAll}
          render={(c) => (
            <CustomerRow
              key={c.name}
              c={c}
              open={c.status === "bad" ? tomOpen : false}
              onToggle={() => setTomOpen((o) => !o)}
            />
          )}
        />
      </div>
    </div>
  );
}

/* Waiting on payment — muted, top 2 + "2 more". */
function LatePayments({ latePayers }) {
  const notify = useToast();
  const total = latePayers.reduce((s, p) => s + p.amount, 0);
  return (
    <div>
      <BlockHeading>Waiting on payment</BlockHeading>
      <div className="divide-y divide-[#F3F4F6]">
        <MoreList
          items={latePayers}
          cap={2}
          render={(p) => {
            const detail = p.daysLate > 0 ? `${p.daysLate} days late` : p.note;
            return (
              <div key={p.name} className="flex items-center justify-between gap-2 py-3">
                <div>
                  <div className="text-[15px] font-medium text-[#111827]">{p.name}</div>
                  <div className="text-[13px] text-[#6B7280]">
                    {money(p.amount)} · {detail}
                  </div>
                </div>
                <button
                  onClick={() => notify("✅ Reminder sent")}
                  className="shrink-0 rounded-lg border border-[#0F766E] px-3 py-1.5 text-[13px] font-medium text-[#0F766E] transition active:scale-95"
                >
                  Send reminder
                </button>
              </div>
            );
          }}
        />
      </div>
      <p className="mt-3 text-[15px] font-semibold text-[#111827]">Total unpaid: {money(total)}</p>
      <div className="mt-3">
        <PrimaryButton onClick={() => notify(`✅ Reminders sent to ${latePayers.length} customers`)}>
          Send reminder to all
        </PrimaryButton>
      </div>
    </div>
  );
}

export default function CustomersCard({ customers, aiSummary, open, onToggle, tomOpen, setTomOpen, showAll, setShowAll }) {
  const headline = (
    <div className="text-[16px] text-[#374151]">
      <span className="font-bold text-[#111827]">{customers.newThisMonth}</span> new ·{" "}
      <span className="font-bold text-[#111827]">{customers.avgRating}★</span> ·{" "}
      <span className="font-bold text-[#111827]">{customers.repeatCustomers}</span> came back ✅
    </div>
  );

  return (
    <Card
      id="customers"
      title="Your customers this month"
      headline={headline}
      aiSummary={aiSummary}
      open={open}
      onToggle={onToggle}
    >
      <CustomerProfitability
        list={customers.profitList}
        tomOpen={tomOpen}
        setTomOpen={setTomOpen}
        showAll={showAll}
        setShowAll={setShowAll}
      />
      <LatePayments latePayers={customers.latePayers} />
    </Card>
  );
}
