# Software Requirements Specification (SRS)

## Depot Technologies
### One E-Commerce Platform · Three Categories · B2C & B2B

**Version:** 1.0.0
**Status:** Active
**Stack:** Next.js 16 · PostgreSQL · Prisma · NextAuth.js · Tailwind CSS v4

---

## 1. Introduction

### 1.1 Purpose

This document defines the complete requirements for
**Depot Technologies** — a single, unified e-commerce platform
where individuals and organisations can browse, search, and
purchase stationery, electronics, and software products
in one place.

The platform looks, feels, and works like a modern e-commerce
store (think Amazon or Jumia) with added B2B capabilities
for organisations that need bulk ordering, RFQs, and invoicing.

---

### 1.2 What It Is

A fully integrated e-commerce platform that:

- Has a **public storefront** anyone can browse
- Lets **individuals** buy products instantly (cart + checkout)
- Lets **organisations** buy in bulk or request formal quotations
- Has an **admin panel** for the Depot team to manage everything
- Covers **three product categories**:
  Stationery · Electronics · Software & Projects

Everything — storefront, checkout, B2B portal, admin —
lives in **one platform, one codebase, one database**.

---

### 1.3 Definitions

| Term | Definition |
|---|---|
| B2C | Individual customer buying for personal/office use |
| B2B | Organisation buying in bulk or via formal procurement |
| RFQ | Request for Quotation — formal B2B price request |
| SKU | Stock Keeping Unit — unique product identifier |
| Cart | Customer's active shopping basket |
| Checkout | Payment and order confirmation flow |
| Admin | Depot Technologies internal operator |
| Storefront | The public-facing product browsing experience |

---

## 2. Platform Overview

### 2.1 The Four Areas of the Platform

```
┌─────────────────────────────────────────────┐
│           DEPOT TECHNOLOGIES                │
│                                             │
│  ┌─────────────┐    ┌─────────────────────┐ │
│  │  STOREFRONT │    │    CUSTOMER PORTAL  │ │
│  │  (Public)   │    │  (Logged-in users)  │ │
│  │             │    │                     │ │
│  │ Browse      │    │ Orders / Wishlist   │ │
│  │ Search      │    │ B2B RFQs            │ │
│  │ Product     │    │ Company account     │ │
│  │ pages       │    │ Invoices            │ │
│  └─────────────┘    └─────────────────────┘ │
│                                             │
│  ┌─────────────┐    ┌─────────────────────┐ │
│  │   CHECKOUT  │    │   ADMIN DASHBOARD   │ │
│  │             │    │                     │ │
│  │ Cart        │    │ Products / Inventory│ │
│  │ Payment     │    │ Orders / RFQs       │ │
│  │ Order conf. │    │ Users / Analytics   │ │
│  └─────────────┘    └─────────────────────┘ │
└─────────────────────────────────────────────┘
```

---

### 2.2 Who Uses It

#### UC-1: Guest (Not logged in)
- Browse all products and categories
- Search and filter products
- View product details and pricing
- Prompted to sign in to add to cart

#### UC-2: Individual Customer (B2C)
- Full storefront access
- Add to cart and checkout instantly
- Pay via card or mobile money
- Track orders and view order history
- Save products to wishlist

#### UC-3: Organisation Customer (B2B)
- All B2C capabilities
- Register a company account
- Invite team members
- Submit RFQs for bulk orders
- Receive and approve quotations
- Access bulk pricing automatically
- Pay via invoice or credit terms

#### UC-4: Admin (Depot Team)
- Manage all products and inventory
- Process and fulfil orders
- Handle RFQ requests and quotations
- Manage users and organisations
- View analytics and reports

---

## 3. Functional Requirements

---

### FR-1: Public Storefront

The platform shall provide a public e-commerce storefront:

- **Homepage** — hero banner, featured products,
  category sections, promotional banners, trust signals
- **Category pages** — Stationery, Electronics, Software
  with product grids, filters, and sort options
- **Product detail page** — images gallery, description,
  specs, pricing, stock status, add to cart button,
  related products
- **Search** — instant debounced search with results page,
  filters, and total count
- **About page** — company story, mission, values
- **Contact page** — enquiry form with direct contact info

**Status:** 🟡 Marketing pages done.
Product detail pages and live catalog needed.

---

### FR-2: Product Catalog

Every product on the platform shall have:

- Product name and full description
- Multiple images (gallery)
- Category (Stationery / Electronics / Software)
- SKU and brand
- B2C retail price
- B2B bulk price tiers (auto-applied by quantity)
- Stock status: `IN STOCK` / `LOW STOCK` / `OUT OF STOCK`
- Product specifications / tech sheet
- Related products

Admin shall be able to:

- Create, edit, archive, and delete products
- Upload and manage product images
- Set pricing and stock levels
- Assign products to categories

**Status:** 🔴 Needs database + admin panel

---

### FR-3: Search & Discovery

The platform shall:

- Provide instant full-text search (debounced 300ms)
- Filter products by:
  - Category
  - Price range (slider)
  - Availability
  - Brand
- Sort by: price (asc/desc), newest, popularity
- Show result count and active filter count
- Show empty state with suggestions when no results
- Track recently viewed products (authenticated users)
- Show trending and featured products on homepage

**Status:** 🔴 Not started

---

### FR-4: Authentication & Accounts

The platform shall support:

- Sign up as individual or organisation
- Email verification before account activation
- Sign in with email + password
- Password reset via email
- Role-based access:
  - `GUEST` — browse only
  - `CUSTOMER` — buy, track orders, wishlist
  - `ORG_MEMBER` — B2B access under company account
  - `ORG_ADMIN` — manage company, users, RFQs
  - `ADMIN` — full platform access
- Auth-protected pages redirect immediately to login
- Session expiry with clear re-login prompt

**Status:** 🔴 Not started

---

### FR-5: Shopping Cart & Checkout

**Flow:** `Browse → Add to Cart → Checkout → Pay → Confirmed`

The platform shall:

- Allow guests to browse but require login to checkout
- Persist cart across sessions for logged-in users
- Show cart item count in navbar at all times
- Support quantity updates and item removal in cart
- Show order summary with subtotal, tax, and total
- Checkout steps:
  1. Delivery address
  2. Payment method selection
  3. Order review
  4. Payment + confirmation
- Show loading state on all checkout actions
- Generate order confirmation page and email

**Status:** 🔴 Not started

---

### FR-6: Payments

The platform shall support:

- **Card payments** — Stripe or Paystack
- **Mobile Money** — MTN MoMo, Airtel Money
- **Invoice payment** — for approved B2B orders
- Payment failure handling with retry prompt
- Payment receipt generation and storage
- Refund tracking (admin-initiated)

**Status:** 🔴 Not started

---

### FR-7: Order Management

Every order shall have a tracked lifecycle:

`PENDING → CONFIRMED → PROCESSING → SHIPPED → DELIVERED`

Or: `CANCELLED` at any point before `SHIPPED`

The platform shall:

- Show order status in customer account dashboard
- Show estimated delivery date
- Allow order cancellation before `SHIPPED`
- Notify customer at every status change (email + in-app)
- Allow admins to update order status manually
- Generate printable order summary / invoice

**Status:** 🔴 Not started

---

### FR-8: Customer Account Dashboard

Logged-in customers shall have a dashboard showing:

- Order history with status and tracking
- Active cart and saved wishlist
- Saved delivery addresses
- Account settings (name, email, password)
- For B2B: company profile and RFQ history

**Status:** 🔴 Not started

---

### FR-9: B2B Procurement (RFQ)

For organisations that need bulk or custom orders:

**Flow:**
`Submit RFQ → Admin Reviews → Sends Quotation →
Org Approves → Order Created → Fulfilled`

The platform shall:

- Allow verified orgs to submit RFQs with:
  - Product list + quantities
  - Delivery requirements
  - Budget range (optional)
- Allow admins to respond with a formal quotation
- Allow org admin to approve or reject quotation
- Generate invoice on approval
- Track RFQ status:
  `SUBMITTED → UNDER_REVIEW → QUOTED →
  APPROVED → ORDERED → FULFILLED`
- Auto-apply bulk pricing at quantity thresholds

**Status:** 🔴 Not started

---

### FR-10: Inventory Management

The platform shall:

- Track real-time stock per SKU
- Auto-decrement stock on confirmed orders
- Show live stock status on all product listings
- Trigger low-stock alert to admin when below threshold
- Allow admin manual stock adjustments with audit log
- Block checkout on out-of-stock items

**Status:** 🔴 Not started

---

### FR-11: Admin Dashboard

The Depot team shall have a full operations dashboard:

**Products**
- Create, edit, archive, delete products
- Manage images, pricing, specs, stock

**Orders**
- View all orders with filters (status, date, customer)
- Update order status
- View order details and generate invoices

**RFQs**
- View incoming RFQs
- Build and send quotations
- Track RFQ lifecycle

**Users**
- View and manage customers and organisations
- Verify organisation accounts
- Suspend or deactivate accounts

**Inventory**
- Adjust stock levels
- View low stock alerts
- Audit log of all adjustments

**Analytics**
- Revenue by category and time period
- Order volume trends
- Top-selling products
- Low stock report

**Status:** 🔴 Not started

---

### FR-12: Notifications

The platform shall notify users via email and in-app for:

- Order placed confirmation
- Order status changes
- RFQ response received
- Quotation approved
- Payment confirmed
- Account verification
- Password reset
- Low stock alert (admin only)

**Status:** 🔴 Not started

---

## 4. Non-Functional Requirements

### NFR-1: Performance
- API response ≤ 300ms average
- Page load (LCP) ≤ 2.5 seconds
- Skeleton loaders on all async content — never blank
- RSC-first data fetching — no useEffect for initial data

### NFR-2: Security
- TLS on all communications
- JWT sessions via NextAuth.js
- Zod validation on every API route
- RBAC enforced on all protected routes
- No raw DB errors to client
- All secrets in environment variables

### NFR-3: Usability
- Mobile-first responsive (sm / md / lg breakpoints)
- Every interactive element has all states:
  default / hover / focus / active / disabled / loading / error
- Touch targets minimum 44×44px on mobile
- Colour contrast 4.5:1 minimum (WCAG AA)
- Action verbs on buttons: "Add to Cart", "Place Order"
- Specific error messages — never "Something went wrong"
- Confirmation modal on all destructive actions

### NFR-4: Reliability
- 99.9% uptime target
- Error boundary on every page
- 404 page with full navigation shell

### NFR-5: Code Quality
- Lines ≤ 80 characters
- Components ≤ 80 lines
- No `any` type
- No hardcoded colors — use `globals.css` tokens
- No business logic in JSX
- Light mode only — no dark classes

---

## 5. Technology Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 App Router |
| Language | TypeScript 5 |
| Database | PostgreSQL |
| ORM | Prisma |
| Auth | NextAuth.js (Auth.js v5) |
| Styling | Tailwind CSS v4 |
| Validation | Zod |
| Payments | Stripe / Paystack |
| Email | Resend |
| File Storage | Cloudinary / AWS S3 |
| Hosting | Vercel / AWS |

---

## 6. Folder Structure

```
app/
  (store)/
    page.tsx               # Homepage storefront
    products/
      [slug]/page.tsx      # Product detail page
    stationery/page.tsx    # Category page
    electronics/page.tsx   # Category page
    software/page.tsx      # Category page
    search/page.tsx        # Search results
    cart/page.tsx          # Shopping cart
    checkout/page.tsx      # Checkout flow
    account/
      page.tsx             # Customer dashboard
      orders/page.tsx      # Order history
      rfqs/page.tsx        # B2B RFQ history
    about/page.tsx
    contact/page.tsx
  (admin)/
    dashboard/page.tsx
    products/page.tsx
    orders/page.tsx
    rfqs/page.tsx
    users/page.tsx
    inventory/page.tsx
    analytics/page.tsx
  api/
    products/route.ts
    products/[id]/route.ts
    orders/route.ts
    orders/[id]/route.ts
    rfqs/route.ts
    rfqs/[id]/route.ts
    cart/route.ts
    payments/route.ts
    auth/[...nextauth]/route.ts
components/
  layout/         # Navbar, Footer
  ui/             # Button, Input, Badge, Modal, Spinner
  shared/         # ProductCard, StockBadge, SearchBar
  store/          # Storefront-specific components
  account/        # Customer dashboard components
  admin/          # Admin panel components
lib/
  constants/      # Category config
  types/          # TypeScript interfaces
  utils/          # Pure utility functions
  hooks/          # Client-side hooks
  db/             # Prisma client
  validations/    # Zod schemas
prisma/
  schema.prisma
docs/
  SRS.md
```

---

## 7. Data Model

| Entity | Description |
|---|---|
| `User` | All platform users |
| `Organisation` | Verified B2B company account |
| `OrgMember` | User linked to an organisation |
| `Product` | Catalog item with full metadata |
| `ProductImage` | Product gallery images |
| `Category` | Stationery / Electronics / Software |
| `Cart` | Active customer cart |
| `CartItem` | Product line in a cart |
| `Order` | Confirmed purchase |
| `OrderItem` | Product line in an order |
| `RFQ` | B2B request for quotation |
| `RFQItem` | Product line in an RFQ |
| `Quotation` | Admin response to RFQ |
| `Payment` | Payment record per order |
| `Inventory` | Stock level per SKU |
| `Wishlist` | Saved products per user |
| `Notification` | In-app notification |
| `AuditLog` | Admin action trail |

---

## 8. Business Rules

- Guests can browse but must sign in to checkout
- Cart persists for logged-in users across sessions
- Stock is decremented only on confirmed payment
- Out-of-stock items cannot be added to cart
- Bulk pricing applies automatically by quantity threshold
- Only verified organisations access B2B pricing
- RFQs require admin approval before becoming orders
- Orders cannot be cancelled once status is `SHIPPED`
- All admin stock changes are logged in the audit trail
- Software licenses are delivered via email after payment

---

## 9. Future Features

- Mobile app (Flutter — iOS & Android)
- AI-powered product recommendations
- Automated stock replenishment for businesses
- Subscription-based recurring supply orders
- Supplier marketplace (third-party vendors)
- Advanced analytics and forecasting dashboard

---

## 10. Current Status

| Feature | Status |
|---|---|
| Marketing pages | 🟢 Live |
| Static product listings | 🟢 Live |
| Contact form | 🟢 Live |
| Database schema | 🔴 Not started |
| Authentication | 🔴 Not started |
| Live product catalog | 🔴 Not started |
| Search & filters | 🔴 Not started |
| Cart & checkout | 🔴 Not started |
| Payments | 🔴 Not started |
| Order management | 🔴 Not started |
| B2B RFQ system | 🔴 Not started |
| Admin dashboard | 🔴 Not started |
| Notifications | 🔴 Not started |
| Inventory management | 🔴 Not started |

---

*Last updated: 2025 · Depot Technologies*
