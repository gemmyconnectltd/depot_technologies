# Depot Technologies — Full Stack Architecture Rules

## Project Context
Materials management platform covering 3 categories:
- **Stationery** (pens, paper, notebooks, office supplies)
- **Electronics** (devices, components, cables, hardware)
- **Software & Projects** (licenses, subscriptions,
  digital assets)

---

## Stack
- **Framework**: Next.js 16 App Router (full stack)
- **Database**: PostgreSQL via Prisma ORM
- **Auth**: NextAuth.js (Auth.js v5)
- **Styling**: Tailwind CSS v4 + `cn()` utility
- **Validation**: Zod
- **State**: React Server Components first,
  `useState`/`useReducer` only when needed

---

## Line Length Rule
- All code lines MUST be 80 characters or fewer
- Break long imports, function signatures, JSX props,
  and object literals across multiple lines
- No exceptions — applies to .ts, .tsx, .prisma files

---

## Folder Structure

```
app/
  (dashboard)/
    page.tsx
    stationery/page.tsx
    electronics/page.tsx
    software/page.tsx
  (auth)/
    login/page.tsx
  api/
    items/route.ts
    items/[id]/route.ts
components/
  ui/          # Button, Badge, Card, Input, Modal, Spinner
  layout/      # Navbar, Sidebar, Header, Footer
  shared/      # SearchBar, FilterPanel, StockBadge, ItemCard
  categories/
    stationery/
    electronics/
    software/
lib/
  types/       # TypeScript interfaces and types
  utils/       # Pure utility functions
  constants/   # Category config, enums, status maps
  hooks/       # Client-side custom hooks
  db/          # Prisma client instance
  validations/ # Zod schemas
prisma/
  schema.prisma
```

---

## UI Rules — Professional & Enterprise Grade

### Visual Design
- Use a consistent neutral base (zinc/slate/gray scale)
  with one primary brand accent color only
- Maintain 4-point spacing scale throughout
  (4, 8, 12, 16, 24, 32, 48, 64px)
- Every surface must have clear visual hierarchy:
  page title → section heading → body → caption
- Use subtle shadows and borders — never flat and
  never heavy/dramatic
- All icons must be from a single icon library
  (Lucide) — never mix icon sets
- Typography scale: one sans-serif font, max 3 sizes
  per page, consistent weight usage
- Line height for body text must be 1.5 minimum
  for readability
- Letter spacing on headings: slightly tight (−0.02em)
  — gives a polished, editorial feel
- Never use pure black (#000) for text —
  use zinc-900 or slate-900 for softer contrast

### Layout
- Sidebar navigation — never top-only nav for a
  dashboard/management app
- Content area max-width: 1280px, centered
- All pages follow the same grid — no one-off layouts
- Tables and lists must always have a visible header row
- Cards must have consistent padding (16px or 24px)
  — never mixed per component
- Sidebar width: fixed 240px expanded, 64px collapsed
- Page header (title + actions) always at the top
  of the content area — consistent across all pages
- Sticky table header when list is scrollable

### Color Usage
- Use color purposefully:
  - Green = in stock / success / active
  - Yellow/Amber = low stock / warning
  - Red = out of stock / error / destructive action
  - Blue = info / primary action
  - Gray = disabled / secondary / muted
- Never use color as the only signal — always pair
  with a label or icon (accessibility)
- Background layers must have clear elevation:
  - Page bg: zinc-50
  - Card/surface: white
  - Elevated (modal/dropdown): white + shadow-lg
- Dark mode must be fully supported — every color
  decision must have a dark: variant

### Motion & Animation
- All transitions must use duration-150 or duration-200
  — never slow animations on functional UI
- Use ease-out for elements entering the screen
- Use ease-in for elements leaving the screen
- Sidebar collapse, modal open/close, dropdown —
  all must animate smoothly
- Never animate layout shifts — only opacity
  and transform
- Respect `prefers-reduced-motion` —
  wrap all animations in a motion-safe: variant

### States — Every interactive element needs all states
- Default
- Hover
- Focus (visible ring — never remove outline)
- Active / Pressed
- Disabled (reduced opacity + not-allowed cursor)
- Loading (skeleton or spinner — never blank)
- Empty (always show an empty state message + CTA)
- Error (inline error message, never just red border)

### Feedback & Interactions
- Every user action must have immediate visual feedback
- Form submissions: show loading state on the button
- Mutations (create/update/delete): show toast
  notification on success and on error
- Toast must auto-dismiss after 4 seconds
- Toast must be dismissible manually
- Destructive actions (delete): always require
  a confirmation modal — never delete on single click
- All modals must be dismissible via Escape key
  and clicking the backdrop
- Hover tooltips on icon-only buttons — always

### Tables & Lists (primary UI for this app)
- Always show total count in the table header
- Sortable columns must have a visible sort indicator
- Pagination or infinite scroll — never load all records
- Row hover state must be visible
- Action buttons (edit/delete) appear on row hover,
  not always visible — keeps UI clean
- Empty table must show an illustration + message,
  not just blank rows
- Column widths must be consistent — never let
  content cause layout shifts between pages
- Zebra striping optional but must be consistent
  if used — never on some tables and not others

### Forms
- Label always above the input — never placeholder-only
- Required fields marked with an asterisk (*)
- Inline validation — show error on blur, not on submit
- Submit button disabled until form is valid
- Group related fields visually with spacing
- Input height must be consistent: 40px (h-10)
  across all forms in the app
- Select dropdowns must match the style of text inputs
  — never use native browser default selects
- Character count shown on long text fields
- Autofocus the first field when a modal/form opens

### Dashboard & Data Visualization
- Dashboard home must show summary KPI cards:
  total items, low stock count, out of stock count,
  total categories
- KPI cards must use large numbers with a label
  and a trend indicator (up/down/neutral)
- Use bar or donut charts for category breakdowns
  — never raw data tables on the dashboard home
- Charts must have a legend and labeled axes
- Charts must have loading skeletons —
  never flash raw numbers before chart renders

### Responsive Rules
- Dashboard sidebar collapses to icon-only on md:
  and to a drawer on sm:
- Tables become horizontally scrollable on mobile —
  never break layout
- Cards stack to single column on sm:
- Touch targets minimum 44x44px on mobile
- Font sizes must never go below 14px on mobile
- Modal must be full-screen on sm: breakpoint

---

## UX Rules — Enterprise Grade

### Navigation
- Active route always visually highlighted in sidebar
- Breadcrumbs on all nested pages (e.g. Electronics
  → Item Detail)
- Browser back button must always work correctly —
  never trap the user
- Sidebar sections must be grouped with labels:
  e.g. "Inventory", "Settings", "Reports"
- Page titles in the browser tab must always reflect
  the current page — never show generic app name only

### Data & Stock Management UX
- Stock level always visible at a glance — use
  StockBadge with color + label, never raw numbers only
- Low stock threshold must trigger a visible warning
  badge, not just a number change
- Search must be instant (debounced, no submit button)
- Filters must show a count of active filters applied
- Bulk actions (select multiple → delete/export)
  must be supported on list views
- Last updated timestamp must show on all item records
- Item detail page must show full history/audit trail
  of stock changes

### Copywriting & Microcopy
- Button labels must be action verbs:
  "Add Item", "Delete", "Save Changes" —
  never vague labels like "Submit" or "OK"
- Empty state messages must be helpful and specific:
  "No electronics found. Add your first device."
  — never just "No data"
- Error messages must explain what went wrong
  and what the user can do — never "Something went
  wrong" alone
- Confirmation modal copy must name the item:
  "Delete 'HP Laptop'? This cannot be undone."
  — never generic "Are you sure?"
- Loading states must have context:
  "Saving item…", "Loading inventory…"
  — never just a spinner with no label

### Performance Feel
- Pages must feel instant — use RSC + streaming
- Skeleton loaders for any async content —
  never show a blank page
- Optimistic UI for toggles and quick actions —
  don't wait for server confirmation
- Never show a full-page spinner for background updates
- Prefetch linked pages on hover using Next.js
  Link prefetch behavior

### Error Handling UX
- Every page must have an error.tsx boundary —
  never let a crash show a blank white screen
- API errors must show a user-friendly inline message,
  not a raw status code
- 404 pages must have the app's sidebar and header —
  never a standalone blank error page
- Network errors must prompt the user to retry —
  never silently fail

### Accessibility
- All interactive elements must be keyboard navigable
- Focus order must follow visual order
- All images and icons must have alt text or
  aria-label
- Color contrast ratio minimum 4.5:1 for text
- All form inputs must have associated labels
- Use semantic HTML: nav, main, section, article,
  header, footer — never div soup
- ARIA roles and labels on all custom components
  (modals, dropdowns, tabs, tooltips)
- Screen reader announcements for dynamic content
  changes (stock updates, toast notifications)

### Security UX
- Auth-protected pages must redirect to login
  immediately — never flash protected content
- Session expiry must show a clear message and
  redirect to login — never a broken state
- Sensitive actions (bulk delete, export) must
  require the user to be re-authenticated if session
  is older than 30 minutes

---

## Component Rules

- One generic `ItemCard`, not 3 per category
- Components never fetch data AND render
  — pass data as props from RSC or hooks
- Keep components under 80 lines; split if larger
- Use `CATEGORY_CONFIG` for all category-specific
  labels, colors, icons — never hardcode per category
- Never use `if category === "stationery" ... else if`
  in render logic — use the config map

---

## Database Rules (Prisma)

- Always define models in `prisma/schema.prisma`
- Single Prisma client instance in `lib/db/prisma.ts`
- Never import `PrismaClient` directly in components
  — always import from `lib/db/prisma.ts`
- Use transactions for multi-table operations

---

## API Routes Rules (`app/api/`)

- REST conventions:
  - `GET /api/items` — list all
  - `POST /api/items` — create
  - `GET /api/items/[id]` — get one
  - `PATCH /api/items/[id]` — update
  - `DELETE /api/items/[id]` — delete
- Validate request body with Zod before any DB call
- Consistent JSON response shape:
  success → `{ data: T; error: null }`
  failure → `{ data: null; error: string }`
- Use `NextResponse.json()` with correct HTTP status
- Never expose raw Prisma errors to the client

---

## Validation Rules (Zod)

- All schemas in `lib/validations/`
- Extend base schema per category
- Never duplicate validation logic

---

## TypeScript Rules

- Types live in `lib/types/` — never inline in
  components
- `interface` for props
- Discriminated unions for category item types
- Never use `any`

---

## Data Fetching Rules

- Fetch in React Server Components (RSC) by default
- No `useEffect` for initial data loading
- Client hooks in `lib/hooks/` only for interactivity
  (search, filters, optimistic UI)
- Hooks always return `{ data, isLoading, error }`
- Use `revalidatePath()` or `revalidateTag()`
  after mutations in API routes

---

## Styling Rules (Tailwind v4)

- No inline styles — Tailwind classes only
- Use `cn()` from `clsx` + `tailwind-merge`
  for conditional classes
- Responsive-first: `sm:`, `md:`, `lg:` on all
  layout components

---

## File Naming

- Components: `PascalCase.tsx`
- Hooks: `use` + `camelCase.ts` (e.g. `useItems.ts`)
- Types: `camelCase.ts`
- Utils / Constants / Validations: `camelCase.ts`

---

## Do Not
- Do not use `any` type
- Do not create separate layouts per category
- Do not put business logic inside JSX
- Do not hardcode category names outside `lib/constants/`
- Do not mix Server and Client components
  without `"use client"` boundary
- Do not call Prisma directly in components
  — go through API routes only
- Do not expose raw DB errors to the client
- Do not skip Zod validation before any DB write
- Do not exceed 80 characters per line
- Do not delete without a confirmation modal
- Do not use color as the only visual signal
- Do not remove focus outlines — ever
- Do not show blank pages — always use skeletons
- Do not mix icon libraries
- Do not use more than one accent color
- Do not use pure black for text — use zinc-900
- Do not use "Submit" or "OK" as button labels
- Do not show generic error messages — be specific
- Do not show a 404 page without the app shell
- Do not animate layout shifts — only opacity
  and transform
- Do not ignore prefers-reduced-motion
- Do not use native browser select elements
- Do not flash protected content before auth check
