import { z } from "zod";

// ─── Product ──────────────────────────────────────────────────

export const createProductSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  category: z.enum(["STATIONERY", "ELECTRONICS", "SOFTWARE"]),
  brand: z.string().optional(),
  sku: z.string().min(1),
  retailPrice: z.number().positive(),
  bulkPrice: z.number().positive().optional(),
  bulkMinQty: z.number().int().positive().optional(),
  stockQuantity: z.number().int().min(0).default(0),
  lowThreshold: z.number().int().min(1).default(10),
  featured: z.boolean().default(false),
});

export const updateProductSchema = createProductSchema.partial();

// ─── Cart ─────────────────────────────────────────────────────

export const addToCartSchema = z.object({
  productId: z.string().min(1),
  quantity: z.number().int().positive().default(1),
});

export const updateCartItemSchema = z.object({
  quantity: z.number().int().min(0),
});

// ─── Order ────────────────────────────────────────────────────

export const createOrderSchema = z.object({
  addressId: z.string().min(1),
  paymentMethod: z.enum([
    "CARD",
    "MOBILE_MONEY",
    "INVOICE",
    "BANK_TRANSFER",
  ]),
  notes: z.string().optional(),
});

// ─── RFQ ──────────────────────────────────────────────────────

export const createRFQSchema = z.object({
  notes: z.string().optional(),
  deliveryDate: z.string().optional(),
  budget: z.number().positive().optional(),
  items: z.array(
    z.object({
      productId: z.string().min(1),
      quantity: z.number().int().positive(),
      notes: z.string().optional(),
    })
  ).min(1),
});

// ─── Address ──────────────────────────────────────────────────

export const addressSchema = z.object({
  label: z.string().optional(),
  line1: z.string().min(1),
  line2: z.string().optional(),
  city: z.string().min(1),
  state: z.string().optional(),
  country: z.string().min(1),
  postalCode: z.string().optional(),
  isDefault: z.boolean().default(false),
});

// ─── Auth ─────────────────────────────────────────────────────

export const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  phone: z.string().optional(),
  orgName: z.string().optional(),
});

export const createOrganisationSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  address: z.string().optional(),
  taxId: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

// ─── Contact ──────────────────────────────────────────────────

export const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().optional(),
  subject: z.string().min(2),
  message: z.string().min(10),
});
