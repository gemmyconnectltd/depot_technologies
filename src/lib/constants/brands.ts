import { Headphones, Camera, Printer, Monitor, Cpu, Fan, Shield, Speaker } from "lucide-react";
import type { ComponentType } from "react";

export interface BrandConfig {
  name: string;
  slug: string;
  description: string;
  category: "ELECTRONICS" | "STATIONERY" | "SOFTWARE";
  icon: ComponentType<{ size?: number; className?: string }>;
  image: string;
  imageAlt: string;
}

export const BRANDS: BrandConfig[] = [
  {
    name: "Apple",
    slug: "apple",
    description: "Premium audio, accessories and mobile devices",
    category: "ELECTRONICS",
    icon: Speaker,
    image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=600&q=85",
    imageAlt: "Apple products on a desk",
  },
  {
    name: "Sony",
    slug: "sony",
    description: "Professional audio and consumer electronics",
    category: "ELECTRONICS",
    icon: Headphones,
    image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=600&q=85",
    imageAlt: "Sony headphones",
  },
  {
    name: "JBL",
    slug: "jbl",
    description: "Portable speakers and professional audio gear",
    category: "ELECTRONICS",
    icon: Speaker,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&q=85",
    imageAlt: "JBL portable speaker",
  },
  {
    name: "Bose",
    slug: "bose",
    description: "Noise-cancelling headphones and premium sound",
    category: "ELECTRONICS",
    icon: Headphones,
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&q=85",
    imageAlt: "Bose headphones",
  },
  {
    name: "Marshall",
    slug: "marshall",
    description: "Iconic amplifiers and headphones",
    category: "ELECTRONICS",
    icon: Speaker,
    image: "https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=600&q=85",
    imageAlt: "Marshall speaker",
  },
  {
    name: "HP",
    slug: "hp",
    description: "Printers, computers and enterprise hardware",
    category: "ELECTRONICS",
    icon: Printer,
    image: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=600&q=85",
    imageAlt: "HP printer",
  },
  {
    name: "Epson",
    slug: "epson",
    description: "Printers, projectors and POS solutions",
    category: "ELECTRONICS",
    icon: Printer,
    image: "https://images.unsplash.com/photo-1591728422833-1b4f6f0b6283?w=600&q=85",
    imageAlt: "Epson printer on desk",
  },
  {
    name: "Dell",
    slug: "dell",
    description: "Business laptops, desktops and workstations",
    category: "ELECTRONICS",
    icon: Monitor,
    image: "https://images.unsplash.com/photo-1593642702749-b7d2a804fbcf?w=600&q=85",
    imageAlt: "Dell laptop on desk",
  },
  {
    name: "Lenovo",
    slug: "lenovo",
    description: "ThinkPad laptops and enterprise computing",
    category: "ELECTRONICS",
    icon: Monitor,
    image: "https://images.unsplash.com/photo-1530893609608-32a9af3aa95c?w=600&q=85",
    imageAlt: "Lenovo ThinkPad laptop",
  },
  {
    name: "Logitech",
    slug: "logitech",
    description: "Keyboards, mice, webcams and peripherals",
    category: "ELECTRONICS",
    icon: Cpu,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&q=85",
    imageAlt: "Logitech keyboard and mouse",
  },
  {
    name: "Konica Minolta",
    slug: "konica-minolta",
    description: "Office printers, copiers and document solutions",
    category: "ELECTRONICS",
    icon: Printer,
    image: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=600&q=85",
    imageAlt: "Office printer",
  },
  {
    name: "FujiFilm",
    slug: "fujifilm",
    description: "Cameras, instant film and imaging solutions",
    category: "ELECTRONICS",
    icon: Camera,
    image: "https://images.unsplash.com/photo-1581591524437-ae2f81106953?w=600&q=85",
    imageAlt: "FujiFilm camera",
  },
  {
    name: "Gadery",
    slug: "gadery",
    description: "Cooling fans, climate control and home appliances",
    category: "ELECTRONICS",
    icon: Fan,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=85",
    imageAlt: "Gadery fan",
  },
  {
    name: "FOSVision",
    slug: "fosvision",
    description: "Security cameras, dash cams and surveillance",
    category: "ELECTRONICS",
    icon: Shield,
    image: "https://images.unsplash.com/photo-1558001373-7b93ee48ffa0?w=600&q=85",
    imageAlt: "Security camera",
  },
  {
    name: "Xprinter",
    slug: "xprinter",
    description: "Thermal printers, POS printers and barcode scanners",
    category: "ELECTRONICS",
    icon: Printer,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=85",
    imageAlt: "Xprinter thermal printer",
  },
  {
    name: "P70E",
    slug: "p70e",
    description: "Professional POS terminals with dual screens",
    category: "ELECTRONICS",
    icon: Cpu,
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=85",
    imageAlt: "POS terminal",
  },
] as const;
