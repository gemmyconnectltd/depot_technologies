export const CATEGORY_CONFIG = {
  stationery: {
    label: "Stationery",
    description:
      "Pens, paper, notebooks and office supplies",
    href: "/stationery",
    iconColor: "text-sky-600",
    iconBg: "bg-sky-50",
    accentText: "text-sky-600",
    accentBorder: "border-sky-200",
    accentBg: "bg-sky-50",
  },
  electronics: {
    label: "Electronics",
    description:
      "Devices, components, cables and hardware",
    href: "/electronics",
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50",
    accentText: "text-blue-600",
    accentBorder: "border-blue-200",
    accentBg: "bg-blue-50",
  },
  software: {
    label: "Software & Projects",
    description:
      "Licenses, subscriptions and digital assets",
    href: "/software",
    iconColor: "text-violet-600",
    iconBg: "bg-violet-50",
    accentText: "text-violet-600",
    accentBorder: "border-violet-200",
    accentBg: "bg-violet-50",
  },
} as const;

export type Category = keyof typeof CATEGORY_CONFIG;
