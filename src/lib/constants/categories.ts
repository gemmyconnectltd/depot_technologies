import { Pencil, Cpu, Code2 } from "lucide-react";

export const CATEGORY_CONFIG = {
  stationery: {
    label: "Stationery",
    description:
      "Pens, paper, notebooks and office supplies",
    href: "/stationery",
    icon: Pencil,
    iconColor: "text-stationery",
    iconBg: "bg-stationery-light",
    accentBar: "bg-stationery-bar",
    image:
      "https://images.unsplash.com/photo-1497032628192"
      + "-ba57e72b8178?w=800&q=85",
    imageAlt: "Stationery supplies on a desk",
  },
  electronics: {
    label: "Electronics",
    description:
      "Devices, components, cables and hardware",
    href: "/electronics",
    icon: Cpu,
    iconColor: "text-electronics",
    iconBg: "bg-electronics-light",
    accentBar: "bg-electronics-bar",
    image:
      "https://images.unsplash.com/photo-1518770660439"
      + "-4636190af475?w=800&q=85",
    imageAlt: "Electronics components and circuit board",
  },
  software: {
    label: "Software & Projects",
    description:
      "Licenses, subscriptions and digital assets",
    href: "/software",
    icon: Code2,
    iconColor: "text-software",
    iconBg: "bg-software-light",
    accentBar: "bg-software-bar",
    image:
      "https://images.unsplash.com/photo-1461749280684"
      + "-1bb17baa3a72?w=800&q=85",
    imageAlt: "Software code on a screen",
  },
} as const;

export type Category = keyof typeof CATEGORY_CONFIG;
