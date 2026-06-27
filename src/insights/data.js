/* Dummy data only. Enriched with the plain-English copy the dashboard needs
   (signal phrases + "what to do" advice) so every component stays data-driven. */

export const data = {
  owner: "Mike",
  month: "June 2026",

  finance: {
    billed: 238311,
    billedChange: 12,
    costs: 73133,
    costsChange: 4,
    kept: 165177,
    keptChange: 18,

    // "Collected" view = money actually in the bank.
    collected: { billed: 209514, kept: 136381, keptChange: 14 },

    costBreakdown: [
      { label: "Your time", amount: 41000, status: "good", signal: "Normal" },
      {
        label: "Parts and supplies",
        amount: 24000,
        status: "warning",
        signal: "Up 18% — higher than usual",
      },
      {
        label: "Travel cost",
        amount: 8133,
        status: "warning",
        signal: "Up 22% — growing fast",
        advice: "You're spending more getting to jobs. A trip fee could help.",
      },
    ],

    profitByService: [
      { name: "Drain cleaning", profit: 94000, jobs: 32, status: "good" },
      { name: "Plumbing repair", profit: 48000, jobs: 28, status: "good" },
      {
        name: "Installations",
        profit: 23177,
        jobs: 12,
        status: "warning",
        note: "Not making much here",
      },
      {
        name: "Inspections",
        profit: -1920,
        jobs: 8,
        status: "bad",
        note: "You lost money on every inspection",
        advice: "Consider raising your inspection price or stopping them.",
      },
    ],

    stuckCash: {
      total: 8400,
      rows: [
        { key: "not-billed", label: "Not invoiced", amount: 4200, cta: "Bill now", toast: "✅ 6 invoices created!" },
        { key: "late", label: "Unpaid", amount: 2800, cta: "Send reminders", toast: "✅ Reminders sent" },
        { key: "partial", label: "Partially paid", amount: 1400, cta: "Follow up", toast: "✅ Follow-ups sent" },
      ],
    },
  },

  jobs: {
    completed: 62,
    inProgress: 15,
    notBilled: 4,

    losingJobs: [
      { name: "Inspection — Riverside Apts", lost: 45, reason: "Parts cost too much" },
      { name: "Water heater — Tom Hendricks", lost: 30, reason: "Discount and long drive" },
      { name: "Inspection — Oakwood", lost: 25, reason: "Took twice as long as planned" },
      { name: "Repair — Mike Russo", lost: 18, reason: "Had to buy emergency parts" },
    ],

    bestWork: [
      { type: "Drain cleaning", avgMade: 210, jobs: 32, status: "good" },
      { type: "Plumbing repair", avgMade: 140, jobs: 28, status: "good" },
      { type: "Installations", avgMade: 60, jobs: 12, status: "warning", note: "Low" },
      {
        type: "Inspections",
        avgMade: -24,
        jobs: 8,
        status: "bad",
        note: "Losing money",
        advice: "You lost money on all 8 inspection jobs this month.",
      },
    ],

    forgotToBill: [
      { name: "Drain repair — Sarah Johnson", amount: 850, daysAgo: 12 },
      { name: "Inspection — Oakwood HOA", amount: 1200, daysAgo: 18 },
      { name: "Repair — Mike Russo", amount: 620, daysAgo: 22 },
      { name: "Install — Riverside Apts", amount: 940, daysAgo: 31 },
      { name: "Cleaning — Tom Hendricks", amount: 380, daysAgo: 35 },
      { name: "Repair — New Customer", amount: 210, daysAgo: 41 },
    ],
  },

  customers: {
    newThisMonth: 79,
    newChange: 97,
    avgRating: 4.64,
    repeatCustomers: 34,

    profitList: [
      { name: "Oakwood HOA", made: 1840, jobs: 12, status: "good", tag: "Your best customer" },
      { name: "Sarah Johnson", made: 940, jobs: 8, status: "good", tag: "Great" },
      { name: "Mike Russo", made: 80, jobs: 6, status: "warning", tag: "Barely worth it" },
      {
        name: "Tom Hendricks",
        made: -70,
        jobs: 6,
        status: "bad",
        tag: "Costing you money",
        whyLosingMoney: [
          { reason: "Discounts you gave him", cost: 140 },
          { reason: "Travel to his place", cost: 94 },
          { reason: "Free revisit you did", cost: 80 },
        ],
        totalHiddenCost: 314,
        totalBilled: 2100,
        totalActualCost: 2380,
        advice: "Stop the discount on his next job. That alone saves $140.",
      },
    ],

    latePayers: [
      { name: "Tom Hendricks", amount: 840, daysLate: 62, status: "bad" },
      { name: "Riverside Apts", amount: 620, daysLate: 45, status: "bad" },
      { name: "Mike Russo", amount: 380, daysLate: 0, status: "warning", note: "Due in 5 days" },
      { name: "Oakwood HOA", amount: 560, daysLate: 0, status: "warning", note: "Still owes $200" },
    ],
  },

  /* AI advisor layer — plain-English insight derived from the numbers above.
     `id` links each insight to the card/section it explains. */
  ai: {
    briefing: [
      {
        id: "stuck-cash",
        priority: "critical",
        title: "$8,400 you've earned isn't in your bank yet",
        why: "6 finished jobs were never invoiced and 8 invoices are unpaid. This is money you've already earned — it's just sitting uncollected.",
        action: "Generate invoices",
        actionToast: "✅ 6 invoices created!",
      },
      {
        id: "losing-jobs",
        priority: "critical",
        title: "Every inspection lost you money this month",
        why: "All 8 inspections cost more than they earned — −$1,920 total. Your parts and time on these are higher than what you charge.",
        action: "Review pricing",
        actionToast: "✅ Opened inspection pricing",
      },
      {
        id: "tom-hendricks",
        priority: "attention",
        title: "Tom Hendricks costs more than he pays",
        why: "Discounts, travel and a free revisit added $314 of hidden cost. You billed him $2,100 but it cost $2,380 to serve him.",
        action: "Update Tom's pricing",
        actionToast: "✅ Tom's pricing updated",
      },
      {
        id: "finance",
        priority: "opportunity",
        title: "Drain cleaning is your biggest money-maker",
        why: "32 drain jobs brought in $94,000 — by far your most profitable work. Booking more of these grows your profit the fastest.",
        action: "Promote this service",
        actionToast: "✅ Drain cleaning added to your ads",
      },
    ],

    cardSummary: {
      finance:
        "You kept $165K this month, up 18%. Costs are under control — but $8,400 you've earned is still uncollected.",
      jobs:
        "62 jobs done. Drain cleaning pays best, but inspections lost money on all 8, and 4 jobs still need invoicing.",
      customers:
        "79 new customers and a 4.64★ rating. Almost everyone is profitable — only Tom Hendricks costs more than he pays.",
    },
  },
};
