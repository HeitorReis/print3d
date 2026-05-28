# Print3d — 3D Printing Product Showcase

A professional, fully static bilingual single-page website for showcasing and selling 3D printed products through direct contact via WhatsApp and email. No backend, no database, no payment integration.

---

## Project Description

Print3d is a product showcase and direct-order store for an informal 3D printing brand. Customers browse a catalog of printed products, add items to a cart, and generate a ready-to-send order message via WhatsApp or email. The store is targeted at engineers, makers, car enthusiasts, students, and anyone who needs custom printed parts, figures, gadgets, car accessories, decorations, or prototypes.

---

## Tech Stack

| Tool | Purpose |
|---|---|
| React 18 | UI library |
| Vite | Build tool and dev server |
| TypeScript | Type-safe codebase |
| Tailwind CSS v4 | Utility-first styling |
| Lucide React | UI icons |
| React Icons | Brand icons (WhatsApp, TikTok) |

---

## Features

- **Bilingual (EN / PT-BR)** — full English and Brazilian Portuguese support with a visible toggle in the header
- **Product catalog** — 8 products across 6 categories with bilingual names, descriptions, and tags
- **Category filters** — All, Figures, Gadgets, Car Parts, Decorations, Prototypes, Custom
- **Cart drawer** — add, remove, increase/decrease quantity; persisted in `localStorage`
- **WhatsApp order generation** — pre-filled message with product names, quantities, prices, delivery times, and total
- **Email order generation** — mailto link with subject and full order body
- **Ask about item** — per-product WhatsApp inquiry button
- **Contact section** — WhatsApp, Email, LinkedIn, TikTok links
- **Responsive design** — mobile-first layout, cart drawer works on all screen sizes
- **Industrial dark theme** — graphite background, orange accents, cyan highlights

---

## Bilingual Support

All user-facing text is in English and Brazilian Portuguese. The EN/PT toggle is in the header. Switching language instantly updates:

- Navigation labels
- Hero copy
- Product names and descriptions
- Filter labels
- Cart labels and buttons
- WhatsApp and email messages
- Contact labels
- Footer

Translation strings are in `src/i18n.ts`. To add a third language, add a new key to the `translations` object and update `type Lang`.

---

## Static Cart

The cart lives entirely in React state (`CartContext` + `useCartState`) and is persisted to `localStorage` under the key `print3d_cart`. No server communication happens at any point.

Cart actions: `addItem`, `removeItem`, `updateQty` (removes item if qty reaches 0), `clearCart`.

---

## WhatsApp and Email Order Logic

Both are pure functions in `src/utils/orderMessage.ts`:

### `generateWhatsAppCartLink(items, lang)`
- If the cart is empty: generates a general inquiry message
- If the cart has items: generates a message listing each product (name, qty, unit price, delivery time) plus an estimated total and a request to confirm availability, materials, colors, and payment
- Encodes the message with `encodeURIComponent` and returns `https://wa.me/{WHATSAPP_PHONE}?text={encoded}`

### `generateEmailLink(items, lang)`
- If the cart is empty: returns a bare `mailto:` link with subject only
- If the cart has items: generates a subject ("Print3d order request" / "Pedido Print3d") and a full order body, both URL-encoded
- Returns `mailto:{CONTACT_EMAIL}?subject={encoded}&body={encoded}`

### `generateWhatsAppProductLink(product, lang)`
- Generates a product-specific inquiry message (name, price, delivery time) and returns the `wa.me` link
- Used on the "Ask about item" button on each product card

---

## Configuration

All contact and social links are in `src/config.ts`. **Replace these before deploying.**

```ts
// src/config.ts

export const WHATSAPP_PHONE = '5511999999999';      // wa.me number — no spaces or dashes
export const WHATSAPP_PHONE_DISPLAY = '+55 11 99999-9999';  // shown in the Contact section
export const CONTACT_EMAIL = 'your.email@example.com';
export const LINKEDIN_URL = 'https://www.linkedin.com/in/yourprofile';
export const TIKTOK_URL = 'https://www.tiktok.com/@yourprofile';
```

---

## Product Data

Products are in `src/data/products.ts` as a static array. Each product has:

| Field | Type | Description |
|---|---|---|
| `id` | `number` | Unique identifier |
| `nameEn` / `namePt` | `string` | Bilingual product name |
| `descriptionEn` / `descriptionPt` | `string` | Bilingual short description |
| `category` | union | `gadgets`, `car-parts`, `figures`, `decorations`, `prototypes`, `custom` |
| `price` | `string` | Display price (e.g. `"R$ 34,90"`) |
| `deliveryEn` / `deliveryPt` | `string` | Bilingual delivery estimate |
| `material` | `string` | e.g. `"PLA"` or `"PETG"` |
| `tagsEn` / `tagsPt` | `string[]` | Bilingual technical tags |
| `gradientFrom` / `gradientTo` | `string` | CSS color strings for the placeholder image gradient |

To add or change a product, edit `src/data/products.ts` directly. No other file needs to change.

---

## How to Run Locally

This project uses [pnpm workspaces](https://pnpm.io/workspaces). If you are running it standalone (outside the monorepo), use `npm` or set the required environment variables.

### In the Replit monorepo

```bash
# Install all workspace dependencies
pnpm install

# Start the dev server (uses Replit workflow env vars)
pnpm --filter @workspace/print3d run dev
```

### Standalone (outside Replit)

```bash
cd artifacts/print3d

npm install

# Dev server (uses vite.pages.config.ts — no Replit env vars required)
npx vite --config vite.pages.config.ts

# Or build for production
npm run build:pages
```

---

## How to Build

### In the monorepo (Replit)

```bash
pnpm --filter @workspace/print3d run build
```

Output is written to `artifacts/print3d/dist/public/`.

### For GitHub Pages

```bash
cd artifacts/print3d
npm run build:pages
```

Output is written to `artifacts/print3d/dist/`.

---

## GitHub Pages Deployment

### Step 1 — Set the base path

Open `vite.pages.config.ts` and set `BASE` to match your Pages URL:

| Pages type | URL pattern | BASE value |
|---|---|---|
| User / org page | `username.github.io` | `'/'` |
| Project page | `username.github.io/repo-name` | `'/repo-name/'` |

You can also pass it as an environment variable:

```bash
VITE_BASE_PATH=/print3d/ npm run build:pages
```

### Step 2 — Update contact info

Edit `src/config.ts` with your real WhatsApp number, email, LinkedIn, and TikTok before building.

### Step 3 — Build

```bash
cd artifacts/print3d
npm run build:pages
```

### Step 4 — Deploy the `dist/` folder

**Option A — GitHub Actions (recommended)**

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: write
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: cd artifacts/print3d && npm install && npm run build:pages
      - uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: artifacts/print3d/dist
```

**Option B — Manual with gh-pages**

```bash
cd artifacts/print3d
npm install
npm run build:pages
npx gh-pages -d dist
```

### Step 5 — Enable Pages in GitHub

Go to **Settings → Pages**, set source to `gh-pages` branch, root folder.

---

## File Tree

```
artifacts/print3d/
├── src/
│   ├── components/
│   │   ├── Header.tsx          # Sticky nav, EN/PT toggle, cart button
│   │   ├── Hero.tsx            # Full-screen hero with stats bar
│   │   ├── ValueProps.tsx      # 5-card trust/feature strip
│   │   ├── ProductCatalog.tsx  # Filter bar + product grid
│   │   ├── ProductCard.tsx     # Individual product card
│   │   ├── CartDrawer.tsx      # Slide-in cart panel
│   │   ├── CustomProjects.tsx  # Custom orders CTA section
│   │   ├── ProcessSection.tsx  # 5-step print process
│   │   ├── ContactSection.tsx  # 4-channel contact cards
│   │   └── Footer.tsx          # Social links + disclaimer
│   ├── contexts/
│   │   ├── CartContext.tsx     # Cart state provider
│   │   └── LangContext.tsx     # Language state + t() helper
│   ├── data/
│   │   └── products.ts         # Static product catalog (8 products)
│   ├── hooks/
│   │   └── useCart.ts          # Cart state + localStorage persistence
│   ├── pages/
│   │   └── Home.tsx            # Root page component
│   ├── utils/
│   │   └── orderMessage.ts     # WhatsApp + email message generators
│   ├── config.ts               # Contact info constants ← EDIT THIS
│   ├── i18n.ts                 # EN/PT translation strings
│   ├── App.tsx                 # Root React component
│   └── index.css               # Tailwind + Google Fonts + theme
├── vite.config.ts              # Replit dev config (requires PORT + BASE_PATH)
├── vite.pages.config.ts        # GitHub Pages build config (standalone)
├── package.json
└── tsconfig.json
```

---

## Quality Notes

- No backend calls — all data is static
- No API keys — nothing sensitive in the codebase
- No payment flow — orders are sent via WhatsApp/email messages
- No authentication
- All WhatsApp links use `encodeURIComponent` for safe URL encoding
- Cart clears gracefully when `localStorage` is unavailable (try/catch in `useCartState`)
- Language state resets to English on page load (no persistence needed — toggle is always visible)

---

## Disclaimer

**Placeholder contact information:** The default `WHATSAPP_PHONE`, `CONTACT_EMAIL`, `LINKEDIN_URL`, and `TIKTOK_URL` values in `src/config.ts` are placeholders. Replace them with real values before publishing.

**Informal brand:** Print3d is an informal project/portfolio brand name. It is not presented as a legally registered company or trademark.
