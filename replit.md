# Print3d

A fully static single-page website for showcasing and selling 3D printed products. Customers browse a product catalog, add items to a cart, and generate ready-to-send order messages via WhatsApp or email — no payment integration, no backend.

## Run & Operate

- `pnpm --filter @workspace/print3d run dev` — run the frontend dev server (Replit)
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
- `artifacts/print3d/src/config.ts` — WhatsApp phone, email, LinkedIn/GitHub/Instagram URLs
- `artifacts/print3d/src/i18n.ts` — all translation strings (EN + PT-BR)
- `artifacts/print3d/src/contexts/CartContext.tsx` — cart state + localStorage persistence
- `artifacts/print3d/src/contexts/LangContext.tsx` — language toggle (EN/PT)
- `artifacts/print3d/src/utils/orderMessage.ts` — WhatsApp/email message generation
- `artifacts/print3d/src/components/` — Header, Hero, ProductCatalog, CartDrawer, etc.
- `artifacts/print3d/vite.pages.config.ts` — standalone config for GitHub Pages builds

## Architecture decisions

- Fully static frontend — no API calls from the frontend, all product data is hardcoded in `src/data/products.ts`
- Cart persisted to localStorage under key `print3d_cart`
- WhatsApp order uses `wa.me/{phone}?text={encoded}` links; email uses `mailto:` links
- Contact CTAs should pass the current cart into the WhatsApp/email link generators so selected items open as a pre-filled order message
- Language context (EN/PT) is React state, switching is instant and affects all copy including generated order messages
- Color system: 60% graphite (#0B0F14), 30% steel (#1E293B), 5% orange (#F97316), 5% cyan (#22D3EE)

## GitHub Pages deployment

Run `pnpm --filter @workspace/print3d run build:pages` (uses `vite.pages.config.ts`, no Replit env vars required). Output goes to `artifacts/print3d/dist/`. Set `VITE_BASE_PATH=/repo-name/` if deploying to a project page. See `artifacts/print3d/README.md` for full instructions.

## Product

A professional 3D printing product showcase targeting engineers, makers, car enthusiasts, students, and hobbyists. Customers browse 8 products across 6 categories, add to cart, and place orders via WhatsApp or email. Bilingual (EN/PT-BR) with a visible header toggle.

## User preferences

- WhatsApp number: +5511918453735 (stored in config.ts as WHATSAPP_PHONE)

## Gotchas

- `SiLinkedin` does not exist in react-icons v5 — use `Linkedin` from lucide-react instead
- Google Fonts `@import url(...)` must be the very first line in index.css (before @import "tailwindcss")
- All product/section copy goes through `t()` from LangContext — never hardcode EN/PT strings in components
- To change contact info, edit `src/config.ts` only (WHATSAPP_PHONE, WHATSAPP_PHONE_DISPLAY, CONTACT_EMAIL, LINKEDIN_URL, GITHUB_URL, INSTAGRAM_URL)
- `vite.config.ts` requires Replit env vars (PORT, BASE_PATH) — use `vite.pages.config.ts` for standalone/GitHub Pages builds
- `package.json` has been trimmed to only the deps actually used by the app — do not add back unused Radix/shadcn deps

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
- See `artifacts/print3d/README.md` for GitHub Pages deployment instructions
