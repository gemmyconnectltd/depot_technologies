type Category = "STATIONERY" | "ELECTRONICS" | "SOFTWARE";
type StockStatus = "IN_STOCK" | "LOW_STOCK" | "OUT_OF_STOCK";

interface ProductImage {
  id: string;
  url: string;
  alt: string;
  isPrimary: boolean;
  order: number;
}

export interface ProductDetail {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: Category;
  brand: string;
  sku: string;
  retailPrice: number;
  bulkPrice: number | null;
  bulkMinQty: number | null;
  images: ProductImage[];
  specs: Record<string, string>;
  features: string[];
  stockStatus: StockStatus;
  relatedProductIds: string[];
}

export const PRODUCTS: ProductDetail[] = [
  {
    id: "prod-001",
    name: "Touch Screen POS Terminal (P70E)",
    slug: "touch-screen-pos-terminal-p70e",
    description:
      "A high-performance touch screen POS terminal designed for retail and hospitality businesses. "
      + "Features an intuitive interface, durable construction, and seamless integration "
      + "with popular POS software. Supports multiple payment methods and comes with "
      + "a built-in thermal printer slot.",
    category: "ELECTRONICS",
    brand: "ELOHOME",
    sku: "POS-P70E-001",
    retailPrice: 550000,
    bulkPrice: 500000,
    bulkMinQty: 5,
    images: [
      {
        id: "img-001a",
        url: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=85",
        alt: "Touch Screen POS Terminal P70E",
        isPrimary: true,
        order: 0,
      },
      {
        id: "img-001b",
        url: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=85",
        alt: "POS Terminal side view",
        isPrimary: false,
        order: 1,
      },
      {
        id: "img-001c",
        url: "https://images.unsplash.com/photo-1612815154858-60aa9f0b4203?w=800&q=85",
        alt: "POS Terminal in use",
        isPrimary: false,
        order: 2,
      },
    ],
    specs: {
      "Display": "15.6-inch IPS touchscreen, 1920×1080",
      "Processor": "Quad-core Cortex-A72, 1.8GHz",
      "RAM": "4GB DDR4",
      "Storage": "64GB eMMC",
      "OS": "Android 11 / Windows 11 IoT",
      "Connectivity": "Wi-Fi 6, Bluetooth 5.0, Gigabit Ethernet",
      "Ports": "USB 3.0 × 4, RJ45, HDMI, Audio jack",
      "Power": "DC 12V/3A",
      "Warranty": "1 year",
    },
    features: [
      "Seamless payment integration with card and mobile money",
      "Built-in thermal printer support (80mm)",
      "Customer-facing display option for marketing",
      "Cloud-based dashboard for real-time sales tracking",
      "Supports offline mode for uninterrupted operation",
      "Durable splash-proof design for busy environments",
    ],
    stockStatus: "IN_STOCK",
    relatedProductIds: ["prod-002", "prod-010"],
  },
  {
    id: "prod-002",
    name: "Xprinter XP-365B Thermal Printer",
    slug: "xprinter-xp-365b-thermal-printer",
    description:
      "High-speed thermal receipt printer ideal for POS systems, retail counters, "
      + "and kitchen order printing. The XP-365B delivers crisp, smudge-free prints "
      + "at 300mm per second with reliable auto-cutter technology.",
    category: "ELECTRONICS",
    brand: "Xprinter",
    sku: "XPR-365B-002",
    retailPrice: 130000,
    bulkPrice: 115000,
    bulkMinQty: 10,
    images: [
      {
        id: "img-002a",
        url: "https://images.unsplash.com/photo-1612815154858-60aa9f0b4203?w=800&q=85",
        alt: "Xprinter XP-365B Thermal Printer",
        isPrimary: true,
        order: 0,
      },
      {
        id: "img-002b",
        url: "https://images.unsplash.com/photo-1612815154858-60aa9f0b4203?w=800&q=85",
        alt: "Thermal printer side view",
        isPrimary: false,
        order: 1,
      },
    ],
    specs: {
      "Print Speed": "300mm/s",
      "Print Width": "80mm (72mm effective)",
      "Resolution": "203 DPI",
      "Interface": "USB + Ethernet + Serial",
      "Auto-Cutter": "Yes, 1.5 million cuts",
      "Emulation": "ESC/POS, STAR, BIXOLON",
      "Paper Type": "Thermal roll, 80×80mm",
      "Power": "DC 24V/2.5A",
      "Warranty": "1 year",
    },
    features: [
      "Ultra-fast 300mm/s print speed for busy queues",
      "Auto-cutter with jam protection",
      "Multiple interface options for flexible setup",
      "Supports ESC/POS command set for broad compatibility",
      "Compact design saves counter space",
      "Low noise operation",
    ],
    stockStatus: "IN_STOCK",
    relatedProductIds: ["prod-001", "prod-010"],
  },
  {
    id: "prod-003",
    name: "Epson L8058 Ink Tank Printer",
    slug: "epson-l8058-ink-tank-printer",
    description:
      "High-capacity ink tank printer from Epson with built-in Wi-Fi, "
      + "borderless photo printing, and super-fast A4 printing. The L8058 "
      + "delivers up to 6000 pages with a single ink set, making it perfect "
      + "for high-volume office and studio use.",
    category: "ELECTRONICS",
    brand: "Epson",
    sku: "EPS-L8058-003",
    retailPrice: 550000,
    bulkPrice: 520000,
    bulkMinQty: 3,
    images: [
      {
        id: "img-003a",
        url: "https://images.unsplash.com/photo-1504275490777-45f30792f13f?w=800&q=85",
        alt: "Epson L8058 Ink Tank Printer",
        isPrimary: true,
        order: 0,
      },
      {
        id: "img-003b",
        url: "https://images.unsplash.com/photo-1504275490777-45f30792f13f?w=800&q=85",
        alt: "Epson Printer side view",
        isPrimary: false,
        order: 1,
      },
    ],
    specs: {
      "Print Technology": "Inkjet (6-color ink tank)",
      "Print Speed": "37ppm (black), 22ppm (colour)",
      "Max Resolution": "5760 × 1440 DPI",
      "Connectivity": "Wi-Fi 5, USB 2.0, Ethernet",
      "Paper Sizes": "A4, A5, A6, B5, Envelopes",
      "Borderless Print": "Up to A4",
      "Ink Capacity": "6000 pages (black), 5400 pages (colour)",
      "Display": "2.4-inch LCD",
      "Warranty": "2 years",
    },
    features: [
      "Ultra-low cost per page with high-capacity ink tank system",
      "Borderless photo printing up to A4 size",
      "Built-in Wi-Fi for wireless printing from any device",
      "Auto document feeder for multi-page scanning",
      "6-color ink system for vibrant photo quality",
      "Easy refill system with spill-free design",
    ],
    stockStatus: "IN_STOCK",
    relatedProductIds: ["prod-002", "prod-011"],
  },
  {
    id: "prod-004",
    name: "FOSVision 8MP Solar Security Camera",
    slug: "fosvision-8mp-solar-security-camera",
    description:
      "Wireless 8MP solar-powered security camera from FOSVision with "
      + "4K ultra HD resolution, colour night vision, and AI-powered "
      + "human detection. Fully self-sustaining with integrated solar panel — "
      + "no wiring needed.",
    category: "ELECTRONICS",
    brand: "FOSVision",
    sku: "FOS-8MP-SOL-004",
    retailPrice: 200000,
    bulkPrice: 180000,
    bulkMinQty: 10,
    images: [
      {
        id: "img-004a",
        url: "https://images.unsplash.com/photo-1558002038-105b7b6775b5?w=800&q=85",
        alt: "FOSVision 8MP Solar Security Camera",
        isPrimary: true,
        order: 0,
      },
      {
        id: "img-004b",
        url: "https://images.unsplash.com/photo-1558002038-105b7b6775b5?w=800&q=85",
        alt: "Solar camera installation view",
        isPrimary: false,
        order: 1,
      },
    ],
    specs: {
      "Resolution": "8MP (3840 × 2160) 4K Ultra HD",
      "Night Vision": "Colour night vision up to 30m",
      "Field of View": "120° wide angle",
      "Power": "Integrated solar panel + rechargeable battery",
      "Battery Life": "7 days full charge (no sun)",
      "Storage": "MicroSD up to 256GB + cloud storage",
      "AI Detection": "Human, vehicle, pet detection",
      "Weather Rating": "IP66 weatherproof",
      "Connectivity": "Wi-Fi 2.4GHz, two-way audio",
      "Warranty": "1 year",
    },
    features: [
      "100% wireless with integrated solar panel for self-sustaining power",
      "4K ultra HD resolution for crystal clear footage",
      "Colour night vision — see details even in complete darkness",
      "AI-powered detection reduces false alerts from leaves or animals",
      "Two-way audio for real-time communication with visitors",
      "IP66 weatherproof rated for outdoor installation",
    ],
    stockStatus: "IN_STOCK",
    relatedProductIds: ["prod-010", "prod-005"],
  },
  {
    id: "prod-005",
    name: "Gadery 4-in-1 Rechargeable LED Fan",
    slug: "gadery-4-in-1-rechargeable-led-fan",
    description:
      "Versatile 4-in-1 rechargeable fan from Gadery featuring bright "
      + "LED lighting, power bank functionality, and adjustable speed "
      + "settings. Perfect for camping, power outages, outdoor events, "
      + "and personal cooling anywhere.",
    category: "ELECTRONICS",
    brand: "Gadery",
    sku: "GAD-4IN1-LED-005",
    retailPrice: 70000,
    bulkPrice: 60000,
    bulkMinQty: 20,
    images: [
      {
        id: "img-005a",
        url: "https://images.unsplash.com/photo-1585771724684-d38262b18e6d?w=800&q=85",
        alt: "Gadery 4-in-1 Rechargeable LED Fan",
        isPrimary: true,
        order: 0,
      },
      {
        id: "img-005b",
        url: "https://images.unsplash.com/photo-1585771724684-d38262b18e6d?w=800&q=85",
        alt: "Fan with LED light on",
        isPrimary: false,
        order: 1,
      },
    ],
    specs: {
      "Battery": "7.4V 4400mAh lithium-ion",
      "Runtime": "4-12 hours (fan only), 8-24 hours (LED only)",
      "Charging": "USB-C, 5V/2A, full charge in 4 hours",
      "Fan Speeds": "3 adjustable speed levels",
      "LED Modes": "Warm, cool, and night light modes",
      "Power Bank": "USB-A output for phone charging",
      "Weight": "1.2kg",
      "Material": "ABS + aluminium alloy",
      "Warranty": "6 months",
    },
    features: [
      "4-in-1 function: fan, LED lantern, power bank, and night light",
      "4400mAh battery provides extended runtime for all-night use",
      "USB-C charging and USB-A power bank output",
      "3 speed settings and multiple lighting modes",
      "Lightweight and portable with built-in hanging hook",
      "Whisper-quiet operation at lowest speed",
    ],
    stockStatus: "IN_STOCK",
    relatedProductIds: ["prod-004", "prod-009"],
  },
  {
    id: "prod-006",
    name: "AirPods Max with Smart Case",
    slug: "airpods-max-with-smart-case",
    description:
      "Premium over-ear headphones with Apple's H1 chip for exceptional "
      + "sound quality, active noise cancellation, and spatial audio. "
      + "Includes the Smart Case for ultralow power storage. "
      + "Genuine Apple product with full warranty.",
    category: "ELECTRONICS",
    brand: "Apple",
    sku: "APL-AIRPODSMAX-006",
    retailPrice: 30000,
    bulkPrice: null,
    bulkMinQty: null,
    images: [
      {
        id: "img-006a",
        url: "https://images.unsplash.com/photo-1505740420928-5cb2f015d0fe?w=800&q=85",
        alt: "AirPods Max with Smart Case",
        isPrimary: true,
        order: 0,
      },
      {
        id: "img-006b",
        url: "https://images.unsplash.com/photo-1505740420928-5cb2f015d0fe?w=800&q=85",
        alt: "AirPods Max side view",
        isPrimary: false,
        order: 1,
      },
    ],
    specs: {
      "Driver": "Apple-designed 40mm dynamic driver",
      "Chip": "Apple H1 (10 audio cores)",
      "Noise Control": "Active Noise Cancellation + Transparency mode",
      "Audio": "Spatial audio with dynamic head tracking",
      "Battery Life": "20 hours (ANC on)",
      "Charging": "Lightning, 5 min charge = 1.5 hours playback",
      "Weight": "386g",
      "Connectivity": "Bluetooth 5.0, Class 1",
      "Warranty": "1 year",
    },
    features: [
      "Active Noise Cancellation blocks external noise completely",
      "Transparency mode lets ambient sound in when needed",
      "Spatial audio with dynamic head tracking for immersive sound",
      "H1 chip enables seamless iCloud device switching",
      "Memory foam ear cushions for all-day comfort",
      "Digital crown for precise volume and playback control",
    ],
    stockStatus: "LOW_STOCK",
    relatedProductIds: ["prod-009", "prod-007"],
  },
  {
    id: "prod-007",
    name: "PlayStation 5 DualSense Controller",
    slug: "playstation-5-dualsense-controller",
    description:
      "Official Sony DualSense wireless controller for PlayStation 5. "
      + "Features immersive haptic feedback, adaptive triggers, and a "
      + "built-in microphone. Compatible with PS5 consoles, PC, and "
      + "mobile devices via Bluetooth.",
    category: "ELECTRONICS",
    brand: "Sony",
    sku: "SONY-DS5-007",
    retailPrice: 110000,
    bulkPrice: 100000,
    bulkMinQty: 6,
    images: [
      {
        id: "img-007a",
        url: "https://images.unsplash.com/photo-1593305841991-05d9b0c7b2d4?w=800&q=85",
        alt: "PlayStation 5 DualSense Controller",
        isPrimary: true,
        order: 0,
      },
      {
        id: "img-007b",
        url: "https://images.unsplash.com/photo-1593305841991-05d9b0c7b2d4?w=800&q=85",
        alt: "DualSense controller top view",
        isPrimary: false,
        order: 1,
      },
    ],
    specs: {
      "Compatibility": "PS5, PC (Windows), Android, iOS",
      "Connectivity": "Bluetooth 5.1, USB-C, 3.5mm audio jack",
      "Battery": "1560mAh rechargeable lithium-ion",
      "Battery Life": "12-15 hours continuous play",
      "Features": "Haptic feedback, adaptive triggers, gyroscope",
      "Audio": "Built-in microphone + 3.5mm headset jack",
      "Weight": "280g",
      "Colour": "White / Midnight Black optional",
      "Warranty": "1 year",
    },
    features: [
      "Immersive haptic feedback with nuanced vibration patterns",
      "Adaptive triggers with dynamic resistance for realistic feel",
      "Built-in microphone array for voice chat without headset",
      "USB-C charging with fast charge support",
      "Gyroscope and accelerometer for motion controls",
      "Touchpad expands gameplay interaction options",
    ],
    stockStatus: "IN_STOCK",
    relatedProductIds: ["prod-006", "prod-009"],
  },
  {
    id: "prod-008",
    name: "FujiFilm Instax Mini SE Camera",
    slug: "fujifilm-instax-mini-se-camera",
    description:
      "Instant film camera from FujiFilm that produces credit-card-sized "
      + "prints instantly. The Mini SE features automatic exposure, "
      + "a selfie mirror, and fun shooting modes. Includes a stylish "
      + "carry strap and 20 sheets of Instax Mini film.",
    category: "STATIONERY",
    brand: "FujiFilm",
    sku: "FUJI-MINISE-008",
    retailPrice: 250000,
    bulkPrice: 230000,
    bulkMinQty: 5,
    images: [
      {
        id: "img-008a",
        url: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&q=85",
        alt: "FujiFilm Instax Mini SE Camera",
        isPrimary: true,
        order: 0,
      },
      {
        id: "img-008b",
        url: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&q=85",
        alt: "Instax Mini SE side view",
        isPrimary: false,
        order: 1,
      },
    ],
    specs: {
      "Film": "Instax Mini (credit-card-size, 54×86mm)",
      "Lens": "60mm f/12.7 (2 elements, 2 components)",
      "Exposure": "Automatic, ±2/3 EV manual compensation",
      "Shutter": "Programmed electronic, 1/2 to 1/400 sec",
      "Flash": "Built-in, automatic, effective 0.3-2.7m",
      "Focus": "Fixed focus (0.3m to infinity)",
      "Power": "2 × AA alkaline batteries",
      "Film Pack": "10 sheets per pack",
      "Warranty": "6 months",
    },
    features: [
      "Instant print in approximately 90 seconds",
      "Automatic exposure for perfectly lit photos every time",
      "Built-in selfie mirror for easy self-portraits",
      "Multiple shooting modes including macro and landscape",
      "Compact and lightweight design for everyday carry",
      "Compatible with all Instax Mini film varieties",
    ],
    stockStatus: "IN_STOCK",
    relatedProductIds: ["prod-006", "prod-009"],
  },
  {
    id: "prod-009",
    name: "Marshall Major IV Headphones",
    slug: "marshall-major-iv-headphones",
    description:
      "Iconic over-ear headphones from Marshall with improved ergonomics, "
      + "80+ hours of wireless playtime, and quick-charge technology. "
      + "Foldable design for portability with signature Marshall sound — "
      + "rich bass, clear mids, and detailed highs.",
    category: "ELECTRONICS",
    brand: "Marshall",
    sku: "MAR-MAJOR4-009",
    retailPrice: 30000,
    bulkPrice: 27000,
    bulkMinQty: 10,
    images: [
      {
        id: "img-009a",
        url: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&q=85",
        alt: "Marshall Major IV Headphones",
        isPrimary: true,
        order: 0,
      },
      {
        id: "img-009b",
        url: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&q=85",
        alt: "Marshall headphones folded",
        isPrimary: false,
        order: 1,
      },
    ],
    specs: {
      "Driver": "40mm dynamic drivers",
      "Frequency Response": "20Hz - 20kHz",
      "Impedance": "32Ω",
      "Sensitivity": "99dB SPL",
      "Battery Life": "80+ hours wireless",
      "Charging": "USB-C, 20 min = 15 hours (quick charge)",
      "Connectivity": "Bluetooth 5.0, 3.5mm wired mode",
      "Weight": "165g",
      "Warranty": "1 year",
    },
    features: [
      "80+ hours of wireless playtime on a single charge",
      "Quick-charge: 20 minutes gives 15 hours of playback",
      "Signature Marshall sound with enhanced bass response",
      "Foldable design with magnetic ear cups for portability",
      "Multi-directional control knob for playback and calls",
      "Wireless and wired dual-mode connectivity",
    ],
    stockStatus: "IN_STOCK",
    relatedProductIds: ["prod-006", "prod-007"],
  },
  {
    id: "prod-010",
    name: "Duhan S500 Bill Counter Machine",
    slug: "duhan-s500-bill-counter-machine",
    description:
      "Professional-grade bill counter from Duhan with UV/MG/IR "
      + "counterfeit detection, batch counting, and add-up modes. "
      + "The S500 handles up to 1500 notes per minute with hopper "
      + "capacity of 500 notes — essential for retail, banks, "
      + "and high-cash-volume businesses.",
    category: "ELECTRONICS",
    brand: "Duhan",
    sku: "DUH-S500-010",
    retailPrice: 200000,
    bulkPrice: 180000,
    bulkMinQty: 5,
    images: [
      {
        id: "img-010a",
        url: "https://images.unsplash.com/photo-1591696205602-36f1a62a4a87?w=800&q=85",
        alt: "Duhan S500 Bill Counter Machine",
        isPrimary: true,
        order: 0,
      },
      {
        id: "img-010b",
        url: "https://images.unsplash.com/photo-1591696205602-36f1a62a4a87?w=800&q=85",
        alt: "Bill counter with notes",
        isPrimary: false,
        order: 1,
      },
    ],
    specs: {
      "Counting Speed": "1500 notes/minute",
      "Hopper Capacity": "500 notes",
      "Stacker Capacity": "200 notes",
      "Detection": "UV, MG, IR, and magnetic counterfeit detection",
      "Display": "Large LED display with count and batch info",
      "Modes": "Count, batch, add, sort, and manual",
      "Currency": "Multi-currency compatible (programmable)",
      "Power": "AC 220V/50Hz",
      "Warranty": "1 year",
    },
    features: [
      "Ultra-fast counting at 1500 notes per minute",
      "4-way counterfeit detection (UV, MG, IR, Magnetic)",
      "Batch mode for automatic note bundling",
      "Add-up mode accumulates counts across multiple batches",
      "Large LED display for easy reading from distance",
      "Supports multiple currencies with programmable settings",
    ],
    stockStatus: "IN_STOCK",
    relatedProductIds: ["prod-001", "prod-002"],
  },
  {
    id: "prod-011",
    name: "A10 LCD HD Multimedia Projector",
    slug: "a10-lcd-hd-multimedia-projector",
    description:
      "Affordable LCD HD projector perfect for home theatre, classroom "
      + "presentations, and outdoor movie nights. The A10 delivers "
      + "720p native resolution, 3200 lumens brightness, and supports "
      + "HDMI, USB, and AV inputs for versatile connectivity.",
    category: "ELECTRONICS",
    brand: "ELOHOME",
    sku: "ELO-A10-LCD-011",
    retailPrice: 170000,
    bulkPrice: 155000,
    bulkMinQty: 10,
    images: [
      {
        id: "img-011a",
        url: "https://images.unsplash.com/photo-1527864550417-7bb8d37c45f8?w=800&q=85",
        alt: "A10 LCD HD Projector",
        isPrimary: true,
        order: 0,
      },
      {
        id: "img-011b",
        url: "https://images.unsplash.com/photo-1527864550417-7bb8d37c45f8?w=800&q=85",
        alt: "Projector side view",
        isPrimary: false,
        order: 1,
      },
    ],
    specs: {
      "Display Technology": "LCD",
      "Native Resolution": "1280 × 720 (720p HD)",
      "Brightness": "3200 lumens",
      "Contrast Ratio": "2000:1",
      "Lamp Life": "50000 hours (LED)",
      "Projection Size": "40-200 inches",
      "Inputs": "HDMI × 2, USB × 2, AV, VGA",
      "Audio": "Built-in 5W speaker × 2",
      "Warranty": "1 year",
    },
    features: [
      "720p HD resolution with vibrant colour reproduction",
      "3200 lumens brightness for use in partially lit rooms",
      "50,000-hour LED lamp life — virtually maintenance-free",
      "Multiple input options including dual HDMI ports",
      "Built-in dual 5W speakers for immersive audio",
      "Compact and lightweight design with carrying case included",
    ],
    stockStatus: "LOW_STOCK",
    relatedProductIds: ["prod-003", "prod-008"],
  },
];

export function getProductBySlug(slug: string): ProductDetail | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductsByCategory(
  category: Category
): ProductDetail[] {
  return PRODUCTS.filter((p) => p.category === category);
}

export function getProductById(
  id: string
): ProductDetail | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function getRelatedProducts(
  productId: string
): ProductDetail[] {
  const product = getProductById(productId);
  if (!product) return [];
  return product.relatedProductIds
    .map((id) => getProductById(id))
    .filter((p): p is ProductDetail => p !== undefined);
}
