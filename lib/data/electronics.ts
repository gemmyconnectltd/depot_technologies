import {
  Printer, Camera, Headphones, Fan, Gamepad2,
  Monitor, Cpu, Wifi, Battery, Scan,
  Projector, Mouse, Cable, Car, Shield,
  Smartphone,
} from "lucide-react";

export const ELECTRONICS_PRODUCTS = [
  {
    name: "Printers & POS",
    description:
      "Touch-screen POS terminals, thermal printers, "
      + "and Epson printers for retail and office.",
    icon: Printer,
    iconColor: "text-electronics",
    iconBg: "bg-electronics-light",
    tags: ["POS", "Thermal", "Epson", "Konika"],
    image:
      "https://images.unsplash.com/photo-1612815154858"
      + "-60aa9f0b4203?w=700&q=85",
    imageAlt: "Printer and POS equipment",
  },
  {
    name: "Security Cameras",
    description:
      "FOSVision cameras, smart AI cameras, solar "
      + "cameras, and dual-lens security systems.",
    icon: Camera,
    iconColor: "text-electronics",
    iconBg: "bg-electronics-light",
    tags: ["FOSVision", "Smart AI", "Solar", "Dual Lens"],
    image:
      "https://images.unsplash.com/photo-1558002038"
      + "-105b7b6775b5?w=700&q=85",
    imageAlt: "Security camera system",
  },
  {
    name: "Headsets & Audio",
    description:
      "AirPods, JBL, Bose, Sony, and Marshall "
      + "headphones for professional and personal use.",
    icon: Headphones,
    iconColor: "text-electronics",
    iconBg: "bg-electronics-light",
    tags: ["AirPods", "JBL", "Bose", "Sony", "Marshall"],
    image:
      "https://images.unsplash.com/photo-1505740420928"
      + "-5cb2f015d0fe?w=700&q=85",
    imageAlt: "Premium headphones",
  },
  {
    name: "Fans & Air Cooling",
    description:
      "Gadery rechargeable fans, LED fans, air "
      + "circulation fans, and handheld coolers.",
    icon: Fan,
    iconColor: "text-electronics",
    iconBg: "bg-electronics-light",
    tags: ["Gadery", "Rechargeable", "LED", "Handheld"],
    image:
      "https://images.unsplash.com/photo-1585771724684"
      + "-d38262b18e6d?w=700&q=85",
    imageAlt: "Electric fan and air cooler",
  },
  {
    name: "Gaming Gadgets",
    description:
      "PlayStation consoles, controllers, game "
      + "sticks, gaming keyboards, and projectors.",
    icon: Gamepad2,
    iconColor: "text-electronics",
    iconBg: "bg-electronics-light",
    tags: ["PlayStation", "Controllers", "Gaming"],
    image:
      "https://images.unsplash.com/photo-1593305841991"
      + "-05d9b0c7b2d4?w=700&q=85",
    imageAlt: "Gaming console and accessories",
  },
  {
    name: "Laptop Batteries",
    description:
      "Replacement batteries for MacBook, HP EliteBook, "
      + "Lenovo ThinkPad, and Dell laptops.",
    icon: Battery,
    iconColor: "text-electronics",
    iconBg: "bg-electronics-light",
    tags: ["MacBook", "HP", "Lenovo", "Dell"],
    image:
      "https://images.unsplash.com/photo-1597852074816"
      + "-9cfa272dde8c?w=700&q=85",
    imageAlt: "Laptop battery replacement",
  },
  {
    name: "Videography & Lighting",
    description:
      "LED video lights, tripods, smartphone "
      + "stabilizers, and photography accessories.",
    icon: Monitor,
    iconColor: "text-electronics",
    iconBg: "bg-electronics-light",
    tags: ["LED Lights", "Tripods", "Stabilizers"],
    image:
      "https://images.unsplash.com/photo-1516035069371"
      + "-e1be4c6e9e7a?w=700&q=85",
    imageAlt: "Video lighting equipment",
  },
  {
    name: "Cables & Chargers",
    description:
      "USB-C, MagSafe, laptop adapters, iPhone "
      + "cables, and universal power accessories.",
    icon: Cable,
    iconColor: "text-electronics",
    iconBg: "bg-electronics-light",
    tags: ["USB-C", "MagSafe", "Adapters"],
    image:
      "https://images.unsplash.com/photo-1516382799247"
      + "-87df95d60097?w=700&q=85",
    imageAlt: "Cables and charging accessories",
  },
  {
    name: "Bill Counters & POS",
    description:
      "Duhan bill counting machines, currency "
      + "detectors, and cash management tools.",
    icon: Scan,
    iconColor: "text-electronics",
    iconBg: "bg-electronics-light",
    tags: ["Bill Counter", "Currency Detector"],
    image:
      "https://images.unsplash.com/photo-1591696205602"
      + "-36f1a62a4a87?w=700&q=85",
    imageAlt: "Bill counting machine",
  },
  {
    name: "Projectors",
    description:
      "LCD and LED video projectors for home "
      + "theatre, office, and classroom use.",
    icon: Projector,
    iconColor: "text-electronics",
    iconBg: "bg-electronics-light",
    tags: ["LCD", "LED", "HD"],
    image:
      "https://images.unsplash.com/photo-1527864550417"
      + "-7bb8d37c45f8?w=700&q=85",
    imageAlt: "Video projector",
  },
  {
    name: "Accessories",
    description:
      "Wireless mice, keyboards, laptop stands, "
      + "power banks, screen protectors, and cases.",
    icon: Mouse,
    iconColor: "text-electronics",
    iconBg: "bg-electronics-light",
    tags: ["Mouse", "Keyboard", "Stands", "Power Bank"],
    image:
      "https://images.unsplash.com/photo-1587829741301"
      + "-d2f3a5e4a76d?w=700&q=85",
    imageAlt: "Computer accessories",
  },
  {
    name: "Car Tools",
    description:
      "Portable power stations, car wash machines, "
      + "dash cameras, and repair tool kits.",
    icon: Car,
    iconColor: "text-electronics",
    iconBg: "bg-electronics-light",
    tags: ["Power Station", "Dash Cam", "Car Wash"],
    image:
      "https://images.unsplash.com/photo-1487754180451"
      + "-c0c3e9f7b1b5?w=700&q=85",
    imageAlt: "Car tools and accessories",
  },
  {
    name: "Aroma Diffusers",
    description:
      "Fireplace aroma diffusers, ultrasonic "
      + "humidifiers, and essential oil accessories.",
    icon: Shield,
    iconColor: "text-electronics",
    iconBg: "bg-electronics-light",
    tags: ["Aroma", "Humidifier", "Essential Oils"],
    image:
      "https://images.unsplash.com/photo-1602928298849"
      + "-513a76d1f1f7?w=700&q=85",
    imageAlt: "Aroma diffuser",
  },
];
