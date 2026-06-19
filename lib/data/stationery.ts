import {
  Pencil,
  BookOpen,
  FileText,
  Clipboard,
  Highlighter,
  Archive,
} from "lucide-react";

export const STATIONERY_PRODUCTS = [
  {
    name: "Writing Instruments",
    description:
      "Ballpoint, gel and fountain pens from "
      + "leading brands for everyday use.",
    icon: Pencil,
    iconColor: "text-sky-600",
    iconBg: "bg-sky-50",
    tags: ["Pens", "Markers", "Pencils"],
    image:
      "https://images.unsplash.com/photo-1583485088034"
      + "-d0fa312f9e4f?w=600&q=80",
    imageAlt: "Writing instruments and pens",
  },
  {
    name: "Notebooks & Journals",
    description:
      "Ruled, dotted and blank notebooks in "
      + "multiple sizes for every workflow.",
    icon: BookOpen,
    iconColor: "text-sky-600",
    iconBg: "bg-sky-50",
    tags: ["A4", "A5", "Hardcover"],
    image:
      "https://images.unsplash.com/photo-1531346878377"
      + "-a272ccfb5b43?w=600&q=80",
    imageAlt: "Notebooks and journals",
  },
  {
    name: "Paper & Print Media",
    description:
      "Copy paper, card stock and specialty "
      + "sheets for printers and plotters.",
    icon: FileText,
    iconColor: "text-sky-600",
    iconBg: "bg-sky-50",
    tags: ["Copy Paper", "Card Stock", "Labels"],
    image:
      "https://images.unsplash.com/photo-1568667256549"
      + "-b64bc5e12dac?w=600&q=80",
    imageAlt: "Paper and print media",
  },
  {
    name: "Desk Organizers",
    description:
      "Trays, holders and organizers to keep "
      + "any workspace tidy and efficient.",
    icon: Clipboard,
    iconColor: "text-sky-600",
    iconBg: "bg-sky-50",
    tags: ["Trays", "Holders", "Planners"],
    image:
      "https://images.unsplash.com/photo-1606761568499"
      + "-6ff64e4e8e3b?w=600&q=80",
    imageAlt: "Desk organizer and workspace",
  },
  {
    name: "Highlighters & Markers",
    description:
      "Fluorescent and pastel highlighters for "
      + "colour-coded note-taking.",
    icon: Highlighter,
    iconColor: "text-sky-600",
    iconBg: "bg-sky-50",
    tags: ["Fluorescent", "Pastel", "Permanent"],
    image:
      "https://images.unsplash.com/photo-1471897488648"
      + "-d3d1e2f6aa94?w=600&q=80",
    imageAlt: "Highlighters and markers",
  },
  {
    name: "Filing & Storage",
    description:
      "Folders, binders and archive boxes "
      + "built for document management.",
    icon: Archive,
    iconColor: "text-sky-600",
    iconBg: "bg-sky-50",
    tags: ["Folders", "Binders", "Archive"],
    image:
      "https://images.unsplash.com/photo-1568667256549"
      + "-b64bc5e12dac?w=600&q=80",
    imageAlt: "Filing and storage solutions",
  },
];
