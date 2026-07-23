export const COLORS = {
  background: "#f8fafc",
  surface: "#ffffff",
  border: "#e5e7eb",
  primary: "#2563eb",
  primarySoft: "#bfdbfe",
  success: "#16a34a",
  successSoft: "#dcfce7",
  danger: "#dc2626",
  dangerSoft: "#fee2e2",
  income: "#22c55e",
  expense: "#ef4444",
  mutedText: "#64748b",
  secondaryText: "#6b7280",
  tertiaryText: "#94a3b8",
  shadow: "#000000",
  white: "#ffffff",
  black: "#000000",
} as const;

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 10,
  lg: 12,
  xl: 14,
  xxl: 15,
  xxxl: 16,
  huge: 20,
  giant: 24,
  massive: 30,
} as const;

export const TYPOGRAPHY = {
  title: {
    fontSize: 28,
    fontWeight: "700" as const,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700" as const,
  },
  body: {
    fontSize: 16,
    fontWeight: "600" as const,
  },
  caption: {
    fontSize: 12,
    fontWeight: "500" as const,
  },
} as const;

export const RADIUS = {
  sm: 10,
  md: 12,
  lg: 14,
  xl: 16,
  xxl: 20,
  pill: 30,
  round: 999,
} as const;

export const TRANSACTION_FILTERS = ["all", "income", "expense"] as const;
export const TRANSACTION_SORT_OPTIONS = [
  { label: "Newest", value: "newest" },
  { label: "Oldest", value: "oldest" },
  { label: "Highest", value: "highest" },
  { label: "Lowest", value: "lowest" },
] as const;
