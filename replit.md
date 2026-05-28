# Print3d

A fully static single-page website for showcasing and selling 3D printed products. Customers browse a product catalog, add items to a cart, and generate ready-to-send order messages via WhatsApp or email — no payment integration, no backend.

## Run & Operate

- `pnpm --filter @workspace/print3d run dev` — run the frontend dev server
- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080, health check only)
- `pnpm run typecheck` — full typecheck across all packages

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React 18 + Vite + Tailwind CSS v4
- Icons: Lucide React + React Icons (SI)
- Cart: React Context + localStorage (no backend)
- i18n: custom translation object (no library)
- API: Express 5 (health check only — frontend is fully static)

## Where things live

- `artifacts/print3d/src/` — main frontend app
- `artifacts/print3d/src/data/products.ts` — static product catalog (8 products)
- `artifacts/print3d/src/config.ts` — WhatsApp phone, email, LinkedIn/TikTok URLs
- `artifacts/print3d/src/i18n.ts` — all translation strings (EN + PT-BR)
- `artifacts/print3d/src/contexts/CartContext.tsx` — cart state + localStorage persistence
- `artifacts/print3d/src/contexts/LangContext.tsx` — language toggle (EN/PT)
- `artifacts/print3d/src/utils/orderMessage.ts` — WhatsApp/email message generation
- `artifacts/print3d/src/components/` — Header, Hero, ProductCatalog, CartDrawer, etc.

## Architecture decisions

- Fully static frontend — no API calls from the frontend, all product data is hardcoded in `src/data/products.ts`
- Cart persisted to localStorage under key `print3d_cart`
- WhatsApp order uses `wa.me/{phone}?text={encoded}` links; email uses `mailto:` links
- Language context (EN/PT) is React state, switching is instant and affects all copy including generated order messages
- Color system: 60% graphite (#0B0F14), 30% steel (#1E293B), 5% orange (#F97316), 5% cyan (#22D3EE)

## Product

A professional 3D printing product showcase targeting engineers, makers, car enthusiasts, students, and hobbyists. Customers browse 8 products across 6 categories, add to cart, and place orders via WhatsApp or email. Bilingual (EN/PT-BR) with a visible header toggle.

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- `SiLinkedin` does not exist in react-icons v5 — use `Linkedin` from lucide-react instead
- Google Fonts `@import url(...)` must be the very first line in index.css (before @import "tailwindcss")
- All product/section copy goes through `t()` from LangContext — never hardcode EN/PT strings in components
- To change contact info, edit `src/config.ts` only (WHATSAPP_PHONE, CONTACT_EMAIL, LINKEDIN_URL, TIKTOK_URL)

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
- See `artifacts/print3d/README.md` for GitHub Pages deployment instructions
