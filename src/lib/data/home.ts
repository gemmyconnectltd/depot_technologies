import {
  ShieldCheck, Zap, HeadphonesIcon, Package,
} from "lucide-react";
import { CATEGORY_CONFIG } from "@/lib/constants/categories";

export const CATEGORIES = Object.values(CATEGORY_CONFIG);

export const STATS = [
  { value: "1000+", label: "Products Available", color: "text-electronics" },
  { value: "3",    label: "Categories",          color: "text-software" },
  { value: "98%",  label: "Client Satisfaction", color: "text-stationery" },
  { value: "24h",  label: "Avg. Fulfilment",     color: "text-electronics" },
];

export const FEATURES = [
  {
    icon: ShieldCheck,
    iconColor: "text-electronics",
    iconBg: "bg-electronics-light",
    title: "Trusted Quality",
    body: "Every product vetted from certified suppliers.",
  },
  {
    icon: Zap,
    iconColor: "text-software",
    iconBg: "bg-software-light",
    title: "Fast Fulfilment",
    body: "Orders delivered so your team never stops.",
  },
  {
    icon: HeadphonesIcon,
    iconColor: "text-stationery",
    iconBg: "bg-stationery-light",
    title: "Dedicated Support",
    body: "A real team ready to help at any time.",
  },
  {
    icon: Package,
    iconColor: "text-electronics",
    iconBg: "bg-electronics-light",
    title: "Bulk Pricing",
    body: "Flexible pricing for materials at scale.",
  },
];

export const TRUST_POINTS = [
  "Certified supplier network",
  "Bulk order discounts",
  "Dedicated account manager",
  "Same-day quote turnaround",
  "Nationwide delivery across Rwanda",
  "After-sales support",
];
