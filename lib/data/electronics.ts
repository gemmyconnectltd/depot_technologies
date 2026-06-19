import {
  Cpu,
  Monitor,
  Cable,
  HardDrive,
  Wifi,
  Battery,
} from "lucide-react";

export const ELECTRONICS_PRODUCTS = [
  {
    name: "Computing Devices",
    description:
      "Laptops, desktops and workstations "
      + "from top-tier manufacturers.",
    icon: Monitor,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50",
    tags: ["Laptops", "Desktops", "Workstations"],
    image:
      "https://images.unsplash.com/photo-1496181133206"
      + "-80ce9b88a853?w=600&q=80",
    imageAlt: "Laptop computer on a desk",
  },
  {
    name: "Processors & Components",
    description:
      "CPUs, GPUs, RAM and motherboards "
      + "for custom builds and upgrades.",
    icon: Cpu,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50",
    tags: ["CPUs", "GPUs", "RAM"],
    image:
      "https://images.unsplash.com/photo-1518770660439"
      + "-4636190af475?w=600&q=80",
    imageAlt: "Computer processor and components",
  },
  {
    name: "Cables & Connectors",
    description:
      "HDMI, USB-C, Ethernet and power cables "
      + "for every connectivity need.",
    icon: Cable,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50",
    tags: ["HDMI", "USB-C", "Ethernet"],
    image:
      "https://images.unsplash.com/photo-1558618666"
      + "-fcd25c85cd64?w=600&q=80",
    imageAlt: "Cables and connectors",
  },
  {
    name: "Storage Solutions",
    description:
      "SSDs, HDDs and NAS drives for fast "
      + "and reliable data storage.",
    icon: HardDrive,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50",
    tags: ["SSD", "HDD", "NAS"],
    image:
      "https://images.unsplash.com/photo-1531492894831"
      + "-48892e75c9e8?w=600&q=80",
    imageAlt: "Hard drive storage device",
  },
  {
    name: "Networking Hardware",
    description:
      "Routers, switches and access points "
      + "to build reliable networks.",
    icon: Wifi,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50",
    tags: ["Routers", "Switches", "Access Points"],
    image:
      "https://images.unsplash.com/photo-1544197150"
      + "-58ab2b40e712?w=600&q=80",
    imageAlt: "Network router and hardware",
  },
  {
    name: "Power & UPS",
    description:
      "Power supplies, UPS units and surge "
      + "protectors for uninterrupted uptime.",
    icon: Battery,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50",
    tags: ["UPS", "PSU", "Surge Protectors"],
    image:
      "https://images.unsplash.com/photo-1619642751034"
      + "-d5dc84a66b3d?w=600&q=80",
    imageAlt: "Power supply unit",
  },
];
