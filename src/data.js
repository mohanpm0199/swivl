/* Hardcoded dummy data, matching the Swivl dashboard reference. */

export const dashboardData = {
  finance: {
    // Accrual basis (what's been billed/earned)
    accrual: {
      revenue: 238311.59,
      costs: 73133.69,
      netIncome: 165177.9,
      netMargin: 69.3,
    },
    // Cash basis (what's actually moved)
    cash: {
      revenue: 209514.0,
      costs: 73133.69,
      netIncome: 136380.31,
      netMargin: 65.1,
    },
    // Tiny chart series (per a few days in the month) — revenue vs costs.
    series: [
      { day: "2", revenue: 95, costs: 12 },
      { day: "6", revenue: 8, costs: 18 },
      { day: "10", revenue: 14, costs: 6 },
      { day: "14", revenue: 4, costs: 3 },
      { day: "18", revenue: 22, costs: 9 },
      { day: "22", revenue: 11, costs: 5 },
      { day: "26", revenue: 6, costs: 4 },
    ],
  },
  jobs: {
    created: 15,
    createdChange: -78.57,
    open: 15,
    closed: 0,
  },
  customers: {
    totalNew: 79,
    totalNewChange: 97.5,
    avgRating: 4.64,
    smsSent: 382,
  },
};

/* Sidebar navigation model — drives the whole left rail. */
export const navSections = [
  { key: "dashboard", label: "Dashboard", icon: "Home" },
  { key: "scheduler", label: "Scheduler", icon: "Calendar" },
  { key: "clients", label: "Clients", icon: "Users", chevron: true },
  { key: "work-order", label: "Work Order", icon: "Briefcase", chevron: true },
  { key: "estimates", label: "Estimates", icon: "FileText", badge: "AI" },
  { key: "invoices", label: "Invoices", icon: "Receipt" },
  { key: "payments", label: "Payments", icon: "CreditCard" },
  { divider: true },
  { key: "ai-receptionist", label: "AI Receptionist", icon: "Headset", count: 7 },
  { key: "message-center", label: "Message Center", icon: "Chat", soon: true },
  {
    key: "marketing",
    label: "Marketing",
    icon: "Megaphone",
    expanded: true,
    children: [
      { key: "ai-website-builder", label: "AI Website Builder" },
      { key: "reviews", label: "Reviews" },
      { key: "max-ads", label: "MAX Ads" },
    ],
  },
  { key: "marketplace", label: "Marketplace", icon: "Store", badge: "NEW" },
  { key: "swivl-max", label: "Swivl MAX", icon: "Mountain", badge: "AI", chevron: true },
  { key: "products", label: "Product & Services", icon: "Package" },
  { key: "inventory", label: "Inventory", icon: "Layers", chevron: true },
];

export const createMenu = [
  { label: "Customer", icon: "Users" },
  { label: "Task", icon: "FileText" },
  { label: "Job", icon: "Briefcase" },
  { label: "AI Estimate", icon: "FileText", badge: "New" },
  { label: "Estimate", icon: "FileText" },
  { label: "Invoice", icon: "Receipt" },
];
