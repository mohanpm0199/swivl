import { useState } from "react";
import {
  Card,
  BlockHeading,
  AlertBox,
  MoreList,
  PrimaryButton,
  money,
  useToast,
} from "./ui.jsx";

/* Jobs that lost money — the single red item in this card. Rows expand. */
function LosingJobRow({ job }) {
  const [open, setOpen] = useState(false);
  return (
    <button onClick={() => setOpen((o) => !o)} className="block w-full py-3 text-left">
      <div className="flex items-center justify-between gap-3">
        <span className="text-[15px] font-medium text-[#111827]">{job.name}</span>
        <span className="shrink-0 text-[15px] font-semibold text-[#DC2626]">
          −{money(job.lost)}
        </span>
      </div>
      <div className="mt-0.5 text-[13px] text-[#6B7280]">
        {open ? `Why: ${job.reason}` : "Tap to see why"}
      </div>
    </button>
  );
}

function LosingJobs({ losingJobs }) {
  const total = losingJobs.reduce((s, j) => s + j.lost, 0);
  return (
    <div>
      <BlockHeading>Jobs that lost money</BlockHeading>
      <AlertBox tone="bad" id="losing-jobs">
        <p className="text-[15px] font-semibold text-[#111827]">
          These {losingJobs.length} jobs cost you more than you made
        </p>
        <div className="mt-1 divide-y divide-[#FECACA]/50">
          <MoreList
            items={losingJobs}
            cap={2}
            render={(j) => <LosingJobRow key={j.name} job={j} />}
          />
        </div>
        <div className="mt-2 border-t border-[#FECACA] pt-3 text-[15px] font-semibold text-[#DC2626]">
          Total lost: {money(total)}
        </div>
      </AlertBox>
    </div>
  );
}

/* Most profitable work — muted list, no winner box (the winner lives in Finance). */
function BestWorkTypes({ bestWork }) {
  return (
    <div>
      <BlockHeading>Most profitable work</BlockHeading>
      <div className="divide-y divide-[#F3F4F6]">
        {bestWork.map((w) => {
          const neg = w.avgMade < 0;
          return (
            <div key={w.type} className="py-3">
              <div className="flex items-center justify-between gap-3">
                <span className="text-[15px] text-[#374151]">{w.type}</span>
                <span className="flex items-center gap-2 text-[15px]">
                  <span className="font-semibold text-[#111827]">
                    {neg ? "−" : ""}
                    {money(w.avgMade)} avg
                  </span>
                  <span className="text-[13px] text-[#6B7280]">{w.jobs} jobs</span>
                </span>
              </div>
              {w.note && <div className="mt-0.5 text-[13px] text-[#6B7280]">{w.note}</div>}
              {w.advice && <p className="mt-1 text-[13px] text-[#6B7280]">{w.advice}</p>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* Not invoiced yet — muted, top 3 + "3 more". */
function ForgotToBill({ forgotToBill }) {
  const notify = useToast();
  return (
    <div>
      <BlockHeading>Not invoiced yet</BlockHeading>
      <div className="rounded-xl border border-gray-100 bg-[#FAFAFA] p-4">
        <p className="text-[15px] font-semibold text-[#111827]">
          You finished these but never sent an invoice
        </p>
        <div className="mt-2 divide-y divide-[#F3F4F6]">
          <MoreList
            items={forgotToBill}
            cap={3}
            render={(j) => (
              <div key={j.name} className="py-3">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[15px] font-medium text-[#111827]">{j.name}</span>
                  <span className="shrink-0 text-[15px] font-semibold text-[#111827]">
                    {money(j.amount)}
                  </span>
                </div>
                <div className="mt-0.5 text-[13px] text-[#6B7280]">
                  {j.daysAgo} days ago{j.daysAgo > 30 ? " · getting old" : ""}
                </div>
              </div>
            )}
          />
        </div>
        <div className="mt-4">
          <PrimaryButton onClick={() => notify(`✅ ${forgotToBill.length} invoices sent!`)}>
            Send all {forgotToBill.length} invoices now
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}

export default function JobsCard({ jobs, aiSummary, open, onToggle }) {
  const headline = (
    <div className="text-[16px] text-[#374151]">
      <span className="font-bold text-[#111827]">{jobs.completed}</span> done ·{" "}
      <span className="font-bold text-[#111827]">{jobs.inProgress}</span> in progress ·{" "}
      <span className="font-bold text-[#111827]">{jobs.notBilled}</span> not billed ⚠️
    </div>
  );

  return (
    <Card
      id="jobs"
      title="Your jobs this month"
      headline={headline}
      aiSummary={aiSummary}
      open={open}
      onToggle={onToggle}
    >
      <LosingJobs losingJobs={jobs.losingJobs} />
      <BestWorkTypes bestWork={jobs.bestWork} />
      <ForgotToBill forgotToBill={jobs.forgotToBill} />
    </Card>
  );
}
