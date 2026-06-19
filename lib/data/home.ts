import {
  Pencil,
  Cpu,
  Code2,
  ShieldCheck,
  Zap,
  HeadphonesIcon,
  Package,
} from "lucide-react";

export const CATEGORIES = [
  {
    label: "Stationery",
    description:
      "Pens, paper, notebooks and office supplies "
      + "for every workspace.",
    href: "/stationery",
    icon: Pencil,
    iconColor: "text-sky-600",
    iconBg: "bg-sky-50",
    accentBorder: "border-sky-400",
    image:
      "https://images.unsplash.com/photo-1589497684027"
      + "-0bedc47b11eb?w=600&q=80",
    imageAlt: "Stationery supplies on a desk",
  },
  {
    label: "Electronics",
    description:
      "Devices, components, cables and hardware "
      + "built for performance.",
    href: "/electronics",
    icon: Cpu,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50",
    accentBorder: "border-blue-500",
    image:
      "https://images.unsplash.com/photo-1518770660439"
      + "-4636190af475?w=600&q=80",
    imageAlt: "Electronics components and circuit board",
  },
  {
    label: "Software & Projects",
    description:
      "Licenses, subscriptions and digital assets "
      + "for modern teams.",
    href: "/software",
    icon: Code2,
    iconColor: "text-violet-600",
    iconBg: "bg-violet-50",
    accentBorder: "border-violet-500",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c"
      + "?w=600&q=80",
    imageAlt: "Software code on a screen",
  },
];

export const STATS = [
  { value: "500+", label: "Products Available", color: "text-blue-600" },
  { value: "3", label: "Categories", color: "text-violet-600" },
  { value: "98%", label: "Client Satisfaction", color: "text-sky-600" },
  { value: "24h", label: "Avg. Fulfilment", color: "text-indigo-600" },
];

export const FEATURES = [
  {
    icon: ShieldCheck,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50",
    title: "Trusted Quality",
    body: "Every product vetted from certified suppliers.",
  },
  {
    icon: Zap,
    iconColor: "text-violet-600",
    iconBg: "bg-violet-50",
    title: "Fast Fulfilment",
    body: "Orders delivered quickly so your team never stops.",
  },
  {
    icon: HeadphonesIcon,
    iconColor: "text-sky-600",
    iconBg: "bg-sky-50",
    title: "Dedicated Support",
    body: "A real team ready to help you at any time.",
  },
  {
    icon: Package,
    iconColor: "text-indigo-600",
    iconBg: "bg-indigo-50",
    title: "Bulk Pricing",
    body: "Flexible pricing for materials at scale.",
  },
];

export const TRUST_POINTS = [
  "Certified supplier network",
  "Bulk order discounts",
  "Dedicated account manager",
  "Same-day quote turnaround",
  "Nationwide delivery",
  "After-sales support",
];
