import type {
  Category,
  StockStatus,
  OrderStatus,
  RFQStatus,
  PaymentMethod,
  PaymentStatus,
  Role,
} from "@/prisma/generated/client";

export type { Category, StockStatus, OrderStatus, RFQStatus };

// ─── Product ──────────────────────────────────────────────────

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  isPrimary: boolean;
  order: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: Category;
  brand: string | null;
  sku: string;
  retailPrice: number;
  bulkPrice: number | null;
  bulkMinQty: number | null;
  stockStatus: StockStatus;
  featured: boolean;
  images: ProductImage[];
  inventory: { quantity: number } | null;
}

export interface ProductCard {
  id: string;
  name: string;
  slug: string;
  category: Category;
  retailPrice: number;
  stockStatus: StockStatus;
  image: string;
  imageAlt: string;
}

// ─── Cart ─────────────────────────────────────────────────────

export interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  product: ProductCard;
}

export interface Cart {
  id: string;
  items: CartItem[];
  total: number;
}

// ─── Order ────────────────────────────────────────────────────

export interface OrderItem {
  id: string;
  productId: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  product: { name: string; image: string };
}

export interface Order {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  subtotal: number;
  tax: number;
  total: number;
  createdAt: string;
  items: OrderItem[];
}

// ─── RFQ ──────────────────────────────────────────────────────

export interface RFQItem {
  productId: string;
  quantity: number;
  notes?: string;
}

export interface RFQ {
  id: string;
  rfqNumber: string;
  status: RFQStatus;
  notes?: string;
  budget?: number;
  deliveryDate?: string;
  createdAt: string;
  items: RFQItem[];
}

// ─── User ─────────────────────────────────────────────────────

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  role: Role;
  image: string | null;
}

// ─── Address ──────────────────────────────────────────────────

export interface Address {
  id: string;
  label: string | null;
  line1: string;
  line2: string | null;
  city: string;
  state: string | null;
  country: string;
  postalCode: string | null;
  isDefault: boolean;
}

// ─── Payment ──────────────────────────────────────────────────

export interface Payment {
  id: string;
  method: PaymentMethod;
  status: PaymentStatus;
  amount: number;
  reference: string | null;
  paidAt: string | null;
}

// ─── API Response ─────────────────────────────────────────────

export type ApiResponse<T> =
  | { data: T; error: null }
  | { data: null; error: string };
