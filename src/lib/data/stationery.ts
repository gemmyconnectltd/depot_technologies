import {
  Pencil, BookOpen, FileText,
  Clipboard, Highlighter, Archive,
} from "lucide-react";

import { Printer } from "lucide-react";

export const STATIONERY_PRODUCTS = [
  {
    name: "Writing Instruments",
    description:
      "Ballpoint, gel and fountain pens from "
      + "leading brands for everyday use.",
    icon: Pencil,
    iconColor: "text-stationery",
    iconBg: "bg-stationery-light",
    tags: ["Pens", "Markers", "Pencils"],
    image:
      "https://images.unsplash.com/photo-1455390582262"
      + "-e6c20523cafc?w=700&q=85",
    imageAlt: "Writing instruments and pens",
  },
  {
    name: "Notebooks & Journals",
    description:
      "Ruled, dotted and blank notebooks in "
      + "multiple sizes for every workflow.",
    icon: BookOpen,
    iconColor: "text-stationery",
    iconBg: "bg-stationery-light",
    tags: ["A4", "A5", "Hardcover"],
    image:
      "https://images.unsplash.com/photo-1544816155"
      + "-8f2b85e15b8b?w=700&q=85",
    imageAlt: "Notebooks and journals",
  },
  {
    name: "Paper & Print Media",
    description:
      "Copy paper, card stock and specialty "
      + "sheets for printers and plotters.",
    icon: FileText,
    iconColor: "text-stationery",
    iconBg: "bg-stationery-light",
    tags: ["Copy Paper", "Card Stock", "Labels"],
    image:
      "https://images.unsplash.com/photo-1586281380349"
      + "-632531db7ed4?w=700&q=85",
    imageAlt: "Paper and print media stacks",
  },
  {
    name: "Thermal & Barcode Paper",
    description:
      "Thermal paper rolls 80x80mm, barcode "
      + "labels 40x30 and 60x40 for receipts.",
    icon: Printer,
    iconColor: "text-stationery",
    iconBg: "bg-stationery-light",
    tags: ["Thermal", "Barcode", "Receipt"],
    image:
      "https://images.unsplash.com/photo-1586339949916"
      + "-3e472ed9c7bb?w=700&q=85",
    imageAlt: "Thermal paper roll for receipts",
  },
  {
    name: "Desk Organizers",
    description:
      "Trays, holders and organizers to keep "
      + "any workspace tidy and efficient.",
    icon: Clipboard,
    iconColor: "text-stationery",
    iconBg: "bg-stationery-light",
    tags: ["Trays", "Holders", "Planners"],
    image:
      "https://images.unsplash.com/photo-1593642632559"
      + "-0c6d3fc62b89?w=700&q=85",
    imageAlt: "Desk organizer on a clean workspace",
  },
  {
    name: "Highlighters & Markers",
    description:
      "Fluorescent and pastel highlighters for "
      + "colour-coded note-taking.",
    icon: Highlighter,
    iconColor: "text-stationery",
    iconBg: "bg-stationery-light",
    tags: ["Fluorescent", "Pastel", "Permanent"],
    image:
      "https://images.unsplash.com/photo-1503676260728"
      + "-1c6b73ef0c0d?w=700&q=85",
    imageAlt: "Highlighters and coloured markers",
  },
  {
    name: "Filing & Storage",
    description:
      "Folders, binders and archive boxes "
      + "built for document management.",
    icon: Archive,
    iconColor: "text-stationery",
    iconBg: "bg-stationery-light",
    tags: ["Folders", "Binders", "Archive"],
    image:
      "https://images.unsplash.com/photo-1568602471122"
      + "-7832951cc4c5?w=700&q=85",
    imageAlt: "Filing folders and storage boxes",
  },
];
