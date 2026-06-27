/* Lightweight inline icon set (Lucide-style strokes) — no icon library.
   Every icon inherits color via `currentColor` and sizes via `className`. */

function Svg({ children, className = "h-5 w-5", strokeWidth = 1.75 }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export const Home = (p) => (
  <Svg {...p}>
    <path d="M3 10.5 12 3l9 7.5" />
    <path d="M5 9.5V21h14V9.5" />
    <path d="M9 21v-6h6v6" />
  </Svg>
);
export const Calendar = (p) => (
  <Svg {...p}>
    <rect x="3" y="4.5" width="18" height="16" rx="2" />
    <path d="M3 9h18M8 3v4M16 3v4" />
  </Svg>
);
export const Users = (p) => (
  <Svg {...p}>
    <circle cx="9" cy="8" r="3.2" />
    <path d="M3.5 20a5.5 5.5 0 0 1 11 0" />
    <path d="M16 5.5a3 3 0 0 1 0 5.8M16.5 20a5.5 5.5 0 0 0-2-4.3" />
  </Svg>
);
export const Briefcase = (p) => (
  <Svg {...p}>
    <rect x="3" y="7.5" width="18" height="12" rx="2" />
    <path d="M9 7.5V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1.5M3 12h18" />
  </Svg>
);
export const FileText = (p) => (
  <Svg {...p}>
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
    <path d="M14 3v5h5M9 13h6M9 17h6" />
  </Svg>
);
export const Receipt = (p) => (
  <Svg {...p}>
    <path d="M5 3.5h14V21l-2.3-1.4L14.4 21l-2.4-1.4L9.6 21l-2.3-1.4L5 21z" />
    <path d="M9 8h6M9 12h6" />
  </Svg>
);
export const CreditCard = (p) => (
  <Svg {...p}>
    <rect x="3" y="5.5" width="18" height="13" rx="2" />
    <path d="M3 9.5h18M7 14.5h3" />
  </Svg>
);
export const Headset = (p) => (
  <Svg {...p}>
    <path d="M4 13v-1a8 8 0 0 1 16 0v1" />
    <rect x="3" y="13" width="3.5" height="6" rx="1.5" />
    <rect x="17.5" y="13" width="3.5" height="6" rx="1.5" />
    <path d="M20 19a3 3 0 0 1-3 3h-2" />
  </Svg>
);
export const Chat = (p) => (
  <Svg {...p}>
    <path d="M4 5.5h16a1 1 0 0 1 1 1V16a1 1 0 0 1-1 1H9l-4 3.5V17H4a1 1 0 0 1-1-1V6.5a1 1 0 0 1 1-1Z" />
  </Svg>
);
export const Megaphone = (p) => (
  <Svg {...p}>
    <path d="M4 9.5 16 5v14L4 14.5z" />
    <path d="M4 9.5H3a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h1M16 8a3.5 3.5 0 0 1 0 8M7 15v3a1.5 1.5 0 0 0 3 0v-2" />
  </Svg>
);
export const Store = (p) => (
  <Svg {...p}>
    <path d="M4 10.5V20h16v-9.5" />
    <path d="M3 6.5h18l1 4a3 3 0 0 1-6 0 3 3 0 0 1-6 0 3 3 0 0 1-6 0z" />
    <path d="M9.5 20v-5h5v5" />
  </Svg>
);
export const Mountain = (p) => (
  <Svg {...p}>
    <path d="m3 19 6.5-12 4 7 2-3.5L21 19z" />
  </Svg>
);
export const Package = (p) => (
  <Svg {...p}>
    <path d="M12 3 4 7v10l8 4 8-4V7z" />
    <path d="m4 7 8 4 8-4M12 11v10" />
  </Svg>
);
export const Layers = (p) => (
  <Svg {...p}>
    <path d="m12 3 9 5-9 5-9-5z" />
    <path d="m3 13 9 5 9-5M3 16.5l9 5 9-5" />
  </Svg>
);

export const Plus = (p) => (
  <Svg {...p}>
    <path d="M12 5v14M5 12h14" />
  </Svg>
);
export const Search = (p) => (
  <Svg {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="m21 21-4-4" />
  </Svg>
);
export const Bell = (p) => (
  <Svg {...p}>
    <path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6Z" />
    <path d="M10 19a2 2 0 0 0 4 0" />
  </Svg>
);
export const Sun = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5 19 19M19 5l-1.5 1.5M6.5 17.5 5 19" />
  </Svg>
);
export const ChevronRight = (p) => (
  <Svg {...p}>
    <path d="m9 6 6 6-6 6" />
  </Svg>
);
export const ChevronDown = (p) => (
  <Svg {...p}>
    <path d="m6 9 6 6 6-6" />
  </Svg>
);
export const Coins = (p) => (
  <Svg {...p}>
    <ellipse cx="12" cy="7" rx="7" ry="3.2" />
    <path d="M5 7v5c0 1.8 3.1 3.2 7 3.2s7-1.4 7-3.2V7" />
    <path d="M5 12v5c0 1.8 3.1 3.2 7 3.2s7-1.4 7-3.2v-5" />
  </Svg>
);
export const Star = ({ filled, ...p }) => (
  <Svg {...p}>
    <path
      d="m12 3.5 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 17l-5.2 2.6 1-5.8-4.3-4.1 5.9-.9z"
      fill={filled ? "currentColor" : "none"}
    />
  </Svg>
);
export const ReportIcon = (p) => (
  <Svg {...p}>
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
    <path d="M14 3v5h5M9 17v-3M12 17v-5M15 17v-2" />
  </Svg>
);
export const Info = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 11v5M12 8h.01" />
  </Svg>
);
export const ArrowUpRight = (p) => (
  <Svg {...p}>
    <path d="M7 17 17 7M9 7h8v8" />
  </Svg>
);
export const Settings = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 13a1.6 1.6 0 0 0 .3 1.7l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-2.7 1.1V21a2 2 0 1 1-4 0v-.1A1.6 1.6 0 0 0 7 19.4l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.6 1.6 0 0 0 4.6 11H4a2 2 0 1 1 0-4h.1A1.6 1.6 0 0 0 5.7 4.3l-.1-.1A2 2 0 1 1 8.4 1.4l.1.1A1.6 1.6 0 0 0 11 .9V1a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 2.7 1.1l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1A1.6 1.6 0 0 0 23 8h-.1" transform="scale(0.82) translate(2.6 2.6)" />
  </Svg>
);
export const PanelLeft = (p) => (
  <Svg {...p}>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="M9 4v16" />
  </Svg>
);
